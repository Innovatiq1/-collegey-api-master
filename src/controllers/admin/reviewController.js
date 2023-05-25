const review = require('../../models/reviews');
const { ObjectId } = require('bson');
const factory = require('../../controllers/factoryFunctions/handlerFactory');

// using default factory functions

exports.getAllreviews = factory.getAll(review);
exports.getAllreviewCounter = factory.getAllCounter(review);
exports.getreview = factory.getOne(review);
exports.createreview = factory.createOne(review);
exports.updatereview = factory.updateOne(review);
exports.deletereview = factory.deleteOne(review);

export async function updateReviewTestimonialStatus(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    let status = true;
    let textmessage = '';
    where["_id"] = cid;
    if(req.body.status == 'active'){
        where["active"] = false;
        status = true;
        textmessage = "Testimonial activted successfully";
    }else{
        where["active"] = true;
        status = false;
        textmessage = "Testimonial de-activted successfully";
    }
    
    try { 
        let result = await review.findOneAndUpdate(where, {
        active: status,
        });     
        res.status(200).json({  
            status: "success",
            message: textmessage,
            data: result
        });
    }catch (error) { 
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Testimonials updatation failed',
		});
    }
}


export async function add_studenttestimonial(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    let status = true;
    let textmessage = 'Testimonial submitted  successfully';
    
    let postData = req.body;

	const testimonilins = { 
		reviewType:'user',
		name:postData.name,
		qualification:postData.qualification,
		country: postData.country,
		type: postData.type,
		url:postData.url,
		text: postData.testimonal,
		position:'100',
		active: false,
		user_id: postData.user, 
		
	};
	//console.log("testimonilins qbj : ",testimonilins);
    try { 
        let result = await review.create(testimonilins);     
        res.status(200).json({  
            status: "success",
            message: textmessage,
            data: result
        });
    }catch (error) { 
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Testimonials updatation failed',
		});
    }
}

export async function send_collegemsg(req,res,next){
}
