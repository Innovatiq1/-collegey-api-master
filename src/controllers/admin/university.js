import { universityPostServices, universityGetServices } from "../../services/univrsityService";
//import BannerImage from '../../models/bannerImages/bannerImage';
import University from '../../models/university/university';
const factory = require('../factoryFunctions/handlerFactory');


exports.getUniversityList = factory.getAll(University);
//exports.updateUniversity1 = factory.
//exports.updateUniversity1 = factory.updateOne(University);
exports.getUniversity = factory.getOne(University);


export async function addUniversity (req, res, next) {
    try {
        const banner = await universityPostServices.saveUniversity(req.body)
        res.status(200).json({
            status: "success",
            message: "University Added Successfully",
            data: banner
        });
    }
    catch (e) {
        next(e);
    }
};
export async function getUniversity (req, res, next) {
    let filterValue = req.query.filterName;
    try {
        const banner = await universityPostServices.getUniversityInfo(filterValue)
        res.status(200).json({
            status: "success",
            message: "University Fetch Successfully",
            data: banner
        });
    }
    catch (e) {
        next(e);
    }
};

export async function removeBannerImage (req, res, next) {
    try {
        const banner = await BannerImage.deleteOne({_id: req.body.id});
        res.status(200).json({
            status: "success",
            message: "University Remove Successfully",
        });
    }
    catch (e) {
        next(e);
    }
};


export async function getUniversityList (req, res, next) {
    console.log("testttttttttttttttttttttttttt")   

    try{
        const bannerList = await universityGetServices.getUniversityList(req);
        console.log("===bannerList==",bannerList)
        if(bannerList){
            res.status(200).json({
                status: "success",
                message: "Banner List",
                data: bannerList
            });
        }
    }catch(e){
        next(e);
    }
}

export async function updateUniversity (req, res, next) {
    try {
        console.log("req.body.isActivated===>", req.body.isActivated)
        const activeStatus = req.body.isActivated; 
        const banner = await universityPostServices.editUniversity(req.params.id, req.body)
        res.status(200).json({
            status: "success",
            message: "University Updated Successfully",
            data: banner
        });
    }
    catch (e) {
        next(e);
    }
};

export async function deleteUniversity (req, res, next) {
    try {
        const banner = await University.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            message: "University Deleted Successfully",
            data: banner
        });
    }
    catch (e) {
        next(e);
    }
};