const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    //return res.send("Teste");
    const fullname = req.body.fullname;
    const username = req.body.username;
    const password = req.body.password;
    const passwordretry = req.body.passwordretry;
    const created_at = new Date();
    const updated_at = new Date();
    if(password == passwordretry){
        let hashedPassword = await bcrypt.hash(password, 8);
        dados = {'fullname':fullname, "username":username, "password": hashedPassword, "created_at":created_at, "updated_at": updated_at};
        fetch('http://localhost:8080/api/user', {
            method:'POST',
            body:JSON.stringify(dados),
            headers:{'Content-Type':'application/json'}
        })
        .then(res.redirect('/login'));
    }else{
        const errormessage_register = "Palavra-passe é diferente com a de confirmação.";
        //return res.render('user/register');
        //res.render('user/register');
        res.status(422).redirect('/register');
    }
}

exports.login = async (req, res) =>{
    const username = req.body.username;
    const password = req.body.password;

    if(!username){
        res.status(422).redirect('/login');
    }
    if(!password){
        res.status(422).redirect('/login');
    }
    const dados = {username: username}
    const userRes = await fetch('http://localhost:8080/api/findByUsername', {
        method:'POST',
        body:JSON.stringify(dados),
        headers:{'Content-Type':'application/json'}
    });
    const user = await userRes.json();
    if(!user){
        res.status(422).redirect('/login');
    }
    const checkPassword = await bcrypt.compare(password, user.result.PASSWORD);
    if(!checkPassword){
        res.status(422).redirect('/login');
    }
    //res.status(422).redirect('home');

    try{
        const secret = "jkhukghjfjhgdgfsdrdjyiyxdjcjbjhvhj";

        const token = jwt.sign({
            id: user.result.ID,
        },
        secret,
        );
        res.status(500).json({msg: 'Sucesso no login!', token});
    }catch(error){
        console.log(error);
        res.status(500).redirect('login');
    }
}

exports.getUser = async (req, res) =>{
    const id = req.params.id;
/*
    if(!username){
        res.status(422).redirect('/login');
    }
    if(!password){
        res.status(422).redirect('/login');
    }
    const dados = {username: username}
    const userRes = await fetch('http://localhost:8080/api/user/:'+id, {
        method:'GET',
        body:JSON.stringify(dados),
        headers:{'Content-Type':'application/json'}
    });
    const user = await userRes.json();
    if(!user){
        res.status(422).redirect('/login');
    }
    const checkPassword = await bcrypt.compare(password, user.result.PASSWORD);
    if(!checkPassword){
        res.status(422).redirect('/login');
    }
    //res.status(422).redirect('home');

    try{
        const secret = "jkhukghjfjhgdgfsdrdjyiyxdjcjbjhvhj";

        const token = jwt.sign({
            id: user.result.ID,
        },
        secret,
        );
        res.status(500).json({msg: 'Sucesso no login!', token});
    }catch(error){
        console.log(error);
        res.status(500).redirect('login');
    }
    */
}