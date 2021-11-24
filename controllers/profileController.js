const Users = require('../models/userModel')

const updatePhoto = async (req,res)=>{
    try {
        const email = req.body.email
        const profile = await Users.findOneAndUpdate(
          {email},
          {$set:{photo:req.file.path}},
          {returnDocument: "after"},)
        res.status(200).json(profile.photo)
    }
    catch (e){
        res.status(400).json(e)
    }
}

const deletePhoto = async (req,res)=>{
    try {
        const email = req.query.email
        await Users.findOneAndUpdate({email}, {$set:{photo:''}})
        res.status(200).json({message:'success'})
    }
    catch (e){
        res.status(400).json(e)
    }
}

const updateProfile = async (req,res)=>{
    try {
        const body = req.body
        const profile = await Users.findOneAndUpdate(
          {email:body.email},
          {$set:body},
          {returnDocument: "after"})
        res.status(200).json(profile)
    }
    catch (e){
        res.status(400).json(e)
    }
}

module.exports = {updatePhoto, deletePhoto, updateProfile}