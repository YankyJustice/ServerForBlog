let express = require('express')
let cors = require('cors')
let mongoose = require('mongoose')
let multer = require('multer')

let config = require('./config')
const authRouter = require('./routes/auth')
const articlesRouter = require('./routes/articles')
const profileRouter = require('./routes/profile')

let app = express()


app.use(cors({origin:config.origin}))
app.use(multer({dest:"uploads"}).single("image"))
app.use(express.json())
app.use("/uploads", express.static(__dirname + "/uploads"))
app.use('/auth', authRouter)
app.use('/articles', articlesRouter)
app.use('/profile', profileRouter)

const start = async ()=>{
	await mongoose.connect(
		"mongodb+srv://admin:1234@cluster0.pjgwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
		{ useNewUrlParser: true, useUnifiedTopology: true }
	)
	app.listen(config.PORT,()=>console.log(config.PORT))
}

start()



