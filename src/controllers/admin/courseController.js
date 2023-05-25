import { coursePostServices, courseGetServices } from "../../services/courseServices";
export async function index (req, res, next) {
    try{
        const courses = await courseGetServices.getAll(req.query);
        res.status(200).json({
            status: "success",
            message: "course retrieved successfully",
            data: courses
        });
    }catch(e){
        next(e);
    }
}

const _new = async function (req, res, next) {
    try {
        const course = await coursePostServices.saveRequest(req.body)
        res.status(200).json({
            status: "success",
            message: "course created successfully",
            data: course
        });
    }
    catch (e) {
        next(e);
    }
};
export { _new as new };

export async function edit (req, res, next) {
    try{
        const course = await coursePostServices.updateCourse(req.body, req.params.id);
        if(course){
            res.status(200).json({
                status: "success",
                message: "course updated successfully",
                data: course
            });
        }
    }catch(e){
        next(e);
    }
}

const _delete = async function (req, res, next) {
    try {
        const course = await coursePostServices.deleteCourse(req.params.id);
        if(course){
            res.status(200).json({
                status: "success",
                message: "course deleted successfully",
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
        const course = await courseGetServices.getOne(req.params.id);
        if(course){
            res.status(200).json({
                status: "success",
                message: "course details",
                data: course
            });
        }
    }catch(e){
        next(e);
    }
}