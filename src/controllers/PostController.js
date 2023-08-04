const Post = require('../models/Post');
module.exports = {
    all: async (req, res) => {
        let json = {error:'', result:[]};
        let posts = await Post.all();
        for(let i = 0; i < posts.length; i++){
            json.result.push({
                id: posts[i].ID,
                title: posts[i].TITLE,
                body: posts[i].BODY,
                user_id: posts[i].USER_ID,
                status: posts[i].TATUS,
                created_at: posts[i].CREATED_AT,
                update_at: posts[i].UPDATE_AT
            });
        }
        res.json(json);
    },
    find: async (req, res) => {
        let json = {error:'', result:{}};
        let id = req.params.id;
        let post = await Post.find(id);
        if(post){
            json.result = post;
        }
        res.json(json);
    },
    store: async (req, res) => {
        let json = {error:'', result:{}};
        let title = req.body.title;
        let body = req.body.body;
        let user_id = req.body.user_id;
        let status = req.body.status;
        let created_at = req.body.created_at;
        let update_at = req.body.update_at;
        if(title && body && user_id){
            let post = await Post.store(title, body, user_id, status, created_at, update_at);
            json.result = {
                id: post,
                title,
                body,
                user_id,
                status,
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
        let title = req.body.title;
        let body = req.body.body;
        let user_id = req.body.user_id;
        let status = req.body.status;
        let created_at = req.body.created_at;
        let update_at = req.body.update_at;
        if(title && body && id){
            await Post.update(id, title, body, user_id, status, created_at, update_at);
            json.result = {
                id,
                title,
                body,
                user_id,
                status,
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
        await Post.destroy(req.params.id);
        res.json(json);
    }
};