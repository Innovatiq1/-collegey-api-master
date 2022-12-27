import { bannerPostServices, bannerGetServices } from "../../services/bannerService";
import BannerImage from '../../models/bannerImages/bannerImage';

export async function addBanner (req, res, next) {
    try {
        const banner = await bannerPostServices.saveBanner(req.body)
        res.status(200).json({
            status: "success",
            message: "Banner Added Successfully",
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
            message: "Banner Remove Successfully",
        });
    }
    catch (e) {
        next(e);
    }
};

export async function getBannerByUse (req, res, next) {
    try{
        const bannerList = await bannerGetServices.getBannerByUse(req.params.bannerFor);
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

export async function updateBanner (req, res, next) {
    try {
        console.log("req.body.isActivated===>", req.body.isActivated)
        const activeStatus = req.body.isActivated; 
        const banner = await bannerPostServices.editBanner(req.params.id, activeStatus)
        res.status(200).json({
            status: "success",
            message: "Banner Updated Successfully",
            data: banner
        });
    }
    catch (e) {
        next(e);
    }
};

export async function deleteBanner (req, res, next) {
    try {
        const banner = await BannerImage.findByIdAndDelete(req.params.id)
        res.status(200).json({
            status: "success",
            message: "Banner Deleted Successfully",
            data: banner
        });
    }
    catch (e) {
        next(e);
    }
};