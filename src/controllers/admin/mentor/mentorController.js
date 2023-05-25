const bcrypt   = require('bcryptjs');
const { ObjectId } = require('bson');
import MentorResource from '../../../models/mentor-resource/mentor-resource';
import MentorArticle  from '../../../models/mentor-article/mentor-article';
import CuratedResources  from '../../../models/curated-resources/curated-resources';
import MentorFile     from '../../../models/mentor-file/mentor-file';
import MentorTestimonial from '../../../models/mentor-testimonial/mentor-testimonial';
import MentorPerks  from '../../../models/mentor-perks/mentor-perks';
import CollegeyOpportunities  from '../../../models/mentor-perks/collegey-opportunities';
import AgreementTerms  from '../../../models/agreement-terms/agreement-terms';
import AgreementPrivacyPolicy  from '../../../models/agreement-terms/agreement-privacypolicy';
import ResourceTitle  from '../../../models/resource-title/resource-title';

// Load Helper
import { getQueryParams } from '../../../utilities/helpers';
const request = require('request-promise');
const cheerio = require('cheerio');

export async function add_MentorResources(req,res,next){
    let postData = req.body;
    let videoLink = postData.link;
    if (postData.link.includes('vimeo')) {
        videoLink = 'https://player.vimeo.com/video/' + postData.link.substring(postData.link.lastIndexOf("/") + 1);
    }
    const resourcelins = new MentorResource({
		title: postData.title, 
		description: postData.description,
		link: videoLink,
	});
    try
    {     
        const resourceData = await resourcelins.save();
        res.status(200).json({
			status: 'Success',
			message: 'Resource add successfully',
		});
    }
    catch(error)
    {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Resource failed',
		});
    } 
}

export async function getMentorResourceInfo(req,res,next){
    let postData = req.body;
    try { 
        let result = await MentorResource.findOne({_id: ObjectId(postData.id)});
        res.status(200).json({  
            status: "success",
            message: "Mentor resource retrieved successfully",
            data: result
        });
    }catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Resource fetch failed',
		});
    }

}

export async function updateMentorResource(req,res,next){
    let where = {_id:req.query.id,isDeleted:false}
    let postData = req.body;
    let obj   = {
        title: postData.title, 
		description: postData.description,
		link: postData.link,
    }

    try {
        let result = await MentorResource.findOneAndUpdate(
            {_id: ObjectId(req.query.id) },
            obj
        );
        res.status(200).json({  
            status: "success",
            message: "Updated mentor resource successfully",
            data: result
        });
    } catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Resource update failed',
		});
    }

}

export async function deleteMentorResource(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    where["_id"] = cid;
    // where["isDeleted"] = false;
    try { 
        let result = await MentorResource.deleteOne(where);     
        res.status(200).json({  
            status: "success",
            message: "Delete mentor resource successfully",
            data: result
        });
    }catch (error) { 
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Resource update failed',
		});
    }
}

export async function getMentorResourcesList(req,res,next){
    try{
        let status = null;
        const params = getQueryParams(req.query,status);
        const resourceData = await MentorResource.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({  
            status: "success",
            message: "Mentor resource retrieved successfully",
            data: resourceData
        });
    }catch(error){
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Resource fetch failed',
		});
    }
}

// Mentor ResourceTitle
export async function add_addResourceTitle(req,res,next){
    let postData   = req.body; 

    const data = new ResourceTitle(postData);

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

export async function getMentorResourceTitle(req,res,next){
    try{
        const resourceData = await ResourceTitle.find();
        res.status(200).json({  
            status: "success",
            message: "Mentor article retrieved successfully",
            data: resourceData
        });
    }catch(error){
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Article fetch failed',
		});
    }
}

export async function updateMentorResourceTitle(req,res,next){
    let where = {isDeleted:false}
    let postData = req.body;  
    try {
        let result = await ResourceTitle.findOneAndUpdate(
            where,
            postData
        );
        res.status(200).json({  
            status: "success",
            message: "Updated resources title successfully",
            data: result
        });
    } catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Resources title update failed',
		});
    }

}

// Mentor Article

