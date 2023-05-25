import { conferencePostServices, conferenceGetServices } from "../../services/conferenceServices";
export async function index (req, res, next) {
    try{
        const conferences = await conferenceGetServices.getAll(req.query);
        res.status(200).json({
            status: "success",
            message: "conference retrieved successfully",
            data: conferences
        });
    }catch(e){
        next(e);
    }
}

const _new = async function (req, res, next) {
    try {
        const conferences = await conferencePostServices.saveRequest(req.body)
        res.status(200).json({
            status: "success",
            message: "conference created successfully",
            data: conferences
        });
    }
    catch (e) {
        next(e);
    }
};
export { _new as new };

export async function edit (req, res, next) {
    try{
        const conference = await conferencePostServices.updateConference(req.body, req.params.id);
        if(conference){
            res.status(200).json({
                status: "success",
                message: "conference updated successfully",
                data: conference
            });
        }
    }catch(e){
        next(e);
    }
}

const _delete = async function (req, res, next) {
    try {
        const conference = await conferencePostServices.deleteConference(req.params.id);
        if(conference){
            res.status(200).json({
                status: "success",
                message: "conference deleted successfully",
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
        const conference = await conferenceGetServices.getOne(req.params.id);
        if(conference){
            res.status(200).json({
                status: "success",
                message: "conference details",
                data: conference
            });
        }
    }catch(e){
        next(e);
    }
}