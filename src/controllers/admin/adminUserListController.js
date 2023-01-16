// Imports
const bcrypt = require('bcrypt');
const { ObjectId } = require('bson');

// Models
const User = require('../../models/User');
const UserRewardModel = require('../../models/rewardspoint');
import Invitees  from '../../models/Invitees';
import Invitees_join  from '../../models/Invitees-join';
import { emailType,sendEmail } from '../../utilities/emailHelper';
var generatePassword = require('password-generator');
// const bcrypt = require('bcryptjs');

// default functions
const factory = require('../factoryFunctions/handlerFactory');
const catchAsync = require('../../utils/catchAsync');
const AppError = require('../../utils/appError');

// emails
const Email = require('../../utils/email');

import { getQueryParams } from '../../utilities/helpers';

exports.setEncryptedPassword = catchAsync(async (req, res, next) => {
    if (!req.body.password) return next(new AppError('please send a password', 400));

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    // res.status(200).json({ res: hashedPassword });
    req.body.password = hashedPassword;

    next();
});
// exports.createUser = catchAsync(async (req, res, next) => {
//     const NewUser = await User.create(req.body);

//     /* Email Starts */
//     const url = `https://collegey.com/student-dashboard/$`;
//     await new Email(NewUser, url).sendWelcome();
//     /* Email Ends */

//     res.status(201).json({
//         status: 'success',

//         data: {
//             data: NewUser,
//         },
//     });
// });

//new student User
exports.createUser = catchAsync(async (req, res, next) => {
    // const NewUser = await User.create(req.body);
    try {
            const user = await User.findOne({email:req.body.email});
            const invitee = await Invitees.findOne({email:req.body.email});
            const inviteeJoin = await Invitees_join.findOne({email:req.body.email});
            if(user !== null || invitee !== null || inviteeJoin !== null){
                res.status(400).json({
                    status: "fail",
                    message: "User alerady exist",
                });
            }else{
                const newpassword  = generatePassword(10, false, /[\w\d\?\-]/);
                const passwordHash = await bcrypt.hash(newpassword, 10);
                req.body.password  = passwordHash;
                req.body.Password_Activation  = 0;
                req.body.passwordChange  = true;
                
                const NewUser = await User.create(req.body);
                    let user_mailObj = {
                        user_id : NewUser._id,
                        email: NewUser.email,
                        password: newpassword,
                        type:NewUser.type,
                    };
                    if(NewUser){
                        sendEmail(emailType.INVITE_USER_REGIS_EMAIL,user_mailObj);
                        sendEmail(emailType.STUDENT_WELCOME_EMAIL, user_mailObj);
                        res.status(200).json({
                            status: "success",
                            message: "User added successfully",
                            data: user_mailObj
                        });
                    }
            }
            
    } catch (error) {
        console.log(error);
        next(error)
     }
            
    });


//admin

exports.createAdmin = catchAsync(async (req, res, next) => {
    // const NewUser = await User.create(req.body);
    try {
    console.log('-=-===-==-req',req.body)
            const user = await User.findOne({email:req.body.email});
            const invitee = await Invitees.findOne({email:req.body.email});
            const inviteeJoin = await Invitees_join.findOne({email:req.body.email});
            if(user !== null || invitee !== null || inviteeJoin !== null){
                res.status(400).json({
                    status: "fail",
                    message: "User alerady exist",
                });
            }else{
                // const newpassword  = generatePassword(10, false, /[\w\d\?\-]/);
                const passwordHash = await bcrypt.hash(req.body.password, 10);

                req.body.password = passwordHash;
                req.body.Password_Activation = 1;
                req.body.passwordChange  = false;
                
                const NewUser = await User.create(req.body);
                console.log('NewUser',NewUser);

                    let user_mailObj = {
                        user_id : NewUser._id,
                        email: NewUser.email,
                        // password: newpassword,
                        type:NewUser.type,
                    };
                    if(NewUser){
                        sendEmail(emailType.NEW_ADMIN_WELCOME_EMAIL,user_mailObj);
                        res.status(200).json({
                            status: "success",
                            message: "User added successfully",
                            data: user_mailObj
                        });
                    }
            }
            
    } catch (error) {
        console.log(error);
        next(error)
     }
            
    });

