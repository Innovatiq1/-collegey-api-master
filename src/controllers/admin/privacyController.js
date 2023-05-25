import { privacyPostServices, privacyGetServices} from "../../services/privacyServices";
export async function index (req, res, next) {
    try{
        const blogs = await privacyGetServices.getAll(req.query);
        //console.log("==================",blogs)
        res.status(200).json({
            status: "success",
            message: "privcy retrieved successfully",
            data: blogs
        });
    }catch(e){
        next(e);
    }
}

const _new = async function (req, res, next) {
    try {
        const blogs = await privacyPostServices.saveRequest(req.body)
        res.status(200).json({
            status: "success",
            message: "privacy created successfully",
            data: blogs
        });
    }
    catch (e) {
        next(e);
    }
};
export { _new as new };
export async function edit (req, res, next) {
    try{
        const blog = await privacyPostServices.updateBlog(req.body, req.params.id);
        if(blog){
            res.status(200).json({
                status: "success",
                message: "privacy updated successfully",
                data: blog
            });
        }
    }catch(e){
        next(e);
    }
}
const _delete = async function (req, res, next) {
    try {
        const blog = await privacyPostServices.deleteBlog(req.params.id);
        if(blog){
            res.status(200).json({
                status: "success",
                message: "privacy deleted successfully",
            });
        }
    }
    catch (e) {
        next(e);
    }
};
export { _delete as delete };

export async function view (req, res, next) {
    try{
        const blog = await privacyGetServices.getOne(req.params.id);
        if(blog){
            res.status(200).json({
                status: "success",
                message: "privacy details",
                data: blog
            });
        }
    }catch(e){
        next(e);
    }
}





