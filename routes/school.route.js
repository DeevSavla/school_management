import express from 'express'
import {
    addSchoolController,
    editSchoolController,
    deleteSchoolController,
    listAllSchoolsController
} from '../controllers/school.controller.js'

const schoolRouter = express.Router()

schoolRouter.post('/add-school',addSchoolController)
schoolRouter.post('/edit-school',editSchoolController)
schoolRouter.post('/delete-school',deleteSchoolController)
schoolRouter.get('/list-all-schools',listAllSchoolsController)


export default schoolRouter