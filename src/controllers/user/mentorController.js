const mentorService = require('../../services/mentorServices');

exports.getMentors = async (req, res) => {
    try {
        let r = await mentorService.info();
        res.status(200).send(r);
    } catch (err) {
        console.log("Error is : " + err);
        res.status(400).send(err);
    }
};
exports.getUser = async (req, res) => {
    try {
        let filterValue = req.query.filterName;
        let r = await mentorService.userInfo(filterValue);
        res.status(200).send(r);
    } catch (err) {
        console.log("Error is : " + err);
        res.status(400).send(err);
    }
};
exports.getUniversity = async (req, res) => {
    try {
        let filterValue = req.query.filterName;
        console.log("===filterValue==",filterValue)
        let r = await mentorService.universityInfo(filterValue);
        res.status(200).send(r);
    } catch (err) {
        console.log("Error is : " + err);
        res.status(400).send(err);
    }
};


exports.addMentor = async (req, res) => {
    try {
        let r = await mentorService.createMentorService(req.body);
        res.status(200).send(r);
    } catch (err) {
       // console.log("Error is : " + err);
        res.status(400).send(err);
    }
};

exports.getUniv = async (req, res) => {
    try {
        let r = await mentorService.getUnive();
        res.status(200).send(r);
    } catch (err) {
       // console.log("Error is : " + err);
        res.status(400).send(err);
    }
};

exports.addUniv = async (req, res) => {
    try {
        let r = await mentorService.addUnive(req.body);
        res.status(200).send(r);
    } catch (err) {
       // console.log("Error is : " + err);
        res.status(400).send(err);
    }
};