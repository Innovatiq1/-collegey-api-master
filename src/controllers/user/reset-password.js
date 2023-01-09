import { userPostServices, userGetServices } from "../../services/userServices";

// Load Modal
import User from '../../models/User';
const bcrypt = require('bcryptjs');
const crypto = require('crypto');
const { ObjectId }   = require('bson');

exports.resetPasswordAction = async function (req,res,next){
    try {
        var postData = req.body;
        const passwordHash = await bcrypt.hash(postData.confirmPwd, 10);
        let user = await User.findOne({ _id: postData.user_id });
        if(user){
            const isMatch = await bcrypt.compare(postData.oldPwd,user.password);
                  if(isMatch)
                  {
                    let update_user = await User.findOneAndUpdate(
                        {_id: ObjectId(postData.user_id) },
                        {password:passwordHash,Password_Activation:1,Password_Activation:false}
                    );
                    res.status(200).json({
                        status: 'success',
			            message: 'Password Reset Successfully',
                    });
                  } else {
                    res.status(400).json({
                        status: "faild",
                        message: "Old password does not matches",
                    });
                }
        }
        else
        {
            res.status(400).json({
                status: "faild",
                message: "user not found",
            });
        }
    } catch (error) {
        next(error)
    }
}