const Announcement = require('../../models/announcement');

exports.getAllAnnouncements = async(req, res) => {

    try {
        const postData = req.body;
        let where;
        
        if (postData.forWhom == 'Mentors') {
            if (postData.type == 'Project') {
                where = {
                    forMentors : true,
                    announcementType: 'project',
                    isActive: true
                }
            }
            if (postData.type == 'Feed') {
                where = {
                    forMentors : true,
                    announcementType: 'feed',
                    isActive: true
                }
            }
            
        }
    
        if (postData.forWhom == 'Students') {
            if (postData.type == 'Project') {
                where = {
                    forStudents : true,
                    announcementType: 'project',
                    isActive: true
                }
            }
            if (postData.type == 'Feed') {
                where = {
                    forStudents : true,
                    announcementType: 'feed',
                    isActive: true
                }
            }
    
        }
    
        const announcementList = await Announcement.find(where);
    
        res.status(200).json({
            status: 'success',
            message: 'Got All Announcements successfully.',
            data: announcementList,
        });
    } catch (error) {
        next(e);
    }
        
    }