import { projectIdeGetServices } from "../../services/studentProjectIdeaServices";
exports.getAll = async function (req, res, next) {
    try{
        const projectIdeaList = await projectIdeGetServices.getAll(req.query);
        res.status(200).json({
            status: "success",
            message: "Project Idea List retrieved successfully",
            data: projectIdeaList
        });
    }catch(e){
        next(e);
    }
}