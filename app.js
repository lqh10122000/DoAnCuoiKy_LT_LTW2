const express = require('express');
const bodyParser = require('body-parser');
const expressLayouts = require('express-ejs-layouts');
const cookieSession = require('cookie-session');


//router
const db = require('./models/db');
const userRouter = require('./routers/user');
const authRouter = require('./routers/auth');
//const theater_clusterRouter = require('./routers/theater_cluster');
const authMiddleware = require('./middlewares/auth');

const app = express();
//EJS
app.set('views', 'views');
app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(express.static('public'));

//Session
app.use(cookieSession({
    name: 'session',
    keys: [process.env.COOKIE_KEY || 'secret'],
    maxAge: 24 * 60 * 60 * 1000
  }))

app.use(authMiddleware);
app.use('/user', userRouter);
app.use('/auth', authRouter);
//app.use('/theater_cluster', theater_clusterRouter);
app.get('/', function(req, res){
    res.render('index', {title: 'Trang chủ' });
});

db.sync().then(function (){
    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`Server is listening on port ${port}!`));
}).catch(console.error);
