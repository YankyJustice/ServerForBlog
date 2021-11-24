const {Schema, model, Types} = require('mongoose')

const articlesScheme = new Schema({
	user:{type:Types.ObjectId, ref:'User', required:true},
	id:{type:Number, required:true, unique:true},
	title: {type:String, required:true},
	category:  {type:String, required:true},
	image:{type:String, required:true},
	date:{type:String,required:true},
	text: {type:Object, required:true},
	views: {type:Number, required:true}
},{versionKey:false});

module.exports = model('Articles', articlesScheme)