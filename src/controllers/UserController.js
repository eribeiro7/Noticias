const User = require('../models/User');
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');
//console.log( CarroService.all() );
module.exports = {
    all: async (req, res) => {
        let json = {error:'', result:[]};
        let users = await User.all();
        for(let i = 0; i < users.length; i++){
            json.result.push({
                id: users[i].ID,
                fullname: users[i].FULLNAME,
                username: users[i].USERNAME,
                password: users[i].PASSWORD
            });
        }
        res.json(json);
    },
    find: async (req, res) => {
        let json = {error:'', result:{}};
        let id = req.params.id;
        let user = await User.find(id);
        if(!user){
            return res.status(422).json({msg: 'Utilizador não encontrado.'});
        }
        if(user){
            json.result = user;
        }
        res.status(200).json(json);
    },
    store: async (req, res) => {
        let json = {error:'', result:{}};
        let fullname = req.body.fullname;
        let username = req.body.username;
        let password = req.body.password;
        let created_at = req.body.created_at;
        let updated_at = req.body.updated_at;
        if(fullname && username){
            let user = await User.store(fullname, username, password, created_at, updated_at);
            json.result = {
                id: user,
                fullname ,
                username, password,
                created_at,
                updated_at
            }
        }else{
            json.error = 'Campos não foram enviados';
        }
        res.json(json);
    },
    update: async (req, res) => {
        let json = {error:'', result:{}};
        let id = req.params.id;
        let fullname = req.body.fullname;
        let username = req.body.username;
        let password = req.body.password;
        let created_at = req.body.created_at;
        let updated_at = req.body.updated_at;
        if(fullname && username && id){
            await User.update(id, fullname, username, password, created_at, updated_at);
            json.result = {
                id,
                fullname,
                username,
                password,
                created_at,
                updated_at 
            }
        }else{
            json.error = 'Campos não foram enviados';
        }
        res.json(json);
    },
    destroy: async (req, res) => {
        let json = {error:'', result:{}};
        await User.destroy(req.params.id);

        res.json(json);
    },
    findByUsername: async (req, res) => {
        let json = {error:'', result:{}};
        let username = req.body.username;
        let user = await User.findByUsername(username);
        if(user){
            json.result = user;
        }
        res.json(json);
    },
    login: async (req, res) => {
        const username = req.body.username;
        const password = req.body.password;

        if(!username){
            return res.status(422).json({msg: 'O username é obrigatória.'});
        }
        if(!password){
            return res.status(422).json({msg: 'A senha é obrigatória.'});
        }

        let user = await User.findByUsername(username);
        if(!user){
            return res.status(422).json({msg: 'Utilizador não encontrado.'});
        }
        const checkPassword = await bcrypt.compare(password, user.PASSWORD);

        if(!checkPassword){
            return res.status(422).json({msg: 'Senha incorrecta.'});
        }
        try{
            const secret = process.env.SECRET;

            const token = jwt.sign({
                id: user.ID,
            },
            secret,
            );
            res.status(200).json({msg: 'Autenticação realizada com sucesso.', token});
        }catch(error){
            console.log(error);
            return res.status(500).json({msg: 'Aconteceu um erro no servidor, tente mais tarde.'});
        }
    }
};