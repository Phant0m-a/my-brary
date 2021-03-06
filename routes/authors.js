const express = require('express');
const router = express.Router();
const Author = require('../modals/author');

router.get('/',async (req,res)=>{
    let searchOptions = {}
    if(req.query.name != null && req.query.name !== ''){
       searchOptions.name = RegExp(req.query.name, 'i') 
    }
     
  try {
    const authors =await Author.find(searchOptions);
    res.render('authors/index',{authors:authors, searchOptions: req.query});
  } catch (error) {
      res.redirect('/')
  }
})

router.get('/new', (req,res)=>{
res.render('authors/new',{author: new Author()});
})

router.post('/',async(req,res)=>{
    const author = new Author({
        name:req.body.name
    })
    try {
       
          const newAuthor = await author.save()
           
               res.redirect('authors')
    } catch (error) {
        // res.redirect(`authors/${newAuthor.id}`)
                res.render(`authors/new`,{
                    author:author,
                    errorMessage:`Error Creating user ${error}`
                }); 
    }
    
     
         
               
            
        
    // res.send(req.body.name);
   
})
module.exports = router;