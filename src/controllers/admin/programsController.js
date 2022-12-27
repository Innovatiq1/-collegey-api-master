import { programPostServices, programGetServices } from "../../services/programServices";
export async function index (req, res, next) {
    try{
        const programs = await programGetServices.getAll(req.query);
        res.status(200).json({
            status: "success",
            message: "program retrieved successfully",
            data: programs
        });
    }catch(e){
        next(e);
    }
}

const _new = async function (req, res, next) {
    try {
        const program = await programPostServices.saveRequest(req.body)
        res.status(200).json({
            status: "success",
            message: "program created successfully",
            data: program
        });
    }
    catch (e) {
        next(e);
    }
};
export { _new as new };

export async function edit (req, res, next) {
    try{
        const program = await programPostServices.updateProgram(req.body, req.params.id);
        if(program){
            res.status(200).json({
                status: "success",
                message: "program updated successfully",
                data: program
            });
        }
    }catch(e){
        next(e);
    }
}

const _delete = async function (req, res, next) {
    try {
        const program = await programPostServices.deleteProgram(req.params.id);
        if(program){
            res.status(200).json({
                status: "success",
                message: "program deleted successfully",
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
        const program = await programGetServices.getOne(req.params.id);
        if(program){
            res.status(200).json({
                status: "success",
                message: "program details",
                data: program
            });
        }
    }catch(e){
        next(e);
    }
}