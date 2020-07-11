/*  Utilidades y librerias*/
var express = require('express'),app = express();
var session = require('express-session');
var bodyParser = require('body-parser')
var multer = require('multer');
const path = require('path');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/css',express.static(__dirname+'/src/css'));
app.use('/img',express.static(__dirname+'/src/images'));
app.use('/js',express.static(__dirname+'/src/js'));
app.use('/vendor',express.static(__dirname+'/src/vendor'));
app.use('/fonts',express.static(__dirname+'/src/fonts'));
app.use(session({
	name: "not",
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: false,
  cookie: {name: "not",type:"" ,secure: false }
}))

var auth = function(req, res, next) {
    console.log(req.session)
    if (req.session.names!=undefined){
        return next();
    }else{
        return res.redirect('/login')
    }
};
//Metodos GET
app.get('/login',function(req,res) {
	//Renderiza la plantilla Login
  res.sendFile(__dirname+'/src/views/login.html')
});
app.get('/registro',function(req,res) {
	//Renderiza la plantilla registro
  res.sendFile(__dirname+'/src/views/registro.html')
});
app.get('/reservar/:id', auth, function(req,res) {
	//Renderiza la plantilla info
  res.sendFile(__dirname+'/src/views/reservar.html')
});
app.get('/lista_de_vuelos',  function(req,res) {
	//Renderiza la plantilla index
  res.sendFile(__dirname+'/src/views/vuelos.html')
});
app.get('/data', auth, function(req,res) {
	//Devuelve los datos de la sesion
    res.json({name: req.session.names, email: req.session.email})
});
app.get('/*', function(req,res) {
	//Redirecciona al login
    return res.redirect('/login')
});

//Metodos POST
app.post('/login',function(req,res) {
  const { names, email } = req.body;
  req.session.names = names
  req.session.email = email
  res.send(req.session.names)
});

//Define el puerto de la plataforma
app.set('port', (process.env.PORT || 80));
app.listen(app.get('port'), function () {
	//Comienza a ejecutar la plataforma
	console.log('App listening on port '+app.get('port'));
    });