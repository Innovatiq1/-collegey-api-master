const mentor = require('../models/mentor');
const user = require('../models/User');
const universities = require('../models/highSchools/universityModel')

exports.info = async (res) => {
    let listMentor = await mentor.find({});
    return{
        message: 'Mentors Fetched Success',
        response: listMentor
    };
}
exports.userInfo = async (res) => {
    let where = {type:'mentor'};
    if(res != '' || res != null)
    { 
        let regex = new RegExp(res, "i");
		where["name"] = regex;
    }
    let listMentor = await user.find(where);
    return{
        message: 'Mentors Fetched Success',
        response: listMentor
    };
}

exports.createMentorService = async (data) => {
    let mentors = await mentor.create(data);
    return{
        message: 'Mentors Added',
        response: mentors
    };
}

exports.getUnive = async (res) => {
    let listMentor = await universities.find({});
    return{
        message: 'Universities Fetched Success',
        response: listMentor
    };
}


exports.addUnive = async (data) => {
    let mentors = await universities.create(data);
    return{
        message: 'University Added',
        response: mentors
    };
}
