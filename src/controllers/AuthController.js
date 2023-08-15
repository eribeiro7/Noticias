/* 
module.exports = {
    register: (req, res) => {
        console.log(req.body);
        res.send("Form submitted!");
    }
}; */

exports.register = (req, res) => {
    //return res.send("Teste");
    const fullname = req.body.fullname;
    const username = req.body.username;
    const password = req.body.password;
    const passwordretry = req.body.passwordretry;
    const created_at = new Date();
    const updated_at = new Date();
    
    if(password == passwordretry){
        dados = {'fullname':fullname, "username":username, "password": password, "created_at":created_at, "updated_at": updated_at};
        fetch('http://localhost:8080/api/user', {
            method:'POST',
            body:JSON.stringify(dados),
            headers:{'Content-Type':'application/json'}
        })
        .then(res.redirect('/login'));
    }else{
        const errormessage_register = "Palavra-passe é diferente com a de confirmação.";
        res.render('user/register', {errormessage_register:errormessage_register});
    }
}

