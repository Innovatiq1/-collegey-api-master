import { blogPostServices, blogGetServices } from "../../services/blogServices";
import Blogs from '../../models/Blogs';
export async function index (req, res, next) {
    try{
        const blogs = await blogGetServices.getAll(req.query);
        res.status(200).json({
            status: "success",
            message: "blog retrieved successfully",
            data: blogs
        });
    }catch(e){
        next(e);
    }
}
export async function blogTag (req, res, next) {
    try{
        const blogs = await Blogs.find({ tags: req.body.blogTag });
        if(blogs){
        res.status(200).json({
            status: "success",
            message: "blog retrieved successfully",
            data: blogs
        });
    }else{
        res.status(400).json({
            status: "success",
            message: "blog failed",
            data: ""
        });

    }
    }catch(e){
        next(e);
    }
}

const _new = async function (req, res, next) {
    try {
        const blogs = await blogPostServices.saveRequest(req.body)
        res.status(200).json({
            status: "success",
            message: "blog created successfully",
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
        const blog = await blogPostServices.updateBlog(req.body, req.params.id);
        if(blog){
            res.status(200).json({
                status: "success",
                message: "blog updated successfully",
                data: blog
            });
        }
    }catch(e){
        next(e);
    }
}

const _delete = async function (req, res, next) {
    try {
        const blog = await blogPostServices.deleteBlog(req.params.id);
        if(blog){
            res.status(200).json({
                status: "success",
                message: "blog deleted successfully",
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
        const blog = await blogGetServices.getOne(req.params.id);
        if(blog){
            res.status(200).json({
                status: "success",
                message: "blog details",
                data: blog
            });
        }
    }catch(e){
        next(e);
    }
}