// using default factory functions
exports.getAllUsers = factory.getAll(User);
exports.getAllUserCounter = factory.getAllCounter(User);
exports.getUser = factory.getOne(User);
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

export async function getAllMentors(req, res) {
    let mentorList = await User.find({ type: "mentor" });

    res.status(200).json({
        status: "success",
        message: "Got Mentor List",
        data: mentorList
    });
}
export async function getMentorsByActivationStatus(req, res) {

    // let status;
    // let skip = req.body.skip;
    // let limit = req.body.limit;

    // if (req.body.activationStatus == 'true') {
    //     status = true;
    // } else {
    //     status = false;
    // }

    // let where = {

    //             $and: [
    //                 {
    //                     type: "mentor"
    //                 },
    //                 {
    //                     Active: status
    //                 }
    //             ]

    // }

    // let aggregate = [
    //     {
    //         $match: where
    //     },
    //     {
    // 		$facet: {
    // 			data: [],
    // 			pageInfo: [
    // 				{
    // 					$group: { _id: null, count: { $sum: 1 } },
    // 				},
    // 			],
    // 		},
    // 	},
    // 	{
    // 		$unwind: { path: "$pageInfo", preserveNullAndEmptyArrays: true },
    // 	},
    //     { $skip:  skip},
    //     { $limit: limit },
    // 	{
    // 		$project: {
    // 			item: "$data",
    // 			pageInfo: {
    // 				count: '$pageInfo.count'
    // 			}


    // 		},
    // 	},

    // ];

    // var mentorList = await User.aggregate(
    // 	aggregate
    // );

    let mentorList = await User.find({ type: "mentor", Active: req.body.activationStatus }).limit(req.body.limit).skip(req.body.skip);
    let count = await User.find({ type: "mentor", Active: req.body.activationStatus }).count();

    res.status(200).json({
        status: "success",
        message: "Got Mentor List",
        data: mentorList,
        results: count,
    });
}


export async function updateUserStatus(req, res, next) {
    let cid = ObjectId(req.body.id);
    let userType = req.body.userType;
    let where = {};
    let status = true;
    let textmessage = '';
    where["_id"] = cid;
    if (req.body.status == 'active') {
        where["Active"] = false;
        status = true;
        textmessage = userType + " is unblock successfully";
    } else {
        where["Active"] = true;
        status = false;
        textmessage = userType + " is block successfully";
    }
    // console.log("Where :",where, " active :", status);
    try {
        let result = await User.findOneAndUpdate(where, {
            Active: status,
        });
        // console.log("result :",result); 
        res.status(200).json({
            status: "success",
            message: textmessage,
            data: result
        });
    } catch (error) {
        next(error);
        res.status(400).json({
            status: 'error',
            message: userType + ' updatation failed',
        });
    }
}

export async function getUsersByName(req, res, next) {

    const postData = req.body;
    const searchText = {};
    const searchLimit = postData.limit ? postData.limit : 10;
    if (postData.username != null && postData.username != '') {
        let regex = new RegExp(postData.username, "i");
        searchText['$regex'] = regex;
    }
    let where = {
        $and: [
            {
                type: "student"
            },
            {
                name: searchText
            }
        ]
    }


    let aggregate = [
        {
            $match: where
        },
        {
            $facet: {
                data: [{ $limit: Number(searchLimit) }],
                pageInfo: [
                    {
                        $group: { _id: null, count: { $sum: 1 } },
                    },
                ],
            },
        },
        {
            $unwind: { path: "$pageInfo", preserveNullAndEmptyArrays: true },
        },
        {
            $project: {
                item: "$data",
                pageInfo: {
                    count: '$pageInfo.count'
                }


            },
        },

    ];

    var studentList = await User.aggregate(
        aggregate
    );

    res.status(200).json({
        status: "success",
        message: "Got Student List",
        results: studentList[0].pageInfo.count,
        data: { data: studentList[0].item }
    });

}