const bcrypt   = require('bcryptjs');
const { ObjectId } = require('bson');
import NrStudentResource from '../../../models/nr-resource/nr-resource';
import NrStudentArticle  from '../../../models/nr-article/nr-article';
import NrCuratedResources  from '../../../models/nr-curated-resources/nr-curated-resources';
import NrStudentFile     from '../../../models/nr-student-file/nr-student-file';
// import StudentTestimonial from '../../../models/student-testimonial/student-testimonial';
// import StudentPerks  from '../../../models/student-perks/student-perks';
// import CollegeyOpportunities  from '../../../models/student-perks/collegey-opportunities';
// import AgreementTerms  from '../../../models/agreement-terms/agreement-terms';
// import AgreementPrivacyPolicy  from '../../../models/agreement-terms/agreement-privacypolicy';

// Load Helper
import { getQueryParams } from '../../../utilities/helpers';
const request = require('request-promise');
const cheerio = require('cheerio');

export async function add_StudentResources(req,res,next){
    let postData = req.body;
    const resourcelins = new NrStudentResource({
		title: postData.title, 
		description: postData.description,
		link: postData.link,
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

export async function getStudentResourceInfo(req,res,next){
    let postData = req.body;
    try { 
        let result = await NrStudentResource.findOne({_id: ObjectId(postData.id)});
        res.status(200).json({  
            status: "success",
            message: "Student resource retrieved successfully",
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

export async function updateStudentResource(req,res,next){
    let where = {_id:req.query.id,isDeleted:false}
    let postData = req.body;
    let obj   = {
        title: postData.title, 
		description: postData.description,
		link: postData.link,
    }

    try {
        let result = await NrStudentResource.findOneAndUpdate(
            {_id: ObjectId(req.query.id) },
            obj
        );
        res.status(200).json({  
            status: "success",
            message: "Updated student resource successfully",
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

export async function deleteStudentResource(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    where["_id"] = cid;
    // where["isDeleted"] = false;
    try { 
        let result = await NrStudentResource.deleteOne(where);     
        res.status(200).json({  
            status: "success",
            message: "Delete student resource successfully",
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

export async function getStudentResourcesList(req,res,next){
    try{
        let status = null;
        const params = getQueryParams(req.query,status);
        const resourceData = await NrStudentResource.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({  
            status: "success",
            message: "Student resource retrieved successfully",
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

// Student Article

export async function add_StudentArticle(req,res,next){
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

        const resourcelins = new NrStudentArticle({
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
       // console.log("err",err);
        res.status(400).json({
			status: 'error',
			message: 'Add article failed',
		});
    });
}

export async function getStudentArticleList(req,res,next){
    try{
        let status = null;
        const params = getQueryParams(req.query,status);
        const resourceData = await NrStudentArticle.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({  
            status: "success",
            message: "Student article retrieved successfully",
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

export async function getStudentArticleInfo(req,res,next){
    let postData = req.body;
    try { 
        let result = await NrStudentArticle.findOne({_id: ObjectId(postData.id)});
        res.status(200).json({  
            status: "success",
            message: "Student article retrieved successfully",
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

export async function updateStudentArticle(req,res,next){
    let where = {_id:req.query.id,isDeleted:false}
    let postData = req.body;
    let resultArticle = await NrStudentArticle.findOne({_id: ObjectId(req.query.id)});

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
        let result = await NrStudentArticle.findOneAndUpdate(
            {_id: ObjectId(req.query.id) },
            obj
        );
        res.status(200).json({  
            status: "success",
            message: "Updated student article successfully",
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

export async function deleteStudentArticle(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    where["_id"] = cid;
    // where["isDeleted"] = false;
    try { 
        let result = await NrStudentArticle.deleteOne(where);     
        res.status(200).json({  
            status: "success",
            message: "Updated student article successfully",
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

        const resourcelins = new NrCuratedResources({
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

export async function getStudentCuratedList(req,res,next){
    try{
        let status = null;
        const params = getQueryParams(req.query,status);
        const resourceData = await NrCuratedResources.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
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

export async function getStudentCuratedInfo(req,res,next){
    let postData = req.body;
    try { 
        let result = await NrCuratedResources.findOne({_id: ObjectId(postData.id)});
        res.status(200).json({  
            status: "success",
            message: "Student Curated retrieved successfully",
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
    let resultArticle = await NrCuratedResources.findOne({_id: ObjectId(req.query.id)});

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
        let result = await NrCuratedResources.findOneAndUpdate(
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

export async function deleteStudentCurated(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    where["_id"] = cid;
    // where["isDeleted"] = false;
    try { 
        let result = await NrCuratedResources.deleteOne(where);     
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

// Student File

export async function add_StudentFile(req,res,next){
    let postData = req.body;
    const resourcelins = new NrStudentFile({
		title: postData.title,
        description: postData.description, 
		file: postData.studentFile,
        fileName: postData.studentFilename,
		fileType: postData.studentFiletype,
	});
    try
    {     
        const resourceData = await resourcelins.save();
        res.status(200).json({
			status: 'Success',
			message: 'Student file add successfully',
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

export async function getStudentFileList(req,res,next){
    try{
        let status = null;
        const params = getQueryParams(req.query,status);
        const resourceData = await NrStudentFile.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({  
            status: "success",
            message: "Student file retrieved successfully",
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

export async function deleteStudentFile(req,res,next){
    let cid   = ObjectId(req.body.id);
    let where = {};
    where["_id"] = cid;
    // where["isDeleted"] = false;
    try { 
        let result = await NrStudentFile.deleteOne(where);     
        res.status(200).json({  
            status: "success",
            message: "Delete student file successfully",
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

export async function getStudentTestimonialList(req,res,next){
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
        var all_testimonial = await StudentTestimonial.aggregate(
            Allaggregate
        );
        let totalrecord = await StudentTestimonial.find().count();    
        res.status(200).json({   
            status: "success",
            message: "Student testimonial retrieved successfully",
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
        let result = await StudentTestimonial.findOneAndUpdate(where, {
        status: req.body.status,
        });     
        res.status(200).json({  
            status: "success",
            message: "Updated student testimonial successfully",
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

// Start Student Perks

export async function add_StudentPerks(req,res,next){
    let postData = req.body;
    const resourcelins = new StudentPerks({
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

export async function getStudentPerksInfo(req,res,next){
    let postData = req.body;
    try { 
        let result = await StudentPerks.findOne({_id: ObjectId(postData.id)});
        res.status(200).json({  
            status: "success",
            message: "Student perks retrieved successfully",
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

export async function updateStudentPerks(req,res,next){
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
        let result = await StudentPerks.findOneAndUpdate(
            {_id: ObjectId(req.query.id) },
            obj
        );
        res.status(200).json({  
            status: "success",
            message: "Updated student perks successfully",
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

export async function deleteStudentPerks(req,res,next){
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
        let result = await StudentPerks.findOneAndUpdate(where, {
        isDeleted: actionType,
        });     
        res.status(200).json({  
            status: "success",
            message: "Updated student perks successfully",
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

export async function getStudentPerksList(req,res,next){
    try{
        let status = null;
        const params = getQueryParams(req.query,status);
        const resourceData = await StudentPerks.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({  
            status: "success",
            message: "Student perks retrieved successfully",
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
// End Student Perks

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
            {_id: ObjectId(req.query.id),type_policy: 'student' },
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
        const resourceData = await AgreementTerms.paginate({},{ page: params.page, limit: params.limit, sort: params.sortBy });
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

