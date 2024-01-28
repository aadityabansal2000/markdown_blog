const express= require('express');
const mongoose= require('mongoose');
const Article= require('./models/article');
const articleRouter= require("./routes/articles");
const methodOverride= require('method-override');
const app=express();
mongoose.connect("mongodb://0.0.0.0:27017/blog").then(()=>{console.log("Connection happened successfully!")}).catch((err)=>{console.log(`Error : ${err}`)});
app.set("view engine",'ejs');
app.use(express.urlencoded({extended:false}));//we can access all of parameters in article route
app.use(methodOverride('_method'));
app.get('/',async(req,res)=>{
  const articles = await Article.find().sort({createdAt:'desc'});
  res.render("articles/index.ejs",{articles:articles}); 
})
app.use("/articles",articleRouter);
app.listen(5000,()=>{console.log("Listening on port 5000!")});
