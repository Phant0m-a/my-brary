// if(process.env.NODE_ENV !== 'production'){
//     require('dotenv').parse()
// }

const express = require('express');
const app = express()
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const { Db } = require('mongodb');
const mongoose = require('mongoose');
// custom routes
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors');   


app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');
app.set('layout', 'layouts/layout');
app.use(expressLayouts);
app.use(bodyParser.urlencoded({limit:'10mb', extended:false}))
app.use(express.static('public'));

mongoose.connect( 'mongodb://localhost:27017/mybrary', {
    useNewUrlParser: true,

    useUnifiedTopology: true
})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', ()=> console.log('Connected to Mongoose'))


// route get
app.use('/', indexRouter);
app.use('/authors', authorRouter);

console.log('server restarted successfully 😁');
app.listen(process.env.PORT || 5000);

