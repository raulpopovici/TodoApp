const {Router} = require("express");
const pool = require("../database/config")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");


function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}


const createUser = async (req,res) =>{
    const {
        username,
        email,
        password,
        confirmPassword,

    } = req.body


    try {

        if(password!== confirmPassword){
            return res.status(400).send({
                error:"pass does not match"
            })
        }
        console.log("error")

        if(validateEmail(email)===false){
            return res.status(400).send({
                error:"email is not valid"
            })

        }
        

        const hashPassword = await bcrypt.hash(password,8);

        const createdUser = await pool.query("INSERT INTO users(username,email,password) VALUES ($1,$2,$3) RETURNING username,email",[username,email,hashPassword]);
        
        return res.status(201).send(createdUser.rows[0]);

    } catch (error) {
        return res.status(500).send({
            error:"something went wrong"
        })  //internal server error
    }
}

const login = async(req,res) => {
    const { 
            username,
            password
        } = req.body

    try {

        const dbRes = await pool.query("SELECT * FROM users WHERE username = $1",[username]);
        const user = dbRes.rows[0];
        const hashPassword = await bcrypt.compare(password,user.password);
        
        
        if(!hashPassword){
            return res.status(401).send({password:'Invalid credentials'});
        }
        

        const token = jwt.sign({
            user
        },"mama");

        

        res.set('Set-Cookie', cookie.serialize('token',token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            maxAge: 3600*24*30,
            path: '/'
        }))

        console.log(user);

        return res.status(200).send({success:true});
    } catch (error) {
        return res.status(500).send({error:"not oke on login"});
        
    }    
}

const logout = async(req,res) => {

    res.set(
        "Set-Cookie",
        cookie.serialize("token", "", {
            httpOnly: true,
            expires: new Date(0),
            path: "/",
        })
    );

    return res.status(200).json({ success: true });

}

const router = Router();

router.post('/register',createUser);

router.post("/login",login);

router.get("/logout",logout);

module.exports = router;