export async function add_MentorArticle(req,res,next){
    let postData   = req.body; 
    const url_data = postData.external_link;

    request(url_data).then(async function(html){
        //success! 
        var $ = cheerio.load(html),
        title = $('head title').text(),
        $desc = $('meta[name="description"]').attr('content'),
        $ogTitle = $('meta[property="og:title"]').attr('content'),
        $ogImage = $('meta[property="og:image"]').attr('content'),
        $images  = $('img');

        if(typeof $ogTitle == "undefined" && $ogTitle == '')
        {
            return res.status(400).json({
                status: 'error',
                message: 'Please add valid Post url',
            });
        }

        const resourcelins = new MentorArticle({
            title: postData.title, 
            shortdescription: $desc,
            external_link: url_data,
            image: $ogImage,
        });
        const resourceData = await resourcelins.save();
        res.status(200).json({
			status: 'Success',
			message: 'Resource article add successfully',
		});
    }).catch(function(err){
        console.log("err",err);
        res.status(400).json({
			status: 'error',
			message: 'Add article failed',
		});
    });
}

export async function getMentorArticleList(req,res,next){
    try{
        let status = null;
        const params = getQueryParams(req.query,status);
        const resourceData = await MentorArticle.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({  
            status: "success",
            message: "Mentor article retrieved successfully",
            data: resourceData
        });
    }catch(error){
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Article fetch failed',
		});
    }
}

export async function getMentorArticleInfo(req,res,next){
    let postData = req.body;
    try { 
        let result = await MentorArticle.findOne({_id: ObjectId(postData.id)});
        res.status(200).json({  
            status: "success",
            message: "Mentor article retrieved successfully",
            data: result
        });
    }catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Article fetch failed',
		});
    }
}

export async function updateMentorArticle(req,res,next){
    let where = {_id:req.query.id,isDeleted:false}
    let postData = req.body;
    let resultArticle = await MentorArticle.findOne({_id: ObjectId(req.query.id)});

    let articleImage;
    if(postData.articleImage == null)
    {
        articleImage = resultArticle.image;  
    }
    else
    {
        articleImage = postData.articleImage;
    }

    let obj   = {
        title: postData.title, 
		shortdescription: postData.shortdescription,
		description: postData.description,
        image: articleImage,
    }

    try {
        let result = await MentorArticle.findOneAndUpdate(
            {_id: ObjectId(req.query.id) },
            obj
        );
        res.status(200).json({  
            status: "success",
            message: "Updated mentor article successfully",
            data: result
        });
    } catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Article update failed',
		});
    }

}

export async function deleteMentorArticle(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    where["_id"] = cid;
    // where["isDeleted"] = false;
    try { 
        let result = await MentorArticle.deleteOne(where);     
        res.status(200).json({  
            status: "success",
            message: "Delete mentor article successfully",
            data: result
        });
    }catch (error) { 
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Article update failed',
		});
    }
}

// Curated Resources

export async function add_Curatedresources(req,res,next){
    let postData   = req.body; 
    const url_data = postData.external_link;

    request(url_data).then(async function(html){
        //success! 
        var $ = cheerio.load(html),
        title = $('head title').text(),
        $desc = $('meta[name="description"]').attr('content'),
        $ogTitle = $('meta[property="og:title"]').attr('content'),
        $ogImage = $('meta[property="og:image"]').attr('content'),
        $images  = $('img');

        if(typeof $ogTitle == "undefined" && $ogTitle == '')
        {
            return res.status(400).json({
                status: 'error',
                message: 'Please add valid Post url',
            });
        }

        const resourcelins = new CuratedResources({
            title: postData.title, 
            shortdescription: $desc,
            external_link: url_data,
            image: $ogImage,
        });
        const resourceData = await resourcelins.save();
        res.status(200).json({
			status: 'Success',
			message: 'Curated resources add successfully',
		});
    }).catch(function(err){
        res.status(400).json({
			status: 'error',
			message: 'Add curated resources failed',
		});
    });
}

export async function getMentorCuratedList(req,res,next){
    try{
        let status = null;
        const params = getQueryParams(req.query,status);
        const resourceData = await CuratedResources.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({  
            status: "success",
            message: "Curated Resources retrieved successfully",
            data: resourceData
        });
    }catch(error){
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Curated Resources fetch failed',
		});
    }
}

export async function getMentorCuratedInfo(req,res,next){
    let postData = req.body;
    try { 
        let result = await CuratedResources.findOne({_id: ObjectId(postData.id)});
        res.status(200).json({  
            status: "success",
            message: "Mentor Curated retrieved successfully",
            data: result
        });
    }catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Curated fetch failed',
		});
    }
}

