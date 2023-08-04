const db = require('../db');

module.exports = {
    all: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM posts', (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }else{ aceito(results);}
            });
        });
    },
    find: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM posts WHERE ID = ?', [id], (error, results)=>{
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
    store: (title, body, user_id, status, created_at, update_at) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO posts (TITLE, BODY, USER_ID, STATUS, CREATED_AT, UPDATED_AT) VALUES (?, ?, ?, ?, ?, ?)', [title, body, user_id, status, created_at, update_at], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }
                aceito(results.store);
            });
        });
    },
    update: (id, title, body, user_id, status, created_at, update_at) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE posts SET TITLE = ?, BODY = ?, USER_ID = ?, STATUS = ?, CREATED_AT = ?, UPDATED_AT = ? WHERE ID = ?', [title, body, user_id, status, created_at, update_at, id], (error, results)=>{
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
            db.query('DELETE FROM posts where ID = ?', [id], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }else{ aceito(results);}
            });
        });
    },
};