const Notification = require('../models/Notification');
module.exports = {
    all: async (req, res) => {
        let json = {error:'', result:[]};
        let notifications = await Notification.all();
        for(let i = 0; i < notifications.length; i++){
            console.log(notifications[i].FULLNAME);
            json.result.push({
                id: notifications[i].ID,
                title: notifications[i].TITLE,
                body: notifications[i].BODY,
                fullname: notifications[i].FULLNAME,
                user_id: notifications[i].USER_ID,
                post_id: notifications[i].POST_ID,
                status: notifications[i].TYPE,
                created_at: notifications[i].CREATED_AT,
                update_at: notifications[i].UPDATE_AT
            });
        }
        res.json(json);
    },
    find: async (req, res) => {
        let json = {error:'', result:{}};
        let id = req.params.id;
        let notification = await Notification.find(id);
        if(notification){
            json.result = notification;
        }
        res.json(json);
    },
    store: async (req, res) => {
        let json = {error:'', result:{}};
        let title = req.body.title;
        let body = req.body.body;
        let user_id = req.body.user_id;
        let post_id = req.body.post_id;
        let type = req.body.type;
        let created_at = req.body.created_at;
        let update_at = req.body.update_at;
        if(body && user_id && post_id){
            let notification = await Notification.store(body, post_id, user_id, type, title, created_at, update_at);
            json.result = {
                id: notification,
                body,
                post_id,
                user_id,
                type,
                title,
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
        let post_id = req.body.post_id;
        let type = req.body.type;
        let created_at = req.body.created_at;
        let updated_at = req.body.updated_at;
        if(body && id){
            await Notification.update(id, body, post_id, user_id, type, title, created_at, updated_at);
            json.result = {
                id,
                body,
                post_id,
                user_id,
                type,
                title,
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
        await Notification.destroy(req.params.id);
        res.json(json);
    }
};