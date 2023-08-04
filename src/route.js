const express = require('express');
const router = express.Router();

const UserController = require('./controllers/UserController');
const PostController = require('./controllers/PostController');
//Rotas do user
router.get('/users', UserController.all);
router.get('/user/:id', UserController.find);
router.post('/user', UserController.store);
router.put('/user/:id', UserController.update);
router.delete('/user/:id', UserController.destroy);
//Rotas do post
router.get('/posts', PostController.all);
router.get('/post/:id', PostController.find);
router.post('/post', PostController.store);
router.put('/post/:id', PostController.update);
router.delete('/post/:id', PostController.destroy);

module.exports = router;