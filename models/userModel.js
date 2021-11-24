const {Schema, model} = require('mongoose')

const userScheme = new Schema({
	firstName: {type:String, required:true},
	lastName: {type:String, required:true},
	email: {type:String, unique:true, required:true},
	password:  {type:String, required:true},
	description: {type:String},
	photo:{type:String}
},{versionKey:false});

module.exports = model('User', userScheme)