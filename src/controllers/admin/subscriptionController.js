import { subscriptionPostService, subscriptionGetService } from "../../services/subscriptionService";
import { emailType, sendEmail } from '../../utilities/emailHelper';
var newsLetter = require("../../models/newsletters")
export async function index (req, res, next) {
    try{
        const subscriptions = await subscriptionGetService.getAll(req.query);
        res.status(200).json({
            status: "success",
            message: "Subscriptions retrieved successfully",
            data: subscriptions
        });
    }catch(e){
        next(e);
    }
}

const _new = async function (req, res, next) {
    try {
        const subscription = await subscriptionPostService.saveRequest(req.body)
        res.status(200).json({
            status: "success",
            message: "Subscription created successfully",
            data: subscription
        });
    }
    catch (e) {
        next(e);
    }
};
export { _new as new };


export async function view (req, res, next) {
    try{
        const subscription = await subscriptionGetService.getOne(req.params.id);
        if(subscription){
            res.status(200).json({
                status: "success",
                message: "Subscription details",
                data: subscription
            });
        }
    }catch(e){
        next(e);
    }
}

//news latter
const createNewsLetter = async function (req, res, next) {
    
    try {
        const newsLetters = await newsLetter.findOne({email:req.body.email});
        if(newsLetters){
            throw new Error ('Email Id already exist');
        }
        else{
            var letterLine = new newsLetter({
                email:req.body.email
            });
            const newsLetters = await letterLine.save();
            let mailObj = {
                email:req.body.email
            }
            sendEmail(emailType.NEWS_LETTER_SUBSCRIPTION, mailObj);
        }

        res.status(200).json({
            status: "success",
            message: "News Letter created successfully",
            // data: subscription
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
            // data: subscription
        });
    }
};
export {createNewsLetter};

const listNewsLetter = async function (req, res) {
    try { 
        const newsLetters = await newsLetter.find({}).sort({_id:-1}).limit(req.body.limit);
        let totalrecord = await newsLetter.find({}).count();

        res.status(200).json({
            status: "success",
            message: "News Letter Listed successfully",
            totalrecord:totalrecord,
            data: newsLetters
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
            // data: subscription
        });
    }
};

export {listNewsLetter};

const csvData = async function (req, res) {
    console.log('-=-Id=-=-=-=call-=->',req);
    try { 
        const newsLetters = await newsLetter.find({}).sort({_id:-1})
        res.status(200).json({
            status: "success",
            message: "News Letter Listed successfully",
            data: newsLetters
        });
    }
    catch (error) {
        res.status(400).json({
            status: "fail",
            message: error.message,
            // data: subscription
        });
    }
};
export {csvData};


