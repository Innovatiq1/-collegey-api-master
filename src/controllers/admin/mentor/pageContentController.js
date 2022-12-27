const bcrypt = require('bcryptjs');
const { ObjectId } = require('bson');

// Load Helper
import { getQueryParams } from '../../../utilities/helpers';
const request = require('request-promise');
const cheerio = require('cheerio');

import homePageModel from '../../../models/home-page-content/home-page-content';
import ProjectsFeesModel from '../../../models/projectFees';
import UserRewardModel from '../../../models/rewardspoint';
import RewardRedeemSettingModel from '../../../models/rewardRedeemSetting';

// Home Page Content

export async function new_HomepageContent(req, res, next) {

    const insObject = new homePageModel({
        home_intro_first_sec_title: "Collegey introduces you to the ecosystem that brings out the best in you.",
    });
    let insData = await insObject.save();

    res.status(200).json({
        status: 'Success',
        message: 'Successfully',
    });
}

export async function add_HomepageContent(req, res, next) {
    let postData = req.body;

    let DataPushCondition;
    if (postData.insertaction == 'collegy_partner_sec') {
        var homeContentThirdSec = [];
        var upObjThirdSec = {
            name: postData.title,
            status: postData.status,
        };
        homeContentThirdSec.push(upObjThirdSec);
        DataPushCondition = { $push: { "partnerships_come_together": { $each: homeContentThirdSec, $position: 0 } } };
    }
    else if (postData.insertaction == 'home_first_sec') {
        var homeContentFirstSec = [];
        var upObjFirstSec = {
            name: postData.title,
            status: postData.status,
            midleTitle: postData.midleTitle
        };
        homeContentFirstSec.push(upObjFirstSec);
        DataPushCondition = { $push: { "first_sec_ecosytem": { $each: homeContentFirstSec, $position: 0 } } };
    }
    else if (postData.insertaction == 'home_second_section') {
        var homeContentFirstSec = [];
        var upObjFirstSec = {
            mainTitle: postData.title,
            backgroundImg: postData.selectFile,
        };
        homeContentFirstSec.push(upObjFirstSec);
        DataPushCondition = { $push: { "home_second_section": { $each: homeContentFirstSec, $position: 0 } } };
    }
    else if (postData.insertaction == 'home_fourth_section') {
        var homeContentFirstSec = [];
        var upObjFirstSec = {
            title: postData.title,
            subtitle: postData.subtitle,
            imagePath: postData.selectFile,
            status: postData.status,
        };
        homeContentFirstSec.push(upObjFirstSec);
        DataPushCondition = { $push: { "home_fourth_section": { $each: homeContentFirstSec, $position: 0 } } };
    }
    else if (postData.insertaction == 'home_second_section_subTitle') {
        var homeContentFirstSec = [];
        var upObjFirstSec = {
            title: postData.title,
            description: postData.description,
            status: postData.status,
        };
        homeContentFirstSec.push(upObjFirstSec);
        DataPushCondition = { $push: { "home_second_section.0.sectionData": { $each: homeContentFirstSec, $position: 0 } } };
    }
    else if (postData.insertaction == 'home_fifth_section') {
        var button = [];
        button.push({
            text: postData.btnOneText,
            link: postData.btnOneLink
        }, {
            text: postData.btnTwoText,
            link: postData.btnTwoLink
        }, {
            text: postData.btnThreeText,
            link: postData.btnThreeLink
        });
        var homeContentFirstSec = [];
        var upObjFirstSec = {
            title: postData.title,
            bottomTitle: postData.bottomTitle,
            bottomButton: button
        };
        homeContentFirstSec.push(upObjFirstSec);
        DataPushCondition = { $push: { "home_fifth_section": { $each: homeContentFirstSec, $position: 0 } } };
    }
    else if (postData.insertaction == 'home_fifth_section_sectionData') {
        var homeContentFirstSec = [];
        var upObjFirstSec = {
            text: postData.text,
            sectionImg: postData.selectFile,
            status: postData.status,
        };
        homeContentFirstSec.push(upObjFirstSec);
        DataPushCondition = { $push: { "home_fifth_section.0.sectionData": { $each: homeContentFirstSec, $position: 0 } } };
    }
    else if (postData.insertaction == 'home_third_section') {
        var homeContentFirstSec = [];
        var upObjFirstSec = {
            mainTitle: postData.mainTitle,
            subTitle: postData.subTitle,
            bottomTitle: postData.bottomTitle,
            bottomButtonText: postData.bottomButtonText,
            bottomButtonLink: postData.bottomButtonLink,
        };
        homeContentFirstSec.push(upObjFirstSec);
        DataPushCondition = { $push: { "home_third_section": { $each: homeContentFirstSec, $position: 0 } } };
    }
    else if (postData.insertaction == 'home_third_section_videoData') {
        var homeContentFirstSec = [];
        var upObjFirstSec = {
            title: postData.title,
            videoLink: postData.videoLink,
            layerImg: postData.selectFile,
            status: postData.status,
        };
        homeContentFirstSec.push(upObjFirstSec);
        DataPushCondition = { $push: { "home_third_section.0.videoData": { $each: homeContentFirstSec, $position: 0 } } };
    }
    else if (postData.insertaction == 'home_section_02') {
        var homeContentSecondSec = [];
        var upObjSecondSec = {
            name: postData.title,
            description: postData.description,
            imagePath: postData.selectFile,
            status: postData.status,
        };
        homeContentSecondSec.push(upObjSecondSec);
        DataPushCondition = { $push: { "home_second_sec_data": { $each: homeContentSecondSec, $position: 0 } } };
    }
    else if (postData.insertaction == 'home_section_04') {
        var homeContentFourthSec = [];
        var upObjFourthSec = {
            name: postData.title,
            imagePath: postData.selectFile,
            status: postData.status,
        };
        homeContentFourthSec.push(upObjFourthSec);
        DataPushCondition = { $push: { "home_fourth_sec_data": { $each: homeContentFourthSec, $position: 0 } } };
    }
    else if(postData.insertaction == 'home_section_06')
    {
        var homeContentSixthSec = [];
        var upObjSixthSec = {
            name: postData.title,
            description: postData.description,
            imagePath: postData.selectFile,
            buttonText: postData.buttonText,
            buttonLink: postData.buttonLink,            
        };
        homeContentSixthSec.push(upObjSixthSec);
        DataPushCondition = { $push: { "home_sixth_sec_data": { $each: homeContentSixthSec, $position: 0 } } };
    }
    else if(postData.insertaction == 'home_bottom_slide_01')
    {
        var homeContentBottomFirst = [];
        var upObjBottomFirst = {
            name: postData.title,
            imagePath: postData.selectFile,
            status: postData.status,
        };
        homeContentBottomFirst.push(upObjBottomFirst);
        DataPushCondition = { $push: { "home_bottom_first_slide_data": { $each: homeContentBottomFirst, $position: 0 } } };
    }
    else if (postData.insertaction == 'home_first_section') {
        var homeContentBottomFirst = [];
        var upObjBottomFirst = {
            bannerText: postData.title,
            bannerSubText: postData.subTitle,
            bannerImg: postData.selectFile,
            status: postData.status,
            midleTitle: postData.midleTitle
        };
        homeContentBottomFirst.push(upObjBottomFirst);
        DataPushCondition = { $push: { "home_first_section": { $each: homeContentBottomFirst, $position: 0 } } };
    }
    else if (postData.insertaction == 'home_bottom_slide_02') {
        var homeContentBottomSecond = [];
        var upObjBottomSecond = {
            name: postData.title,
            imagePath: postData.selectFile,
            status: postData.status,
        };
        homeContentBottomSecond.push(upObjBottomSecond);
        DataPushCondition = { $push: { "home_bottom_second_slide_data": { $each: homeContentBottomSecond, $position: 0 } } };
    }
    else if (postData.insertaction == 'home_footer_section') {
        var homeContentFooter  = [];
        var upObjFooterContent = {
            address1: postData.address1,
            address1email: postData.address1email,
            address1phone: postData.address1phone,
            
            address2: postData.address2,
            address2email: postData.address2email,
            address2phone: postData.address2phone,
            copyright: postData.copyright,
            imagePath: postData.selectFile,
        };
        homeContentFooter.push(upObjFooterContent);
        DataPushCondition = { $push: { "home_footer_section": { $each: homeContentFooter, $position: 0 } } };
    }
    else if (postData.insertaction == 'program_content_section') {
        var programContentSection  = [];
        var upObjprogramContent = {
            title: postData.title,
            program_content: postData.program_content,
            button_text: postData.button_text,            
            button_link: postData.button_link,
            imagePath: postData.selectFile,
        };
        programContentSection.push(upObjprogramContent);
        DataPushCondition = { $push: { "program_content_section": { $each: programContentSection, $position: 0 } } };
    }
    try {
        let result = await homePageModel.findOneAndUpdate(
            { isDeleted: false },
            DataPushCondition
        );
        res.status(200).json({
            status: 'Success',
            message: 'add data successfully',
        });
    }
    catch (error) {
        console.log("error", error);
        next(error);
        res.status(400).json({
            status: 'error',
            message: 'Add data failed',
        });
    }
}

