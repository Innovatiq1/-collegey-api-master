const mentor = require('../models/mentor');
const user = require('../models/User');
const university = require('../models/university/university');
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
exports.universityInfo = async (res) => {
    let where={}
    console.log("==",res)
    if(res != '' || res != null)
    
    { 
        console.log("=====test=====")
        let regex = new RegExp(res, "i");
		where["name"] = regex;
    
  let listUniversity = await university.find(where).sort({ "createdAt": -1 });
    return{
        message: 'University Fetched Success',
        response: listUniversity
    };
    }else {
        
        let listUniversity = await university.find().sort({ "createdAt": -1 });
        return{
        message: 'University Fetched Success',
        response: listUniversity
    };

    }
    
    
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
