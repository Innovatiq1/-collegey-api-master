const faq = require('../../models/FAQ');
const { ObjectId } = require('bson');
const factory = require('../../controllers/factoryFunctions/handlerFactory');
// import {faqCategories} from '../../models/faq-category/faq-category'
const faqCategories = require('../../models/faq-category/faq-category')

// Load Helper
import { getQueryParams } from '../../utilities/helpers'

// using default factory functions

// exports.getAllfaqs = factory.getAll(faq);
exports.getAllfaqCounter = factory.getAllCounter(faq);
exports.getfaq = factory.getOne(faq);
exports.createfaq = factory.createOne(faq);
exports.updatefaq = factory.updateOne(faq);
exports.deletefaq = factory.deleteOne(faq);

export async function createCategory(req, res, next) {
    let postData = req.body;

    const data = new faqCategories({
		name: postData.category, 
		position: postData.position,
	});

    try {
        const newCategory = await data.save();

        res.status(200).json({
            status: 'success',
            message: 'Category added successfully',
        });
    } catch (error) {
        res.status(400).json({
			status: 'failed',
			message: 'Add category failed',
		});
    }
}

export async function getAllfaqs(req, res, next) {

    try {
        let postData = req.body;

        const params = getQueryParams(req.query);
            
        const page   = params.page* 1 || 1;
        const limit  = params.limit * 1 || 100;
        const skip   = (page - 1) * limit;
    
        let Allaggregate = [ 
            { $sort: { _id: -1 } },
            {
                $lookup:{
                        from: 'faqcategories',
                        localField: 'category',
                        foreignField: '_id',
                        as: 'category'
                }
            },
            { $unwind: {   path: "$category",  preserveNullAndEmptyArrays: false }  },
            { $skip: skip },
            { $limit: limit },
            {   
                $project: { 
                  _id:1,
                  ques:1,
                  answer:1,
                  active:1,
                  category: "$category",
                  position: 1
                } 
            },  
        ];

        var all_faqs = await faq.aggregate(
            Allaggregate
        );
        let totalrecord = await faq.find().count();    
        res.status(200).json({   
            status: "success",
            message: "Got all faqs successfully",
            data: all_faqs,
            totalRecords: totalrecord,
        });

    } catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Faqs fetch failed',
		});
    }

}

export async function getCategory(req, res, next) {
    try {
        const allCategories = await faqCategories.find();

        res.status(200).json({
            status: 'success',
            message: 'Got all faq categories successfully',
            data: allCategories
        });
    } catch (error) {
        res.status(400).json({
			status: 'failed',
			message: 'Failed to get faq categories.',
		});
    }
}

export async function editCategory(req, res, next) {
    try {
        let where = {};
        where["_id"] = ObjectId(req.body.id);
        let textmessage = 'Category details updated successfully';
        let category = await faqCategories.findOneAndUpdate(where, {
            name: req.body.category,
            position: req.body.position,
        });    
        res.status(200).json({  
            status: "success",
            message: textmessage,
            data: category
        });
    } catch (error) {
        
    }
}

export async function activationFaqsStatus(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    let status = true;
    let textmessage = '';
    where["_id"] = cid; 
    if(req.body.status == 'active'){
       // where["active"] = false;
        status = true;
        textmessage = "FAQ details activted successfully";
    }else{
       // where["active"] = true;
        status = false;
        textmessage = "FAQ details de-activted successfully";
    }
    //console.log("Where :",where, " active :", status);
    try { 
        let result = await faq.findOneAndUpdate(where, {
            active: status,
        });    
        //console.log("result :",result); 
        res.status(200).json({  
            status: "success",
            message: textmessage,
            data: result
        });
    }catch (error) { 
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'FAQ details updatation failed',
		});
    }
}