export async function updateHomepageContent(req, res, next) {
    let postData = req.body;
    const pageData = await homePageModel.findOne({ isDeleted: false });

    let DataPushCondition;
    if (postData.insertaction == 'collegy_partner_sec') {
        var SelectSection = pageData.partnerships_come_together;
        var sectionIndex = postData.dataindex;
        SelectSection[sectionIndex]['name'] = postData.title;
        SelectSection[sectionIndex]['status'] = postData.status;

        DataPushCondition = { "partnerships_come_together": SelectSection };
    }
    else if (postData.insertaction == 'home_first_sec') {
        var firstSection = pageData.first_sec_ecosytem;
        var sectionIndex = postData.dataindex;
        firstSection[sectionIndex]['name'] = postData.title;
        firstSection[sectionIndex]['status'] = postData.status;

        DataPushCondition = { "first_sec_ecosytem": firstSection };
    }
    else if (postData.insertaction == 'home_section_02') {
        var secondSection = pageData.home_second_sec_data;
        var sectionIndex = postData.dataindex;
        secondSection[sectionIndex]['name'] = postData.title;
        secondSection[sectionIndex]['description'] = postData.description;
        secondSection[sectionIndex]['imagePath'] = postData.selectFile;
        secondSection[sectionIndex]['status'] = postData.status;

        DataPushCondition = { "home_second_sec_data": secondSection };
    }
    else if (postData.insertaction == 'home_section_04') {
        var fourthSection = pageData.home_fourth_sec_data;
        var sectionIndex = postData.dataindex;
        fourthSection[sectionIndex]['name'] = postData.title;
        fourthSection[sectionIndex]['status'] = postData.status;
        fourthSection[sectionIndex]['imagePath'] = postData.selectFile;

        DataPushCondition = { "home_fourth_sec_data": fourthSection };
    }
    else if(postData.insertaction == 'home_section_06')
    {
        var sixthSection  = pageData.home_sixth_sec_data;
        var sectionIndex   = postData.dataindex;
        sixthSection[sectionIndex]['name']   = postData.title;
        sixthSection[sectionIndex]['description'] = postData.description;
        sixthSection[sectionIndex]['imagePath'] = postData.selectFile;
        sixthSection[sectionIndex]['buttonText'] = postData.buttonText;
        sixthSection[sectionIndex]['buttonLink'] = postData.buttonLink;
        
        DataPushCondition =  { "home_sixth_sec_data": sixthSection};
    }
    else if(postData.insertaction == 'home_bottom_slide_01')
    {
        var bottomSlide01  = pageData.home_bottom_first_slide_data;
        var sectionIndex   = postData.dataindex;
        bottomSlide01[sectionIndex]['name']   = postData.title;
        bottomSlide01[sectionIndex]['status'] = postData.status;
        bottomSlide01[sectionIndex]['imagePath'] = postData.selectFile;

        DataPushCondition = { "home_bottom_first_slide_data": bottomSlide01 };
    }
    else if (postData.insertaction == 'home_first_section') {
        var bottomSlide01 = pageData.home_first_section;
        var sectionIndex = postData.dataindex;
        bottomSlide01[sectionIndex]['bannerText'] = postData.title;
        bottomSlide01[sectionIndex]['bannerSubText'] = postData.subTitle;
        bottomSlide01[sectionIndex]['status'] = postData.status;
        bottomSlide01[sectionIndex]['bannerImg'] = postData.selectFile;
        bottomSlide01[sectionIndex]['midleTitle'] = postData.midleTitle;

        DataPushCondition = { "home_first_section": bottomSlide01 };
    }
    else if (postData.insertaction == 'home_fourth_section') {
        var bottomSlide01 = pageData.home_fourth_section;
        var sectionIndex = postData.dataindex;
        bottomSlide01[sectionIndex]['title'] = postData.title;
        bottomSlide01[sectionIndex]['subtitle'] = postData.subtitle;
        bottomSlide01[sectionIndex]['status'] = postData.status;
        bottomSlide01[sectionIndex]['imagePath'] = postData.selectFile;

        DataPushCondition = { "home_fourth_section": bottomSlide01 };
    }
    else if (postData.insertaction == 'home_fifth_section') {
        var button = [];
        button.push({
            text: postData.btnOneText,
            link: postData.btnOneLink
        }, {
            text: postData.btnTwoText,
            link: postData.btnTwoLink
        }, {
            text: postData.btnThreeText,
            link: postData.btnThreeLink
        });
        var bottomSlide01 = pageData.home_fifth_section;
        var sectionIndex = postData.dataindex;
        bottomSlide01[sectionIndex]['title'] = postData.title;
        bottomSlide01[sectionIndex]['bottomTitle'] = postData.bottomTitle;
        bottomSlide01[sectionIndex]['bottomButton'] = button;

        DataPushCondition = { "home_fifth_section": bottomSlide01 };
    }
    else if (postData.insertaction == 'home_fifth_section_sectionData') {
        var bottomSlide01 = pageData.home_fifth_section;
        var sectionIndex = postData.dataindex;
        bottomSlide01[0].sectionData[sectionIndex]['text'] = postData.text;
        bottomSlide01[0].sectionData[sectionIndex]['sectionImg'] = postData.selectFile;
        bottomSlide01[0].sectionData[sectionIndex]['status'] = postData.status;
        DataPushCondition = { home_fifth_section: bottomSlide01 };
    }
    else if (postData.insertaction == 'home_third_section_videoData') {
        var bottomSlide01 = pageData.home_third_section;
        var sectionIndex = postData.dataindex;
        bottomSlide01[0].videoData[sectionIndex]['title'] = postData.title;
        bottomSlide01[0].videoData[sectionIndex]['videoLink'] = postData.videoLink;
        bottomSlide01[0].videoData[sectionIndex]['layerImg'] = postData.selectFile;
        bottomSlide01[0].videoData[sectionIndex]['status'] = postData.status;
        DataPushCondition = { home_third_section: bottomSlide01 };
    }
    else if (postData.insertaction == 'home_second_section') {
        var bottomSlide01 = pageData.home_second_section;
        var sectionIndex = postData.dataindex;
        bottomSlide01[sectionIndex]['mainTitle'] = postData.title;
        bottomSlide01[sectionIndex]['backgroundImg'] = postData.selectFile;
        DataPushCondition = { "home_second_section": bottomSlide01 };
    }
    else if (postData.insertaction == 'home_second_section_subTitle') {
        var bottomSlide01 = pageData.home_second_section;
        var sectionIndex = postData.dataindex;
        bottomSlide01[0].sectionData[sectionIndex]['title'] = postData.title;
        bottomSlide01[0].sectionData[sectionIndex]['description'] = postData.description;
        bottomSlide01[0].sectionData[sectionIndex]['status'] = postData.status;
        DataPushCondition = { home_second_section: bottomSlide01 };
    }
    else if (postData.insertaction == 'home_third_section') {
        var bottomSlide01 = pageData.home_third_section;
        var sectionIndex = postData.dataindex;
        bottomSlide01[sectionIndex]['mainTitle'] = postData.mainTitle;
        bottomSlide01[sectionIndex]['subTitle'] = postData.subTitle;
        bottomSlide01[sectionIndex]['bottomTitle'] = postData.bottomTitle;
        bottomSlide01[sectionIndex]['bottomButtonText'] = postData.bottomButtonText;
        bottomSlide01[sectionIndex]['bottomButtonLink'] = postData.bottomButtonLink;
        DataPushCondition = { "home_third_section": bottomSlide01 };
    }
    else if (postData.insertaction == 'home_third_section_videoData') {
        var bottomSlide01 = pageData.home_third_section;
        var sectionIndex = postData.dataindex;
        bottomSlide01[0].videoData[sectionIndex]['title'] = postData.title;
        bottomSlide01[0].videoData[sectionIndex]['videoLink'] = postData.videoLink;
        bottomSlide01[0].videoData[sectionIndex]['layerImg'] = postData.selectFile;
        bottomSlide01[0].videoData[sectionIndex]['status'] = postData.status;
        DataPushCondition = { home_third_section: bottomSlide01 };
    }
    else if (postData.insertaction == 'home_bottom_slide_02') {
        var bottomSlide02 = pageData.home_bottom_second_slide_data;
        var sectionIndex = postData.dataindex;
        bottomSlide02[sectionIndex]['name'] = postData.title;
        bottomSlide02[sectionIndex]['status'] = postData.status;
        bottomSlide02[sectionIndex]['imagePath'] = postData.selectFile;

        DataPushCondition = { "home_bottom_second_slide_data": bottomSlide02 };
    }
    else if (postData.insertaction == 'home_footer_section') {

        var footerContent = pageData.home_footer_section;
        var sectionIndex = postData.dataindex;
        footerContent[sectionIndex]['address1'] = postData.address1;
        footerContent[sectionIndex]['address1email'] = postData.address1email;
        footerContent[sectionIndex]['address1phone'] = postData.address1phone;

        footerContent[sectionIndex]['address2'] = postData.address2;
        footerContent[sectionIndex]['address2email'] = postData.address2email;
        footerContent[sectionIndex]['address2phone'] = postData.address2phone;

        footerContent[sectionIndex]['copyright'] = postData.copyright;
        footerContent[sectionIndex]['imagePath'] = postData.selectFile;

        DataPushCondition = { "home_footer_section": footerContent };
    }
    else if (postData.insertaction == 'program_content_section') {
        var programContentData = pageData.program_content_section;
        
        var sectionIndex = postData.dataindex;
        programContentData[sectionIndex]['title'] = postData.title;
        programContentData[sectionIndex]['program_content'] = postData.program_content;
        programContentData[sectionIndex]['button_text'] = postData.button_text;
        programContentData[sectionIndex]['button_link'] = postData.button_link;
        programContentData[sectionIndex]['imagePath'] = postData.selectFile;
        DataPushCondition = { "program_content_section": programContentData };
    }

    try {
        let result = await homePageModel.findOneAndUpdate(
            { isDeleted: false },
            DataPushCondition
        );
        res.status(200).json({
            status: 'Success',
            message: 'update Successfully',
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'update faild',
        });
    }

}

