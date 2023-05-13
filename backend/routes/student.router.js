const Router = require('express')
const studentController = require('../controller/student.controller.js')

const router = new Router()
router.post('/student', studentController.createStudent)
router.get('/student', studentController.getStudents)
router.get('/student/:id', studentController.getOneStudent)
router.put('/student', studentController.updateStudent)
router.delete('/student/:id', studentController.deleteStudent)

module.exports = router