export async function updateCuratedresources(req,res,next){
    let where = {_id:req.query.id,isDeleted:false}
    let postData = req.body;
    let resultArticle = await CuratedResources.findOne({_id: ObjectId(req.query.id)});

    let articleImage;
    if(postData.articleImage == null)
    {
        articleImage = resultArticle.image;  
    }
    else
    {
        articleImage = postData.articleImage;
    }

    let obj   = {
        title: postData.title, 
		shortdescription: postData.shortdescription,
		description: postData.description,
        image: articleImage,
    }

    try {
        let result = await CuratedResources.findOneAndUpdate(
            {_id: ObjectId(req.query.id) },
            obj
        );
        res.status(200).json({  
            status: "success",
            message: "Updated curated resources successfully",
            data: result
        });
    } catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'curated resources update failed',
		});
    }

}

export async function deleteMentorCurated(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    where["_id"] = cid;
    // where["isDeleted"] = false;
    try { 
        let result = await CuratedResources.deleteOne(where);     
        res.status(200).json({  
            status: "success",
            message: "Delete curated resource successfully",
            data: result
        });
    }catch (error) { 
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'curated update failed',
		});
    }
}

// Mentor File

export async function add_MentorFile(req,res,next){
    let postData = req.body;
    const resourcelins = new MentorFile({
		title: postData.title,
        description: postData.description, 
		file: postData.mentorFile,
        fileName: postData.mentorFilename,
		fileType: postData.mentorFiletype,
	});
    try
    {     
        const resourceData = await resourcelins.save();
        res.status(200).json({
			status: 'Success',
			message: 'Mentor file add successfully',
		});
    }
    catch(error)
    {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add file failed',
		});
    } 
}

export async function getMentorFileList(req,res,next){
    try{
        let status = null;
        const params = getQueryParams(req.query,status);
        const resourceData = await MentorFile.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({  
            status: "success",
            message: "Mentor file retrieved successfully",
            data: resourceData
        });
    }catch(error){
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'file fetch failed',
		});
    }
}

export async function deleteMentorFile(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    where["_id"] = cid;
    // where["isDeleted"] = false;
    try { 
        let result = await MentorFile.deleteOne(where);     
        res.status(200).json({  
            status: "success",
            message: "Delete mentor file successfully",
            data: result
        });
    }catch (error) { 
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'file update failed',
		});
    }
}

// Metor Testimonial

export async function getMentorTestimonialList(req,res,next){
    try{
        let status   = null;
        const params = getQueryParams(req.query,status);
        
        const page   = params.page* 1 || 1;
		const limit  = params.limit * 1 || 100;
		const skip   = (page - 1) * limit;

        let Allaggregate = [ 
            { $sort: { _id: -1 } },
            {
                $lookup:{
                        from: 'users',
                        localField: 'user',
                        foreignField: '_id',
                        as: 'userdata'
                }
            },
            { $unwind: {   path: "$userdata",  preserveNullAndEmptyArrays: false }  },
            { $skip: skip },
            { $limit: limit },
            {   
                $project: { 
                  _id:1,
                  description:1,
                  status:1,
                  userdata: "$userdata"
                } 
            },  
        ];
        var all_testimonial = await MentorTestimonial.aggregate(
            Allaggregate
        );
        let totalrecord = await MentorTestimonial.find().count();    
        res.status(200).json({   
            status: "success",
            message: "Mentor testimonial retrieved successfully",
            data: all_testimonial,
            totalDocs: totalrecord,
        });
    }catch(error){
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'testimonial fetch failed',
		});
    }
}

export async function updatetestimonialStatus(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    where["_id"] = cid;
    where["isDeleted"] = false;
    try { 
        let result = await MentorTestimonial.findOneAndUpdate(where, {
        status: req.body.status,
        });     
        res.status(200).json({  
            status: "success",
            message: "Updated mentor testimonial successfully",
            data: result
        });
    }catch (error) { 
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'testimonial update failed',
		});
    }
}

// Start Mentor Perks

export async function add_MentorPerks(req,res,next){
    let postData = req.body;
    const resourcelins = new MentorPerks({
		title: postData.title,
        featured: postData.featured, 
		description: postData.description,
		tags: postData.tags,
        short_description: postData.short_description,
        image: postData.image
	});
    try
    {     
        const resourceData = await resourcelins.save();
        res.status(200).json({
			status: 'Success',
			message: 'Perks added successfully',
		});
    }
    catch(error)
    {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Perks failed',
		});
    } 
}