export async function fetchProjectFeesData(req, res, next) {
    try {
        let status = null;
        const params = getQueryParams(req.query, status);
	    const feesData = await ProjectsFeesModel.paginate({}, { page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({
            status: "success",
            message: "data retrieved successfully",
            data: feesData
        });
    } catch (error) {
        next(error);
        res.status(400).json({
            status: 'error',
            message: 'data fetch failed',
        });
    }
}

export async function fetchUserRewards(req, res, next) {
    try {
        let status = null;
        let userID = req.params.id;
        const params = getQueryParams(req.query, status);
	    const feesData = await UserRewardModel.paginate({ $and: [{ user_id: ObjectId(userID) }]}, { page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({
            status: "success",
            message: "data retrieved successfully",
            data: feesData
        });
    } catch (error) {
        next(error);
        res.status(400).json({
            status: 'error',
            message: 'data fetch failed',
        });
    }
}

export async function fetchRewardRedeemSetting(req, res, next) {
    try {
        let status = null;
        const params = getQueryParams(req.query, status);
	    const feesData = await RewardRedeemSettingModel.paginate({}, { page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({
            status: "success",
            message: "data retrieved successfully",
            data: feesData
        });
    } catch (error) {
        next(error);
        res.status(400).json({
            status: 'error',
            message: 'data fetch failed',
        });
    }
}

export async function addRedeemSettingData(req, res, next) {
	let postData = req.body;

	const linsData = new RewardRedeemSettingModel({
		redeemed_allow: postData.redeemed_allow,
        redeemed_value:  postData.redeemed_value,
	});

	try
    {     
        await linsData.save();
        res.status(200).json({
			status: 'Success',
			message: 'Add setting successfully',
		});
    }
    catch(error)
    {
        next(error);
		res.status(400).json({
			status: 'error',
			message: 'Add setting failed',
		});
    } 
}

export async function updateRedeemSettingData(req, res, next) {
	let postData = req.body;
	try {
		let linsData = {
			redeemed_allow: postData.redeemed_allow, 
            redeemed_value:  postData.redeemed_value,
		};
        let result = await RewardRedeemSettingModel.findOneAndUpdate(
            {_id: req.query.id},
            linsData
        );
        res.status(200).json({
            status: 'Success',
            message: 'update Successfully',
        });
    }
    catch (error) {
        res.status(400).json({
            status: 'error',
            message: 'update faild',
        });
    }
}

export async function fetchSingleProjectFeesData(req, res, next) {
    try {
        let postData = req.body;
        const feesData = await ProjectsFeesModel.findOne({fees_type:postData.fees_type});
        res.status(200).json({
            status: "success",
            message: "data retrieved successfully",
            data: feesData
        });
    } catch (error) {
        next(error);
        res.status(400).json({
            status: 'error',
            message: 'data fetch failed',
        });
    }
}

export async function fetchSingleRewardRedeemedSettingData(req, res, next) {
    try {
        let postData = req.body;
        const Data = await RewardRedeemSettingModel.find();
        res.status(200).json({
            status: "success",
            message: "data retrieved successfully",
            data: Data[0]
        });
    } catch (error) {
        next(error);
        res.status(400).json({
            status: 'error',
            message: 'data fetch failed',
        });
    }
}

export async function getHomeFirstSecData(req, res, next) {
    try {
        let status = null;
        const params = getQueryParams(req.query, status);
        const resourceData = await homePageModel.paginate({}, { page: params.page, limit: params.limit, sort: params.sortBy });
        res.status(200).json({
            status: "success",
            message: "data retrieved successfully",
            data: resourceData
        });
    } catch (error) {
        next(error);
        res.status(400).json({
            status: 'error',
            message: 'data fetch failed',
        });
    }
}

export async function deleteHomeContents(req, res, next) {
    try {

        const filedName = req.body.filedName;
        const resourceData = await homePageModel.find();

        if (filedName == "first_sec_ecosytem") {
            const newArray = resourceData[0].first_sec_ecosytem;
            newArray.splice(req.body.index, 1);
            const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "first_sec_ecosytem": newArray } });
        }
        else if (filedName == "home_second_sec_data") {
            const newArray = resourceData[0].home_second_sec_data;
            newArray.splice(req.body.index, 1);
            const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "home_second_sec_data": newArray } });
        }
        else if (filedName == "partnerships_come_together") {
            const newArray = resourceData[0].partnerships_come_together;
            newArray.splice(req.body.index, 1);
            const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "partnerships_come_together": newArray } });
        }
        else if (filedName == "home_fourth_sec_data") {
            const newArray = resourceData[0].home_fourth_sec_data;
            newArray.splice(req.body.index, 1);
            const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "home_fourth_sec_data": newArray } });
        }
        else if (filedName == "home_sixth_sec_data") {
            const newArray = resourceData[0].home_sixth_sec_data;
            newArray.splice(req.body.index, 1);
            const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "home_sixth_sec_data": newArray } });
        }
        else if (filedName == "home_bottom_first_slide_data") {
            const newArray = resourceData[0].home_bottom_first_slide_data;
            newArray.splice(req.body.index, 1);
            const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "home_bottom_first_slide_data": newArray } });
        }
        else if (filedName == "home_first_section") {
            const newArray = resourceData[0].home_first_section;
            newArray.splice(req.body.index, 1);
            const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "home_first_section": newArray } });
        }
        else if (filedName == "home_fourth_section") {
            const newArray = resourceData[0].home_fourth_section;
            newArray.splice(req.body.index, 1);
            const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "home_fourth_section": newArray } });
        }
        else if (filedName == "home_bottom_second_slide_data") {
            const newArray = resourceData[0].home_bottom_second_slide_data;
            newArray.splice(req.body.index, 1);
            const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "home_bottom_second_slide_data": newArray } });
        }
        else if (filedName == "home_second_section") {
            if (req.body.type === 'mainTitle') {
                const newArray = resourceData[0].home_second_section;
                newArray.splice(req.body.index, 1);
                const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "home_second_section": newArray } });
            } else {
                const newArray = resourceData[0].home_second_section;
                newArray[0].sectionData.splice(req.body.index, 1);
                const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "home_second_section": newArray } });

            }
        }
        else if (filedName == "home_third_section") {
            console.log(req.body);
            if (req.body.type === 'mainTitle') {
                const newArray = resourceData[0].home_third_section;
                newArray.splice(req.body.index, 1);
                const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "home_third_section": newArray } });
            } else {
                const newArray = resourceData[0].home_third_section;
                newArray[0].videoData.splice(req.body.index, 1);
                const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "home_third_section": newArray } });

            }
        }
        else if (filedName == "home_fifth_section") {
            if (req.body.type === 'mainTitle') {
                const newArray = resourceData[0].home_fifth_section;
                newArray.splice(req.body.index, 1);
                const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "home_fifth_section": newArray } });
            } else {
                const newArray = resourceData[0].home_fifth_section;
                newArray[0].sectionData.splice(req.body.index, 1);
                const resourceDataUpdate = await homePageModel.findOneAndUpdate({}, { $set: { "home_fifth_section": newArray } });

            }
        }

        res.status(200).json({
            status: "success",
            message: "Data deleted successfully",
            data: "resourceDataUpdate"
        });
    } catch (error) {
        next(error);
        res.status(400).json({
            status: 'error',
            message: 'data delete failed',
        });
    }
}