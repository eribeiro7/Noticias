const User = require('../models/User');
const aux = 2;
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
        if(user){
            json.result = user;
        }
        res.json(json);
    },
    store: async (req, res) => {
        let json = {error:'', result:{}};
        let fullname = req.body.fullname;
        let username = req.body.username;
        let password = req.body.password;
        let created_at = req.body.created_at;
        let update_at = req.body.update_at;
        if(fullname && username){
            let user = await User.store(fullname, username, password, created_at, update_at);
            json.result = {
                id: user,
                fullname ,
                username, password,
                created_at,
                update_at
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
        let update_at = req.body.update_at;
        if(fullname && username && id){
            await User.update(id, fullname, username, password, created_at, update_at);
            json.result = {
                id,
                fullname,
                username,
                password,
                created_at,
                update_at 
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
    }
    
};