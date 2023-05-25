import { enrollmentPostServices, enrollmentGetServices } from "../../services/enrollmentService";
export async function index (req, res, next) {
    try{
        const enrollments = await enrollmentGetServices.getAll(req.query);
        res.status(200).json({
            status: "success",
            message: "enrollments retrieved successfully",
            data: enrollments
        });
    }catch(e){
        next(e);
    }
}

const _new = async function (req, res, next) {
    try {
        const enrollment = await enrollmentPostServices.saveRequest(req.body)
        res.status(200).json({
            status: "success",
            message: "enrollment created successfully",
            data: enrollment
        });
    }
    catch (e) {
        next(e);
    }
};
export { _new as new };

export async function edit (req, res, next) {
    try{
        const enrollment = await enrollmentPostServices.updateProject(req.body, req.params.id);
        if(enrollment){
            res.status(200).json({
                status: "success",
                message: "enrollment updated successfully",
                data: enrollment
            });
        }
    }catch(e){
        next(e);
    }
}

const _delete = async function (req, res, next) {
    try {
        const enrollment = await enrollmentPostServices.deleteProject(req.params.id);
        if(enrollment){
            res.status(200).json({
                status: "success",
                message: "enrollment deleted successfully",
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
        const enrollment = await enrollmentGetServices.getOne(req.params.id);
        if(enrollment){
            res.status(200).json({
                status: "success",
                message: "enrollment details",
                data: enrollment
            });
        }
    }catch(e){
        next(e);
    }
}