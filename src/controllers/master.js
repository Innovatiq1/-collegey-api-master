// userController.js
import {masterServices} from '../services/masterServices';

module.exports.getCountries = async function (req, res) {    
    await masterServices.getCountries().then(data => {
        res.status(200).json({
            status: "success",
            message: "Country List",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while geting records."
        });
    });
}

module.exports.getTimezones = async function (req, res) {    
    await masterServices.getTimezones().then(data => {
        res.status(200).json({
            status: "success",
            message: "Timezone List",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while geting records."
        });
    });
}

module.exports.getStateByCountry = async function (req, res) {    
    await masterServices.getStates({country_id:req.params.country_id}).then(data => {
        res.status(200).json({
            status: "success",
            message: "State List",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while geting records."
        });
    });
}

module.exports.getAllStates = async function (req, res) {    
    await masterServices.getStates({_id: { $ne: null } }).then(data => {
        res.status(200).json({
            status: "success",
            message: "State List",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while geting records."
        });
    });
}
module.exports.getCityByState = async function (req, res) {
    await masterServices.getCities({state_id:req.params.state_id}).then(data => {
        res.status(200).json({
            status: "success",
            message: "City List",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while geting records."
        });
    });
}
module.exports.getCities = async function (req, res) {
    await masterServices.getCities({id:req.params.state_id}).then(data => {
        res.status(200).json({
            status: "success",
            message: "City List",
            data: data
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while geting records."
        });
    });
}
module.exports.addMasterData = async function (req, res) {    
    await masterServices.addMasterData().then(data => {
        res.status(200).json({
            status: "success",
            message: data,           
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while Adding records."
        });
    });
}
module.exports.getStaticList = async function (req, res) {      
    await masterServices.getStaticListData().then(data => {
        res.status(200).json({
            status: "success",
            message: "Static data listing",
            data: data,           
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while Adding records."
        });
    });
}