export async function getMentorPerksInfo(req,res,next){
    let postData = req.body;
    try { 
        let result = await MentorPerks.findOne({_id: ObjectId(postData.id)});
        res.status(200).json({  
            status: "success",
            message: "Mentor perks retrieved successfully",
            data: result
        });
    }catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Perks fetch failed',
		});
    }

}

export async function updateMentorPerks(req,res,next){
    let where = {_id:req.query.id,isDeleted:false}
    let postData = req.body;
    let obj   = {
        title: postData.title,
        featured: postData.featured, 
		description: postData.description,
		tags: postData.tags,
        short_description: postData.short_description,
        image: postData.image
    }

    try {
        let result = await MentorPerks.findOneAndUpdate(
            {_id: ObjectId(req.query.id) },
            obj
        );
        res.status(200).json({  
            status: "success",
            message: "Updated mentor perks successfully",
            data: result
        });
    } catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Perks update failed',
		});
    }

}

export async function deleteMentorPerks(req,res,next){
    let cid   = ObjectId(req.body.id);
    let actionType   = req.body.actionType;
    let where = {};
    if(actionType == true){
        where["isDeleted"] = false;
    }else{
        where["isDeleted"] = true;
    }
    where["_id"] = cid;
    try { 
        let result = await MentorPerks.findOneAndUpdate(where, {
        isDeleted: actionType,
        });     
        res.status(200).json({  
            status: "success",
            message: "Updated mentor perks successfully",
            data: result
        });
    }catch (error) { 
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Perks update failed',
		});
    }
}

export async function getMentorPerksList(req,res,next){
    try{
        let status = null;
        const params = getQueryParams(req.query,status);
        const resourceData = await MentorPerks.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({  
            status: "success",
            message: "Mentor perks retrieved successfully",
            data: resourceData
        });
    }catch(error){
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Perks fetch failed',
		});
    }
}
// End Mentor Perks

// Agareement Api

export async function add_NewAgreement(req,res,next){
    let postData = req.body;
    let agree_status;
    if(postData.status == true)
    {
        agree_status = false;
    }
    else
    {
        agree_status = true;
    }
    const agreementlins = new AgreementTerms({
		title: postData.title, 
		description: postData.description,
        isDeleted: agree_status,
  	});
    try
    {     
        const agreementData = await agreementlins.save();
        res.status(200).json({
			status: 'Success',
			message: 'Agreement add successfully',
		});
    }
    catch(error)
    {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Agreement failed',
		});
    } 
}

export async function updateAgreementTerms(req,res,next){
    let where = {_id:req.query.id,isDeleted:false}
    let postData = req.body;
    let agree_status;
    if(postData.status == true)
    {
        agree_status = false;
    }
    else
    {
        agree_status = true;
    }
    let obj   = {
        title: postData.title, 
		description: postData.description,
        isDeleted: agree_status,
    }

    try {
        let result = await AgreementTerms.findOneAndUpdate(
            {_id: ObjectId(req.query.id),type_policy: postData.type_policy},
            obj
        );
        res.status(200).json({  
            status: "success",
            message: "Updated Agreement successfully",
            data: result
        });
    } catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Agreement update failed',
		});
    }

}

export async function getAgreementInfo(req,res,next){
    let postData = req.body;
    try {  
        let result = await AgreementTerms.findOne({_id: ObjectId(postData.id)});
        res.status(200).json({   
            status: "success",
            message: "Agreement retrieved successfully",
            data: result
        }); 
    }catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Agreement fetch failed',
		});
    }

}

export async function getAgreementTermsList(req,res,next){
    try{
        let status = null;
        const params = getQueryParams(req.query,status);
        const resourceData = await AgreementTerms.paginate({ $and: [{ type_policy: req.query.type_policy }]},{ page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({  
            status: "success",
            message: "Agreement retrieved successfully",
            data: resourceData
        });
    }catch(error){
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Agreement fetch failed',
		});
    }
}

// Start Collegey Opportunities

