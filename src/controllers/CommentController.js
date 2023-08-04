const Comment = require('../models/Comment');
module.exports = {
    all: async (req, res) => {
        let json = {error:'', result:[]};
        let comments = await Comment.all();
        for(let i = 0; i < comments.length; i++){
            json.result.push({
                id: comments[i].ID,
                //title: comments[i].TITLE,
                body: comments[i].BODY,
                user_id: comments[i].USER_ID,
                status: comments[i].TATUS,
                created_at: comments[i].CREATED_AT,
                update_at: comments[i].UPDATE_AT
            });
        }
        res.json(json);
    },
    find: async (req, res) => {
        let json = {error:'', result:{}};
        let id = req.params.id;
        let comment = await Comment.find(id);
        if(comment){
            json.result = comment;
        }
        res.json(json);
    },
    store: async (req, res) => {
        let json = {error:'', result:{}};
        let body = req.body.body;
        let user_id = req.body.user_id;
        let post_id = req.body.post_id;
        let comment_id = req.body.comment_id;
        let status = req.body.status;
        let created_at = req.body.created_at;
        let update_at = req.body.update_at;
        if(body && user_id && post_id){
            let comment = await Comment.store(body, post_id, user_id, comment_id, status, created_at, update_at);
            json.result = {
                id: comment,
                body,
                post_id,
                user_id,
                comment_id,
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
        let body = req.body.body;
        let user_id = req.body.user_id;
        let post_id = req.body.post_id;
        let comment_id = req.body.comment_id;
        let status = req.body.status;
        let created_at = req.body.created_at;
        let update_at = req.body.update_at;
        if(body && id){
            await Comment.update(id, body, post_id, user_id, comment_id, status, created_at, update_at);
            json.result = {
                id,
                body,
                post_id,
                user_id,
                comment_id,
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
        await Comment.destroy(req.params.id);
        res.json(json);
    }
};