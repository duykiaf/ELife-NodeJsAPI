var express = require('express');

var app = express();

// Body-parser configuration
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

require('./routers/auth.router')(app);
require('./routers/getList.router')(app);
const _AuthMiddleWare = require('./common/_AuthMiddleWare');
app.use(_AuthMiddleWare.isAuth);
require('./routers/category.router')(app);
require('./routers/topic.router')(app);
require('./routers/audio.router')(app);

app.listen(3000, function () {
    console.log("Server is running at http://localhost:3000/");  
});