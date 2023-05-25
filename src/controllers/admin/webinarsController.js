import { webinarPostServices, webinarGetServices } from "../../services/webinarServices";
export async function index (req, res, next) {
    try{
        const webinars = await webinarGetServices.getAll(req.query);
        res.status(200).json({
            status: "success",
            message: "webinar retrieved successfully",
            data: webinars
        });
    }catch(e){
        next(e);
    }
}

const _new = async function (req, res, next) {
    try {
        let postData = req.body;
        let videoLink = postData.video_url;
        if (videoLink.includes('vimeo')) {
            videoLink = 'https://player.vimeo.com/video/' + videoLink.substring(videoLink.lastIndexOf("/") + 1);
        }
        postData['video_url'] = videoLink;
        console.log('postData===>', postData);
        const webinars = await webinarPostServices.saveRequest(postData)
        res.status(200).json({
            status: "success",
            message: "webinar created successfully",
            data: webinars
        });
    }
    catch (e) {
        next(e);
    }
};
export { _new as new };

export async function edit (req, res, next) {
    try{
        const webinar = await webinarPostServices.updateWebinar(req.body, req.params.id);
        if(webinar){
            res.status(200).json({
                status: "success",
                message: "webinar updated successfully",
                data: webinar
            });
        }
    }catch(e){
        next(e);
    }
}

const _delete = async function (req, res, next) {
    try {
        const webinar = await webinarPostServices.deleteWebinar(req.params.id);
        if(webinar){
            res.status(200).json({
                status: "success",
                message: "webinar deleted successfully",
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
        const webinar = await webinarGetServices.getOne(req.params.id);
        if(webinar){
            res.status(200).json({
                status: "success",
                message: "webinar details",
                data: webinar
            });
        }
    }catch(e){
        next(e);
    }
}