// userController.js
import { userPostServices, userGetServices } from "../../services/userServices";
import { getFields } from '../../utilities/helpers';
import User from '../../models/User';

exports.index = async function (req, res, next) {
    try{
        const users = await userGetServices.getAll(req.query);
        res.status(200).json({
            status: "success",
            message: "users retrieved successfully",
            data: users
        });
    }catch(e){
        next(e);
    }
}

exports.resetWithOldPassword = async function (req,res,next){
    try {
        const user = await userPostServices.resetPasswordOldPassword(req.body);
       // console.log(user)
        if(user){
            res.status(200).json({
                status: "success",
                message: "Password updated successfully",
            });
        } else {
            res.status(400).json({
                status: "error",
                message: "Old Password and password does not match",
            });
        }
    } catch (error) {
        next(error)
    }
}

exports.new = async function (req, res, next) {    
    try{
        if(req.file){
            req.body.avatar = req.file.originalname;
        }
        const user = await userPostServices.saveRequest(req.body)
        res.status(200).json({
            status: "success",
            message: "users created successfully",
            data: user
        });
    }catch(e){
        next(e)
    }
};


exports.edit = async function (req, res, next) {
    try{
        const userId = req.params.id || req.user.id;
        const user = await userPostServices.updateUser(req.body, userId, getFields(req.body.type, req.body.user_type).basic);
        if(user){
            res.status(200).json({
                status: "success",
                message: "user updated successfully",
                data: user
            });
        }
    }catch(e){
        next(e);
    }
};

exports.delete = async function (req, res, next) {
    try{
        const user = await userPostServices.deleteUser(req.params.id);
        if(user){
            res.status(200).json({
                status: "success",
                message: "user deleted successfully",
            });
        }
    }catch(e){
        next(e);
    }
};

exports.view = async function (req, res, next) {
    try{
        const userId = req.params.id || req.user.id;
        const user = await userGetServices.getOne(userId, getFields(req.query.type, req.query.user_type).basic);
        if(user){
            res.status(200).json({
                status: "success",
                message: "user details",
                data: user
            });
        }
    }catch(e){
        next(e);
    }
};

exports.profileEdit = async function (req, res, next) {
    try{
        const userId = req.params.id;
        const profile = await userPostServices.updateProfile(req.body, userId, getFields(req.body.type, req.body.user_type).profile);
        if(profile){
            res.status(200).json({
                status: "success",
                message: "profile updated",
                data: profile
            });
        }
    }catch(e){
        next(e);
    }
};

exports.getProfile = async function (req, res, next) {
    try{
        const userId = req.params.id || req.user.id;
        const user = await userGetServices.getOne(userId, getFields(req.query.type, req.query.user_type).profile);
        if(user){
            res.status(200).json({
                status: "success",
                message: "profile info",
                data: user
            });
        }
    }catch(e){
        next(e);
    }
};

exports.getUserByName = async function (req, res, next) {
    try{
        console.log("req.body===>")
        const username = req.body.username;
        const users = await User.find({name: username})
        if(users){
            res.status(200).json({
                status: "success",
                message: "Got users by name",
                data: users
            });
        }
    }catch(e){
        next(e);
    }
};

