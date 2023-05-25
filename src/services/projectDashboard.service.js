import UserProjects from '../models/userProjects';
import Users from '../models/User';
import Projects from '../models/Projects';
import Chat from '../models/chats';
import ProgramChat from '../models/programchats';
import Comments from '../models/commentUniversal';
import CollegeyFeed from '../models/CollegeyUniversalFeed';
import ProjectFile from '../models/projectFile';
import ProgramFile from '../models/programFile';
// import UserProjectsWatchlist from '../models//userProjectWatchlist';
import { getQueryParams } from '../utilities/helpers';
import { statusTypes } from '../utilities/constant_variables';
import mongoose from 'mongoose';
import User from '../models/User';
import InviteesProject  from '../models/Invitees-project';
import InviteesProgram  from '../models/Invitees-program';
import studentInterests  from '../models/studentInterests';
import studentSubject  from '../models/studentSubject';
import projectOutcomes from '../models/projectOutcome';
const { ObjectId } = require('bson');

exports.projectDashboardGetServices = {
    async getProjectsUserInvitee(user_id) {
        let where = {email:user_id}
        //const populateQuery = [{ path: 'project', populate: { path: 'partner' } }];
	    let projects = await Users.find(where);
		const docs = projects;
		projects = docs;
		return projects;
	},
    
    async getProjectsByInterets(postData) {
        //let where = {email:user_id}
        //const populateQuery = [{ path: 'project', populate: { path: 'partner' } }];
	    let projects = await studentInterests.create(postData);
		const docs = projects;
		projects = docs;
		return projects;
	},
    async postProjectsBySubject(postData) {
        //let where = {email:user_id}
        //const populateQuery = [{ path: 'project', populate: { path: 'partner' } }];
	    let projects = await studentSubject.create(postData);
		const docs = projects;
		projects = docs;
		return projects;
	},
    async postProjectOutcomes(postData) {
        //let where = {email:user_id}
        //const populateQuery = [{ path: 'project', populate: { path: 'partner' } }];
	    let outcomes = await projectOutcomes.create(postData);
		const docs = outcomes;
		outcomes = docs;
		return outcomes;
	},
    async getProjectsByInvitee(user_id,project_id) {
        let where = {email:user_id, projectID: new mongoose.Types.ObjectId(project_id)}
        //const populateQuery = [{ path: 'project', populate: { path: 'partner' } }];
	    let projects = await InviteesProject.find({email:user_id, projectID: mongoose.Types.ObjectId(project_id)})

		const docs = projects;
		projects = docs;
		return projects;
	},
    async getProgramsByInvitee(user_id,programid) {
        let where = {email:user_id, programID: new mongoose.Types.ObjectId(programid)}
        //const populateQuery = [{ path: 'project', populate: { path: 'partner' } }];
	    let programs = await InviteesProgram.find({email:user_id, programID: mongoose.Types.ObjectId(programid)})

		const docs = programs;
		programs = docs;
		return programs;
	},
    async postInviteData(postInviteData, userId) {
        //let userID = parseInt(userId)
        let postData ={
			email:postInviteData.email,
			projectID: postInviteData.projectID,
			requestedForName: postInviteData.requestedForName,
            requestedForUserId: userId 		}
            
        //let where = {email:"gopi4478528@gmail.com",projectID:"12345678",}
        //const populateQuery = [{ path: 'project', populate: { path: 'partner' } }];
	    let projects  = await InviteesProject.create(postData);
        //consoe
		const docs = projects;
		projects = docs;
		return projects;
	},
    async postInviteProgramData(postInviteData, userId) {
        console.log("===postInviteData==",postInviteData)
        //let userID = parseInt(userId)
        let postData ={
			email:postInviteData.email,
			programID: postInviteData.programId,
			requestedForName: postInviteData.requestedForName,
            requestedForUserId: userId 		}
            
        //let where = {email:"gopi4478528@gmail.com",projectID:"12345678",}
        //const populateQuery = [{ path: 'project', populate: { path: 'partner' } }];
	    let programs  = await InviteesProgram.create(postData);
        //consoe
		const docs = programs;
		programs = docs;
		return programs;
	},
    async postInviteDataNewUser(postInviteData) {
        //let userID = parseInt(userId)
        let postData ={
			email:postInviteData.email,
			projectID: postInviteData.projectID,
			requestedForName: postInviteData.requestedForName,
		}
        //let where = {email:"gopi4478528@gmail.com",projectID:"12345678",}
        //const populateQuery = [{ path: 'project', populate: { path: 'partner' } }];
	    let projects  = await InviteesProject.create(postData);
        //consoe
		const docs = projects;
		projects = docs;
		return projects;
	},

    async getProjectsByStudent(user_id) {
        const populateQuery = [{ path: 'project', populate: { path: 'partner' } }];
	    let projects        = await UserProjects.find(
			{ user_id: user_id, status: statusTypes.ACTIVE },
			'project_id',
			{ populate: populateQuery }
		);
		const docs = projects;
		projects = docs;
		return projects;
	},

    async getAllPendingProjectByStudent(user_id) {
        const populateQuery = [{path:'mentor'},{path:'projectOwner'}];
		return await Projects.find({
			$or:[{projectOwner: user_id},{mentor:user_id}],
			projectStatus:'new'
		}).populate(populateQuery)
	}, 

    async getProjectDetails(project_id) {
        const projectPopulateQuery = [{path:'mentor'},{path:'projectOwner'},{path:'projectMembers'},{path:'partner'}];
        //let projectDetail = await Projects.findById(new mongoose.Types.ObjectId(project_id));
        let projectDetail   = await Projects.findById(new mongoose.Types.ObjectId(project_id)).populate({
              path: "projectPost",
              populate: {
                path: "postBy",
                model: "User",
              },
              options: { sort: { '_id': -1 } }
          }).populate("projectEvent.eventGuest");
          
          //console.log("Project Detail",projectDetail,new mongoose.Types.ObjectId(project_id));

        let projectChat = await Chat.find({
            project:project_id
        });
        let projectFiles  = await ProjectFile.find({project:project_id}).sort( { createdAt : -1} );
        let projectFeeds  = await CollegeyFeed.find({project:project_id}).sort( { createdAt : -1} );
        
	    let projectsPaymentList  = await UserProjects.find({'project_id': new mongoose.Types.ObjectId(project_id)}).populate('user_id');

        let projectSchedule ;
        return {projectDetail,projectChat,projectFeeds,projectFiles,projectSchedule,projectsPaymentList};
    },
    
    async getProject(project_id) {
        let cid   = ObjectId(project_id);
        let projectDetail   = await Projects.find({_id:cid})
          
          //console.log("Project Detail",projectDetail,new mongoose.Types.ObjectId(project_id));

      
        return projectDetail;
    },

    async getProjectChats(project_id) {
        let chats = await Chat.find({project:project_id}).sort( { createdAt : -1} );
        return chats;
    },
    async getProgramChats(project_id) {
        let chats = await ProgramChat.find({program:project_id}).sort( { createdAt : -1} );
        return chats;
    },

    async getProjectFiles(project_id) {
        let files = await ProjectFile.find({project:project_id}).sort( { createdAt : -1} );
        return files;
    },
    async getProgramFiles(program_id) {
        let files = await ProgramFile.find({program:program_id}).sort( { createdAt : -1} );
        return files;
    },

    async getProjectFeeds(project_id) {
        let feeds = await CollegeyFeed.find({project:project_id}).sort( { createdAt : -1} );
        return feeds;
    },
    
    async getUserListForComment() {
        let users = await Users.find({}).select('_id','name','last_name','email');
        return users;
    }
}

exports.projectDashboardPostServices = {

    async postProjectChat(data) {
        let chatData = await Chat.create(data);
       // console.log("Posting Chat",chatData,data)
        return chatData;
    },
    async postProgramChat(data) {
        let chatData = await ProgramChat.create(data);
       // console.log("Posting Chat",chatData,data)
        return chatData;
    },

    async postProjectFile(data) {
        let fileData = await ProjectFile.create(data);
        return fileData;
    },


    async postProgramFile(data) {
        let fileData = await ProgramFile.create(data);
        return fileData;
    },

    async deleteProjectFile(data) {
        
         data = {
            "_id": data._id,
            "project": data.project,
            "user": data.user,
          }
            const delFile = ProjectFile.deleteOne(data)
            return delFile;
    },

    async deleteProgramFile(data) {
        
        data = {
           "_id": data._id,
           "program": data.program,
           "user": data.user,
         }
           const delFile = ProgramFile.deleteOne(data)
           console.log("======",delFile)
           return delFile;
   },


    async postProjectChatFile(data) {
        let chatData = await Chat.create(data);
        return chatData;
    }
}
