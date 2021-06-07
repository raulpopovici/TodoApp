const {Router} = require("express");
const pool = require("../database/config")
const bcrypt = require("bcrypt")


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

        if(validateEmail(email)===false){
            return res.status(400).send({
                error:"email is not valid"
            })

        }
        

        const hashPassword = await bcrypt.hash(password,12);

        const createdUser = await pool.query("INSERT INTO users(username,email,password) VALUES ($1,$2,$3) RETURNING username,email",[username,email,hashPassword]);
        
        return res.status(201).send(createdUser);

    } catch (error) {
        return res.status(500).send({
            error:"something went wrong"
        })  //internal server error
    }
}

const router = Router();

router.post('/register',createUser);

module.exports = router;