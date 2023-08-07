const express = require('express');
var fetch = require('node-fetch');
const router = express.Router();

const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
const CommentController = require('./controllers/CommentController');
//Rotas para os users
router.get('/users', UserController.all);
router.get('/user/:id', UserController.find);
router.post('/user', UserController.store);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.destroy);
//Rotas para os posts
router.get('/posts', PostController.all);
router.get('/post/:id', PostController.find);
router.post('/post', PostController.store);
router.put('/post/:id', PostController.update);
router.delete('/post/:id', PostController.destroy);
//Rotas para os Comentários
router.get('/comments', CommentController.all);
router.get('/comment/:id', CommentController.find);
router.post('/comment', CommentController.store);
router.put('/comment/:id', CommentController.update);
router.delete('/comment/:id', CommentController.destroy);

/* server.get('/', function(req, res){
    fetch('http://localhost:8080/api/posts', {method:'GET'})
    .then(resposta => resposta.json())
    .then(resposta => res.render('home', {dados:resposta}));
}); */

module.exports = router;