import { colleageFundPostServices, colleageFundGetServices} from "../../services/colleagefundServices";
import { emailType, sendEmail } from '../../utilities/emailHelper';

const catchAsync = require('../../utils/catchAsync');
export async function index (req, res, next) {
    try{
        const blogs = await colleageFundGetServices.getAll(req.query);
        //console.log("==================",blogs)
        res.status(200).json({
            status: "success",
            message: "colleageStudentFund retrieved successfully",
            data: blogs
        });
    }catch(e){
        next(e);
    }
}

export async function fetch_all (req, res, next) {
    try{
        const blogs = await colleageFundGetServices.fetch_all();
        res.status(200).json({
            status: "success",
            message: "colleageStudentFund retrieved successfully",
            data: blogs
        });
    }catch(e){
        next(e);
    }
}
const _new = async function (req, res, next) {
    try {
        const blogs = await colleageFundPostServices.saveRequest(req.body);
        sendEmail(emailType.ADD_NEW_COLLEGEY_FUNDS,blogs);
        res.status(200).json({
            status: "success",
            message: "colleageStudentFund created successfully",
            data: blogs
        });
    }
    catch (e) {
        next(e);
    }
};
export { _new as new };