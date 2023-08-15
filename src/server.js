require('dotenv').config({path:'.env'});
const express = require('express');
const cors = require('cors');
//Importação do handlebars
var exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
//Trabalhando com API
var fetch = require('node-fetch');
const routes = require('./route');
const server = express();
server.use(cors());
//Expecificação da requesição HTTP
server.use(express.json(), bodyParser.urlencoded({extended: false}));
server.engine('handlebars', exphbs.engine({defaultLayout: "index"}));
server.set('view engine', 'handlebars');
server.use('/api', routes);
server.use('/auth', require('./auth'));
//Importando a pasta pública (Com o css e img)
server.use(express.static(process.cwd() + '/public'));

server.get('/', function(req, res){
    fetch('http://localhost:8080/api/posts', {method:'GET'})
    .then(resposta => resposta.json())
    .then(resposta => res.render('home', {dados:resposta}));
});
server.get('/login', function(req, res){
    res.render('user/login');
});

server.get('/perfil',async function(req, res){
    const postsRes = await fetch('http://localhost:8080/api/posts', {method:'GET'});
    const posts = await postsRes.json();

    const notificationRes = await fetch('http://localhost:8080/api/notifications', {method:'GET'})
    const notifications = await notificationRes.json();

    res.render('user/profile', {dados:posts, users:notifications});
    
    //.then(resposta => res.render('user/profile', {dados:resposta}));
});

server.get('/feed',async function(req, res){
    const postsRes = await fetch('http://localhost:8080/api/posts', {method:'GET'});
    const posts = await postsRes.json();

    const notificationRes = await fetch('http://localhost:8080/api/notifications', {method:'GET'})
    const notifications = await notificationRes.json();

    res.render('posts/feed', {dados:posts, users:notifications});
    
    //.then(resposta => res.render('user/profile', {dados:resposta}));
});


server.get('/register', function(req, res){
    res.render('user/register');
});

/* server.get('/perfil', function(req, res){
    fetch('http://localhost:8080/api/posts', {method:'GET'})
    .then(resposta => resposta.json())
    .then(resposta => res.render('user/profile', {dados:resposta}));
}); 

server.post('/register_user', function(req, res){
    const fullname = req.body.fullname;
    const username = req.body.username;
    const password = req.body.password;
    const passwordretry = req.body.passwordretry;
    const created_at = new Date();
    const updated_at = new Date();
    if(password == passwordretry){
        dados = {'fullname':fullname, "username":username, "password": password, "created_at":created_at, "updated_at": updated_at};
        fetch('http://localhost:8080/api/user', {
            method:'POST',
            body:JSON.stringify(dados),
            headers:{'Content-Type':'application/json'}
        })
        .then(res.redirect('/login'));
    }else{
        const errormessage_register = "Palavra-passe é diferente com a de confirmação.";
        res.render('user/register', {errormessage_register:errormessage_register});
    }
});

*/

server.listen(process.env.PORT, () =>{
    console.log(`O servidor está a rodar em http://localhost:${process.env.PORT}`);
});
