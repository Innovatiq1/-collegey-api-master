const router = require('express').Router();
var userProjectController = require('../../controllers/admin/userProjectsController');
import { userProjectMappingValidation } from '../../middleware/validators/userValidations';

router.route('/')
        .post(userProjectMappingValidation,userProjectController.mapUserProject)
        .get(userProjectController.mappedProjects)  
        .delete(userProjectMappingValidation,userProjectController.removeUser)      

router.route('/students-in-project/:project_id')
        .get(userProjectController.studentsByProject)      

router.route('/projects-by-user/:user_id')
        .get(userProjectController.projectsByUser)

module.exports = router;