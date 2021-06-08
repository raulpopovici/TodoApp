const {Router} = require("express");
const pool = require("../database/config");
const isAuth = require("../middlewares/isAuth");

const createTodo = async (req,res)=>{

    const {description} = req.body;
    const user_id = res.locals.user.user_id;

    try {
        
        const createdTodo = await pool.query("INSERT INTO todos(description,user_id) VALUES ($1,$2) RETURNING *",[description,user_id]);
        return res.status(201).send(createdTodo.rows[0]);


    } catch (error) {
        return res.status(500).send({error:"error on create to do"});
    }


}

const router = Router();
router.post('/',isAuth,createTodo); 

module.exports = router;