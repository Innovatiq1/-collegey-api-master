// Imports
const bcrypt = require('bcrypt');
const { ObjectId } = require('bson');

// Models
const User = require('../../models/User');
const UserRewardModel = require('../../models/rewardspoint');

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
exports.createUser = catchAsync(async (req, res, next) => {
    const NewUser = await User.create(req.body);

    /* Email Starts */
    const url = `https://collegey.com/student-dashboard/$`;
    await new Email(NewUser, url).sendWelcome();
    /* Email Ends */

    res.status(201).json({
        status: 'success',

        data: {
            data: NewUser,
        },
    });
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