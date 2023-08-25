const router = require('express').Router();
var projectController = require('../../controllers/admin/projectsController');
const studentProjectIdeaController = require('../../controllers/admin/studentProjectIdeaController');
import { validateProject } from '../../middleware/validators/userValidations';
router.route('/')
    .get(projectController.index)
    .post(projectController.new)

router.route('/studentnewproject').get(projectController.getStudentProject);
router.route('/usernotification').get(projectController.getUserNotification);
router.route('/unreadnotificationCount').get(projectController.getUnReadNotificationCount);
router.route('/notificationstatusUpdate/:id').get(projectController.notificationUpdate);
router.route('/mentornewproject').get(projectController.getMentorProject); 
router.route('/getProjectPaymentData').post(projectController.getProjectPaymentData);

router.route('/studentprojectActivation').post(projectController.UpdateStudentProjectStatus);
router.route('/mentorprojectActivation').post(projectController.UpdateMentorProjectStatus);

router.route('/:id')
    .get(projectController.view)
    .put(projectController.edit)
    .delete(projectController.delete);


            
router.route('/student-project-idea/list')
    .get(studentProjectIdeaController.getAll);

router.post('/addProjectFeesData',projectController.add_ProjectFeesData);
router.post('/updateProjectFeesData',projectController.updateProjectFeesData);

module.exports = router;