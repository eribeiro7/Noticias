const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
const CommentController = require('./controllers/CommentController');
const NotificationController = require('./controllers/NotificationController');
const FriendController = require('./controllers/FriendController');
//Rotas para os users
router.get('/users', UserController.all);
router.get('/user/:id',UserController.checkToken, UserController.find);
router.post('/user', UserController.store);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.destroy);
router.post('/findByUsername', UserController.findByUsername);
router.post('/auth/login', UserController.login);
//router.get('/utilizador/:id', AuthController.checktoken, AuthController.getUser);
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
//Rotas para os Comentários
router.get('/notifications', NotificationController.all);
router.get('/notification/:id', NotificationController.find);
router.post('/notification', NotificationController.store);
router.put('/notification/:id', NotificationController.update);
router.delete('/notification/:id', NotificationController.destroy);
//Rotas para os amigos
router.get('/friends', FriendController.all);
router.get('/friend/:id', FriendController.find);
router.post('/friend', FriendController.store);
router.put('/friend/:id', FriendController.update);
router.delete('/friend/:id', FriendController.destroy);

module.exports = router;