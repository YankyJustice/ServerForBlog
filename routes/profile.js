const Router = require('express')
const {updatePhoto, deletePhoto, updateProfile} = require("../controllers/profileController");

const profileRouter = Router()
module.exports = profileRouter


profileRouter.put('/photo', updatePhoto)

profileRouter.delete('/photo', deletePhoto)

profileRouter.put('/update', updateProfile)



