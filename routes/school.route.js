import express from 'express'

const schoolRouter = express.Router()

schoolRouter.post('/add-school',addSchoolController)
schoolRouter.post('/edit-school',editSchoolController)
schoolRouter.post('/delete-school',deleteSchoolController)
schoolRouter.get('/list-all-schools',listAllSchoolsController)


export default schoolRouter