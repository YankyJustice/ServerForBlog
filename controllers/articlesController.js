const Users = require('../models/userModel')
const Articles = require('../models/articlesModel')

const allArticles = async (req, res)=>{
	try {
			const page = req.query.page
			const dataFromDB = await Articles.find().populate('user')
			const countArticles = await Articles.find().count()
			const articles = dataFromDB.sort((a,b)=>b.views-a.views).map(article=>{
				return{
					user:{
						firstName: article.user.firstName,
						lastName: article.user.lastName,
						photo:article.user.photo
					},
					id:article.id,
					title:article.title,
					category:article.category,
					image:article.image,
					date:article.date,
					text:article.text,
					views:article.views
				}
			}).slice((page-1)*6,page*6)
				res.status(200).json({items:articles, countArticles})

	}
	catch(e) {
		res.status(400).json(e)
	}
}

const addView = async (req, res)=>{
	try {
		const id = req.body
		const article = await Articles.findOne(id)
		await Articles.findOneAndUpdate(id, {$set:{views:article.views+1}})
		res.status(204)
	}
	catch (e){
		res.status(400).json(e)
	}
}

const myArticles = async (req, res)=>{
	try {
		const page = req.query.page
		const email = req.query.email
		const user = await Users.findOne({email})
		const dataFromDB = await Articles.find({user:user._id}).populate('user')
		const countArticles = await Articles.find({user:user._id}).count()
		console.log(countArticles)
		const articles = dataFromDB.reverse().map(article=>{
			return{
				user:{
					firstName: article.user.firstName,
					lastName: article.user.lastName,
					photo:article.user.photo
				},
				id:article.id,
				title:article.title,
				category:article.category,
				image:article.image,
				date:article.date,
				text:article.text,
				views:article.views
			}
		}).slice((page-1)*6,page*6)
		res.status(200).json({items:articles, countArticles})

	}
	catch(e) {
		res.status(400).json(e)
	}
}

const article = async (req,res)=>{
	try {
		const id = req.query
		const dataFromDB = await Articles.find(id).populate('user')
			const article = dataFromDB.map(article=>{
				return{
					user:{
						firstName: article.user.firstName,
						lastName: article.user.lastName,
						photo:article.user.photo
					},
					id:article.id,
					title:article.title,
					category:article.category,
					image:article.image,
					date:article.date,
					text:article.text,
					views:article.views
				}
			})
		res.status(200).json(article[0])

	}
	catch (e){
		res.status(400).json(e)
	}
}

const popularArticle = async (req,res)=>{
	try {
		const dataFromDB = await Articles.find().populate('user')
		const article = dataFromDB.sort((a,b)=>b.views-a.views).map(article=>{
			return{
				user:{
					firstName: article.user.firstName,
					lastName: article.user.lastName,
					photo:article.user.photo
				},
				id:article.id,
				title:article.title,
				category:article.category,
				image:article.image,
				date:article.date,
				text:article.text,
				views:article.views
			}
		})[0]
		res.status(200).json(article)
	}
	catch (e){
		res.status(400).json(e)
	}
}

const addArticle = async (req, res)=>{
	try{
		const dataFromUI = JSON.parse(req.body.data)
		if (dataFromUI.category && dataFromUI.title && dataFromUI.text) {
			if (req.file) {
				const user = await Users.findOne({email:dataFromUI.user})
				const article = new Articles({
					...dataFromUI,
					image:req.file.path,
					id:Date.now(),
					user:user._id,
					views:0})
				article.save()
				res.status(201).json({message:'Article added'})
			}
				res.status(200).json({message:'Pls upload image'})
		}
		res.status(200).json({message:'Has empty field'})
	}
	catch (e){
		res.status(400).json(e)
	}
}



module.exports = {allArticles, addArticle, popularArticle, article, myArticles, addView}

