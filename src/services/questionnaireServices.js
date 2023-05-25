import Questionnaire from '../models/Questionnaire';
import { studentsQuestionDefaultStatus, studentsQuestionDefaultStatusNew } from "../utilities/constants";

exports.questionnairePostServices = {
    async updateQuestionnaire(requestData, userId) {
        try{
            if(userId){
                return await Questionnaire.findOneAndUpdate({student: userId}, requestData, { new: true, upsert: true });
            }else{
                _throwException('user not found');
            }
        }catch(e){
            throw e
        }
    },
};

exports.questionnaireGetServices = {
    async getByStudent(student_Id) {
        const selectQuery = 'ted_talk teaching_skill learning_skill impact interview_media_house work_title city_country -_id id';
        const questions = await Questionnaire.findOne({student:student_Id}).select(selectQuery);
        if(questions){
            // return Object.assign(studentsQuestionDefaultStatusNew, questions.toJSON());
            const ted_talk = (questions.ted_talk) ? questions.ted_talk : false;
            const teaching_skill = (questions.teaching_skill) ? questions.teaching_skill : false;
            const learning_skill = (questions.learning_skill) ? questions.learning_skill : false;
            const impact = (questions.impact) ? questions.impact : false;
            const interview_media_house = (questions.interview_media_house) ? questions.interview_media_house : false;
            const work_title = (questions.work_title) ? questions.work_title : false;
            const city_country = (questions.city_country) ? questions.city_country : false;

            return {
                ted_talk,
                teaching_skill,
                learning_skill,
                impact,
                interview_media_house,
                work_title,
                city_country
            };
        }else{
            return studentsQuestionDefaultStatus;
        }
    },
};