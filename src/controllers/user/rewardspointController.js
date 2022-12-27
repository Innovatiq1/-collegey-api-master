const { ObjectId }   = require('bson');

// Load modal
import RewardsPoint from '../../models/rewardspoint';
import RewardMaster from '../../models/rewardMaster';
import mongoose from 'mongoose';
const factory = require('../../controllers/factoryFunctions/handlerFactory');


exports.getActivateRewardMasters = factory.getAllActiveList(RewardMaster);
exports.createRewardMasters = factory.createOne(RewardMaster);

exports.addNewRewardPoint = factory.createOne(RewardsPoint);

exports.checkRewardPoints = async(req,res)  =>{
    let postData 	  = req.body;
	let where 		  = {
        active: true,
        user_id : postData.user_id,
        rewardName : postData.rewardName,
    };
    //console.log("where : ", where);
    try
    {    
         RewardsPoint.countDocuments(where).then(result_user=>{
           return res.status(200).json({  
                status: "success",
                message: "Rewards point result retrieved successfully",
                data: result_user
            });
        })
       // console.log("rewards list : ", result_user);
		
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Rewards point result faild',
		});
    }
}

exports.getRewardPointsByname = async(req,res)  =>{
  let postData = req.body;
  try {
    const rewardData = await RewardsPoint.findOne({user_id: ObjectId(postData.user_id),rewardName:postData.rewardName});
    res.status(200).json({
      status: 'Success',
      data: rewardData,
      message: 'get rewards successfully',
    });
  }
  catch (e) {
		next(e);
    res.status(400).json({
			status: 'error',
			message: 'Rewards point result faild',
		});
	}
}

exports.updateProfileRewardPoints = async(req,res)  =>{
  let postData = req.body;
  try {
    const rewardData = await RewardsPoint.findOne({user_id: ObjectId(postData.user_id),rewardName:postData.rewardName});
    if(rewardData == null || rewardData == '')
    {
      const rewardlins = new RewardsPoint({ 
        rewardCreditPoint: postData.rewardCreditPoint,
        rewardDebitPoint: 0,
        user_id: postData.user_id,
        rewardName: postData.rewardName,
      });
      await rewardlins.save();
	    res.status(200).json({
        status: 'Success',
        message: 'Add reward successfully',
		  });
    }
  }
  catch (e) {
		next(e);
    res.status(400).json({
			status: 'error',
			message: 'Rewards point result faild',
		});
	}
}

exports.userRewardPoints = async(req, res)=>{
  /* let postData 	  = req.body;
	let where 		  = {
        active: true,
        user_id : postData.user_id, 
    };
  //  console.log("where : ", where);
    try
    {    
         RewardsPoint.find(where).then(result_user=>{
           return  res.status(200).json({  
                status: "success",
                message: "User rewards point retrieved successfully",
                data: result_user
            });

        })
        //console.log("rewards list : ", result_user);
		
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'User rewards point result faild',
		});
    } */

    let postData = req.body;
    let userId = postData.user_id;
  
    let where =
    {
      '$and':
        [
          { user_id: new mongoose.Types.ObjectId(userId) },
          { 'active': true }
        ]
    }
  
    let Allaggregate = [
      {
        $match: where,
      },
      {
  
        $lookup: {
          from: 'users',
          localField: 'user_id',
          foreignField: '_id',
          as: 'user_id'
        }
      },
      {
        $unwind: { path: "$user_id", preserveNullAndEmptyArrays: true }
      },
      { $sort: { _id: -1} }, 
    ];
  
    var rewardsPointobjects = await RewardsPoint.aggregate(
      Allaggregate
    );
  
    try {
      if (rewardsPointobjects) {
        res.status(200).json({
          status: 'success',
          message: 'User rewards point retrieved successfully',
          data: {
            rewardsPointobjects
          },
        });
      }
    } catch (error) {
      next(error);
      res.status(400).json({
        status: 'error',
        message: 'User rewards point result failed',
      });
    }



}

exports.deleteRewardPoint = async(req,res)  =>{
    let postData 	  = req.body;
	let where 		  = {
        active: true,
        user_id : postData.user_id,
        rewardName : postData.rewardName,
        rewardCreditPoint :postData.rewardCreditPoint,
        uniqueId: postData.uniqueId,
    };
    //console.log("where : ", where);
    try
    {    
        let result_user = await RewardsPoint.deleteOne(where);
       // console.log("rewards list : ", result_user);
		 res.status(200).json({  
            status: "success",
            message: "Removed credit reward point successfully",
            data: result_user
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Remove credit reward point result faild',
		});
    }
}
