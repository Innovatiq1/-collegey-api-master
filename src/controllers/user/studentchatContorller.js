const { ObjectId }   = require('bson');

// Load modal
import userModel from '../../models/User';
import chatModel from '../../models/student-chat/student-chat';

exports.list_allUser  = async (req, res) => {
	let postData 	  = req.body;
	let where 		  = {Active: true};
	if(postData.searchText != null && postData.searchText != '')
	{
		let regex = new RegExp(postData.searchText, "i");
        where["$or"] = [
            {"name": regex },
        ]; 	
	}
	try
    {    
        let result_user = await userModel.find(where);
		 res.status(200).json({  
            status: "success",
            message: "User retrieved successfully",
            data: result_user
        });
    }
    catch(error)
    {
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Project faild',
		});
    }
}

exports.list_allUserletest  = async (req, res) => {
	let postData 	  = req.body;
	let where 		  = {Active: true};
	if(postData.searchText != null && postData.searchText != '')
	{
		let regex = new RegExp(postData.searchText, "i");
        where["$or"] = [
            {"name": regex },
        ]; 	
	}
	let all_user;
	if(postData.chatrole == 'montor-student')
	{
		let Alluseraggregate = [ 
			{  
				$match: {$or:[{"senderuser":ObjectId(postData.loginId)},{"receiveruser":ObjectId(postData.loginId)}]}, 
			},
			{
				$lookup:{
					from: 'users',
					localField: 'senderuser', 
					foreignField: '_id',
					as: 'studentchatsdata'
				}
			},
			{
				$unwind: { path: "$studentchatsdata", preserveNullAndEmptyArrays: true }
			},
			{ 
				$lookup:{
					from: 'users',
					localField: 'receiveruser', 
					foreignField: '_id',
					as: 'studentchatsdata1'
				}
			},
			{
				$unwind: { path: "$studentchatsdata1", preserveNullAndEmptyArrays: true }
			},
			{   
				$project: { 
					_id:1,
					updatedAt:1,
					someField: {
					    $cond: {
					        if: { $eq: ["$studentchatsdata._id", ObjectId(postData.loginId)] },
					        then: "$studentchatsdata1",
                            else: "$studentchatsdata"
					    }  
					},
				} 
			},  
			{   
				$match: {$or:[{"someField.name":new RegExp(postData.searchText, "i")},{"someField.last_name":new RegExp(postData.searchText, "i")}]},
			},
			{ "$sort": { "updatedAt": -1 } },
		];

		all_user = await chatModel.aggregate(
			Alluseraggregate
		);
	}
	else
	{
		where['type'] = 'mentor';
		let Alluseraggregate = [ 
			{  
				$match: where,
			},
			{
				$lookup: {
				  from: "studentchats",
				  let: { id: "$_id" },
				  pipeline: [
					{
					  $match: {
						$expr: {
						  $and: [
							{ $eq: ["$receiveruser", "$$id"] },
						  ],
						},
					  },
					},
					{ $sort: { updatedAt: -1 } },
				  ],
				  as: "studentchatsdata",
				},
			},
			{
				 $sort: { "studentchatsdata.updatedAt": -1 } , 
			},
			{   
				$project: { 
					_id:1,
					name:1,
					avatar:1,
					studentchatsdata: "$studentchatsdata",
				} 
			},  
		];

		all_user = await userModel.aggregate(
			Alluseraggregate
		);
	}

	try
    {
        res.status(200).json({  
            status: "success",
            message: "User retrieved successfully",
            data: all_user
        });
    }
    catch(error)
    {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Project faild',
		});
    }

}

exports.add_Chatnewmsg  = async (req, res) => {
	let postData = req.body;
	let chatData;
	if(postData.chatrole == 'montor-student')
	{
		chatData = await chatModel.findOne({senderuser: postData.senderuser,receiveruser: postData.receiveruser});
		if(chatData == null)
		{
			chatData = await chatModel.findOne({senderuser: postData.receiveruser,receiveruser: postData.senderuser});	
		}
	}
	else
	{								
		chatData = await chatModel.findOne({senderuser: postData.receiveruser,receiveruser: postData.senderuser});
		if(chatData == null)
		{
			chatData = await chatModel.findOne({senderuser: postData.senderuser,receiveruser: postData.receiveruser});	
		}
	}

	if(chatData != null)
	{
		var chatMessagearray = chatData.chatmessage;
		let msgobj;

		if(typeof postData.chatMediafile  !== 'undefined' && postData.chatMediafile != '')
		{
			msgobj = {
				msgText : postData.chatMsg,
				msgType : 'media',
				mediafiletype: postData.chatFiletype,
				userid  : postData.senderuser,
				updatedAt: Date.now(),
			}
		}
		else
		{
			msgobj = {
				msgText : postData.chatMsg,
				msgType : 'text',
				userid  : postData.senderuser,
				updatedAt: Date.now(),
			}
		}
		chatMessagearray.push(msgobj);

		if(postData.chatrole == 'montor-student')
		{
			let result = await chatModel.findOneAndUpdate(
				{senderuser: chatData.senderuser,receiveruser: chatData.receiveruser},
				{ "chatmessage": chatMessagearray}
			);
		}
		else
		{	
			let result = await chatModel.findOneAndUpdate(
				{senderuser: chatData.senderuser,receiveruser: chatData.receiveruser},
				{ "chatmessage": chatMessagearray}
			);
		}
		res.status(200).json({
			status: 'Success',
			message: 'Send message successfully',
		});
	}
	else
	{
		let msgobj;
		if(typeof postData.chatMediafile  !== 'undefined' && postData.chatMediafile != '')
		{ 
			msgobj = {
				msgText : postData.chatMsg,
				msgType : 'media',
				mediafiletype: postData.chatFiletype,
				userid  : postData.senderuser,
			}
		}
		else
		{
			msgobj = {
				msgText : postData.chatMsg,
				msgType : 'text',
				userid  : postData.senderuser,
			}
		} 
		const chatlins = new chatModel({
			senderuser: postData.senderuser,
			receiveruser: postData.receiveruser,
			chatmessage: msgobj,
		});

		try
		{    
			const chatData = await chatlins.save();
			res.status(200).json({
				status: 'Success',
				message: 'Send message successfully',
			});
		}
		catch(error)
		{
			next(error);
			res.status(400).json({
				status: 'error',
				message: 'Message send faild',
			});
		}
	}
}

exports.fetch_Chatnewmsg  = async (req, res) => {
	let postData = req.body;
	try
	{    
		let chatData;
		if(postData.chatrole == 'montor-student')
		{
			chatData = await chatModel.findOne({senderuser: postData.senderuser,receiveruser: postData.receiveruser});
			if(chatData == null)
			{
				chatData = await chatModel.findOne({senderuser: postData.receiveruser,receiveruser: postData.senderuser});
			}
		}
		else
		{												
			chatData = await chatModel.findOne({senderuser: postData.receiveruser,receiveruser: postData.senderuser});
			if(chatData == null)
			{
				chatData = await chatModel.findOne({senderuser: postData.senderuser,receiveruser: postData.receiveruser});
			}
		}
		
		res.status(200).json({
			status: 'Success',
			message: 'Message fetch successfully',
			data: chatData
		});
	}
	catch(error)
	{
		next(error);
		res.status(400).json({
			status: 'error',
			message: 'Message not fetch',
		});
	}
	
}
