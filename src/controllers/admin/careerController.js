import { careerProfilePostService, careerProfileGetService } from "../../services/careerService";
import { emailType, sendEmail } from '../../utilities/emailHelper';
export async function index (req, res, next) {
    try{
        const careerProfile = await careerProfileGetService.getAll(req.query);
        res.status(200).json({
            status: "success",
            message: "Profile retrieved successfully",
            data: careerProfile
        });
    }catch(e){
        next(e);
    }
}

export async function fetch_all (req, res, next) {
    try{
        const careerProfile = await careerProfileGetService.fetch_all();
        res.status(200).json({
            status: "success",
            message: "Profile retrieved successfully",
            data: careerProfile
        });
    }catch(e){
        next(e);
    }
}

const _new = async function (req, res, next) {
    try {
        const profile = await careerProfilePostService.saveRequest(req.body)
        sendEmail(emailType.ADD_NEW_COLLEGEY_CAREER,profile);
        res.status(200).json({
            status: "success",
            message: "Profile created successfully",
            data: profile
        });
    }
    catch (e) {
        next(e);
    }
};
export { _new as new };


export async function view (req, res, next) {
    try{
        const profile = await careerProfileGetService.getOne(req.params.id);
        if(profile){
            res.status(200).json({
                status: "success",
                message: "Profile details",
                data: profile
            });
        }
    }catch(e){
        next(e);
    }
}