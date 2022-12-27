import { TermsPostServices, termsGetServices} from "../../services/termsServices";
export async function index (req, res, next) {
    try{
        const blogs = await termsGetServices.getAll(req.query);
       // console.log("==================",blogs)
        res.status(200).json({
            status: "success",
            message: "terms retrieved successfully",
            data: blogs
        });
    }catch(e){
        next(e);
    }
}

const _new = async function (req, res, next) {
    try {
        const blogs = await TermsPostServices.saveRequest(req.body)
        res.status(200).json({
            status: "success",
            message: "Terms created successfully",
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
        const blog = await TermsPostServices.updateBlog(req.body, req.params.id);
        if(blog){
            res.status(200).json({
                status: "success",
                message: "terms updated successfully",
                data: blog
            });
        }
    }catch(e){
        next(e);
    }
}
const _delete = async function (req, res, next) {
    try {
        const blog = await TermsPostServices.deleteBlog(req.params.id);
        if(blog){
            res.status(200).json({
                status: "success",
                message: "terms deleted successfully",
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
        const blog = await termsGetServices.getOne(req.params.id);
        if(blog){
            res.status(200).json({
                status: "success",
                message: "terms details",
                data: blog
            });
        }
    }catch(e){
        next(e);
    }
}





