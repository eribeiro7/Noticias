const Friend = require('../models/Friend');
module.exports = {
    all: async (req, res) => {
        let json = {error:'', result:[]};
        let friends = await Friend.all();
        for(let i = 0; i < friends.length; i++){
            json.result.push({
                id: friends[i].ID,
                request_id: friends[i].REQUEST_ID,
                received_id: friends[i].RECEIVED_ID,
                status: friends[i].TATUS,
                created_at: friends[i].CREATED_AT,
                update_at: friends[i].UPDATED_AT
            });
        }
        res.json(json);
    },
    find: async (req, res) => {
        let json = {error:'', result:{}};
        let id = req.params.id;
        let friend = await Friend.find(id);
        if(friend){
            json.result = friend;
        }
        res.json(json);
    },
    store: async (req, res) => {
        let json = {error:'', result:{}};
        let request_id = req.body.request_id;
        let received_id = req.body.received_id;
        let status = req.body.status;
        let created_at = req.body.created_at;
        let updated_at = req.body.updated_at;
        if(request_id && received_id){
            let friend = await Friend.store(request_id, received_id, status, created_at, updated_at);
            json.result = {
                id: friend,
                request_id,
                received_id,
                status,
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
        let request_id = req.body.request_id;
        let received_id = req.body.received_id;
        let status = req.body.status;
        let created_at = req.body.created_at;
        let updated_at = req.body.updated_at;
        if(request_id && received_id && id){
            await Friend.update(id, request_id, received_id, status, created_at, updated_at);
            json.result = {
                id,
                request_id,
                received_id,
                status,
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
        await Friend.destroy(req.params.id);
        res.json(json);
    }
};