const Router = require('express')
const { allArticles, addArticle, popularArticle, article, myArticles, addView} = require("../controllers/articlesController");

const articlesRouter = Router()
module.exports = articlesRouter

articlesRouter.get('/allArticles', allArticles)

articlesRouter.post('/add', addArticle)

articlesRouter.get('/popularArticle', popularArticle)

articlesRouter.get('/article', article)

articlesRouter.get('/myArticles', myArticles)

articlesRouter.put('/addView', addView)