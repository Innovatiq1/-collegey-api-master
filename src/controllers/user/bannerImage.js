import { bannerPostServices, bannerGetServices } from "../../services/bannerService";
import BannerImage from '../../models/bannerImages/bannerImage';
import { matchedData } from "express-validator";

export async function getBannerByUser (req, res, next) {
    try{
        const bannerFor = req.body.bannerFor;
        //console.log("Banner For==>", req.body)

        const bannerList = await bannerGetServices.getBannerForUsers({"bannerFor": bannerFor, "isActivated": true});
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