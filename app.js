const express = require("express");
const bodyParser = require("body-parser");
const expressLayouts = require("express-ejs-layouts");
const cookieSession = require("cookie-session");
//router
const db = require('./models/db');
const userRouter = require('./routers/user');
const authRouter = require('./routers/auth');
const detailRouter = require('./routers/detail');
const ticketRouter = require('./routers/ticket');
const homeRouter = require('./routers/home');
const movieRouter = require('./routers/movie');
const adminRouter = require('./routers/admin');

const authMiddleware = require("./middlewares/auth");
const homeMiddleware = require("./middlewares/home");
const ensureLoggedIn = require("./middlewares/ensure_Logged_In");

const app = express();

//EJS
app.set('views', __dirname + '/views');
app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({extended: true})); 
//app.use(bodyParser.urlencoded({ extended: false }));
app.use(expressLayouts);
app.use(express.static(__dirname + '/public'));
//app.use(express.static("public"));

//Session
app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_KEY || "secret"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);

app.use(authMiddleware);
app.use(homeMiddleware);
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/detail', detailRouter);
app.use('/ticket', ticketRouter);
app.use('/', homeRouter);
app.use('/movie', movieRouter);
app.use('/admin', adminRouter);

db.sync().then(function (){
  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server is listening on port ${port}!`));
}).catch(console.error);
