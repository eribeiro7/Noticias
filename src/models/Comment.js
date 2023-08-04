const db = require('../db');

module.exports = {
    all: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM comments', (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }else{ aceito(results);}
            });
        });
    },
    find: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM comments WHERE ID = ?', [id], (error, results)=>{
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
    store: (body, post_id, user_id, comment_id, status, created_at, update_at) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO comments (BODY, POST_ID, USER_ID, COMMENT_ID, STATUS, CREATED_AT, UPDATED_AT) VALUES (?, ?, ?, ?, ?, ?, ?)', [body, post_id, user_id, comment_id, status, created_at, update_at], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }
                aceito(results.store);
            });
        });
    },
    update: (id, body, post_id, user_id, comment_id, status, created_at, update_at) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE comments SET BODY = ?, POST_ID = ?, USER_ID = ?, COMMENT_ID = ?, STATUS = ?, CREATED_AT = ?, UPDATED_AT = ? WHERE ID = ?', [body, post_id, user_id, comment_id, status, created_at, update_at, id], (error, results)=>{
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
            db.query('DELETE FROM comments where ID = ?', [id], (error, results)=>{
                if(error){
                    rejeitado(error);
                    return;
                }else{ aceito(results);}
            });
        });
    },
};