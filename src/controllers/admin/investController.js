import { investProfilePostService, investProfileGetService } from "../../services/investService";
import { emailType, sendEmail } from '../../utilities/emailHelper';
export async function index (req, res, next) {
    try{
        const investProfile = await investProfileGetService.getAll(req.query);
        res.status(200).json({
            status: "success",
            message: "Profile retrieved successfully",
            data: investProfile
        });
    }catch(e){
        next(e);
    }
}

export async function fetch_all (req, res, next) {
    try{
        const investProfile = await investProfileGetService.fetchAll();
        res.status(200).json({
            status: "success",
            message: "Profile retrieved successfully",
            data: investProfile
        });
    }catch(e){
        next(e);
    }
}

const _new = async function (req, res, next) {
    try {
        const profile = await investProfilePostService.saveRequest(req.body);
        sendEmail(emailType.ADD_NEW_INVEST_PROFILE,profile);
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
        const profile = await investProfileGetService.getOne(req.params.id);
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