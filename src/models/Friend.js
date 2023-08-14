const db = require('../db');

module.exports = {
    all: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM friends', (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }else{ aceito(results);}
            });
        });
    },
    find: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM friends WHERE ID = ?', [id], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }
                if(results.length > 0){
                    aceito(results[0]);
                }else{
                    aceito(false);
                }
            });
        });
    },
    store: (request_id, received_id, status, created_at, update_at) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO friends (REQUEST_ID, RECEIVED_ID, STATUS, CREATED_AT, UPDATED_AT) VALUES (?, ?, ?, ?, ?)', [request_id, received_id, status, created_at, update_at], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }
                aceito(results.store);
            });
        });
    },
    update: (id, request_id, received_id, status, created_at, update_at) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE friends SET REQUEST_ID = ?, RECEIVED_ID = ?, STATUS = ?, CREATED_AT = ?, UPDATED_AT = ? WHERE ID = ?', [request_id, received_id, status, created_at, update_at, id], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }
                aceito(results.update);
            });
        });
    },
    destroy: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('DELETE FROM friends where ID = ?', [id], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }else{ aceito(results);}
            });
        });
    },
};