export async function add_CollegeyOpportunities(req,res,next){
    let postData = req.body;
    const resourcelins = new CollegeyOpportunities({
		title: postData.title,
        featured: postData.featured, 
		description: postData.description,
		tags: postData.tags,
        short_description: postData.short_description,
        image: postData.image
	});
    try
    {     
        const resourceData = await resourcelins.save();
        res.status(200).json({
			status: 'Success',
			message: 'Collegey opportunity added successfully',
		});
    }
    catch(error)
    {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Collegey opportunity failed',
		});
    } 
}

export async function getCollegeyOpportunitiesInfo(req,res,next){
    let postData = req.body;
    try { 
        let result = await CollegeyOpportunities.findOne({_id: ObjectId(postData.id)});
        res.status(200).json({  
            status: "success",
            message: "Collegey opportunity retrieved successfully",
            data: result
        });
    }catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Collegey opportunity fetch failed',
		});
    }

}

export async function updateCollegeyOpportunities(req,res,next){
    let where = {_id:req.query.id,isDeleted:false}
    let postData = req.body;
    let obj   = {
        title: postData.title,
        featured: postData.featured, 
		description: postData.description,
		tags: postData.tags,
        short_description: postData.short_description,
        image: postData.image
    }

    try {
        let result = await CollegeyOpportunities.findOneAndUpdate(
            {_id: ObjectId(req.query.id) },
            obj
        );
        res.status(200).json({  
            status: "success",
            message: "Updated collegey opportunity successfully",
            data: result
        });
    } catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Collegey opportunity update failed',
		});
    }

}

export async function deleteCollegeyOpportunities(req,res,next){
    let cid   = ObjectId(req.body.id);
    let actionType   = req.body.actionType;
    let where = {};
    if(actionType == true){
        where["isDeleted"] = false;
    }else{
        where["isDeleted"] = true;
    }
    where["_id"] = cid;
    try { 
        let result = await CollegeyOpportunities.findOneAndUpdate(where, {
        isDeleted: actionType,
        });     
        res.status(200).json({  
            status: "success",
            message: "Updated collegey opportunity successfully",
            data: result
        });
    }catch (error) { 
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Collegey opportunity update failed',
		});
    }
}

export async function getCollegeyOpportunitiesList(req,res,next){
    try{
        let status = null;
        const params = getQueryParams(req.query,status);
        const resourceData = await CollegeyOpportunities.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({  
            status: "success",
            message: "Collegey opportunity retrieved successfully",
            data: resourceData
        });
    }catch(error){
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Collegey opportunity fetch failed',
		});
    }
}


// End Collegey Opportunities


export async function add_NewPrivacy(req,res,next){
    let postData = req.body;
    let agree_status;
    if(postData.status == true)
    {
        agree_status = false;
    }
    else
    {
        agree_status = true;
    }
    const privacylins = new AgreementPrivacyPolicy({
		title: postData.title, 
		description: postData.description,
        isDeleted: agree_status,
	});
    try
    {     
        const privacyData = await privacylins.save();
        res.status(200).json({
			status: 'Success',
			message: 'Privacy add successfully',
		});
    }
    catch(error)
    {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add Privacy failed',
		});
    } 
}

export async function updatePrivacy(req,res,next){
    let where = {_id:req.query.id,isDeleted:false}
    let postData = req.body;
    let agree_status;
    if(postData.status == true)
    {
        agree_status = false;
    }
    else
    {
        agree_status = true;
    }
    let obj   = {
        title: postData.title, 
		description: postData.description,
        isDeleted: agree_status,
    }
    try {
        let result = await AgreementPrivacyPolicy.findOneAndUpdate(
            {_id: ObjectId(req.query.id) },
            obj
        );
        res.status(200).json({  
            status: "success",
            message: "Updated Privacy successfully",
            data: result
        });
    } catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Privacy update failed',
		});
    }

}

export async function getPrivacyInfo(req,res,next){
    let postData = req.body;
    try {  
        let result = await AgreementPrivacyPolicy.findOne({_id: ObjectId(postData.id)});
        res.status(200).json({   
            status: "success",
            message: "Privacy retrieved successfully",
            data: result
        }); 
    }catch (error) {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Privacy fetch failed',
		});
    }

}

export async function getPrivacyList(req,res,next){
    try{
        let status = null;
        const params = getQueryParams(req.query,status);
        const resourceData = await AgreementPrivacyPolicy.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({  
            status: "success",
            message: "Privacy retrieved successfully",
            data: resourceData
        });
    }catch(error){
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Privacy fetch failed',
		});
    }
}

