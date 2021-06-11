const {Router} = require("express");
const pool = require("../database/config");
const isAuth = require("../middlewares/isAuth");

const createTodo = async (req,res)=>{

    const {description} = req.body;
    const user_id = res.locals.user.user_id;

    try {
        
        const createdTodo = await pool.query("INSERT INTO todos(description,fk_user_id) VALUES ($1,$2) RETURNING *",[description,user_id]);
        return res.status(201).send(createdTodo.rows[0]);
    
    } catch (error) {
        return res.status(500).send({error:"error on create to do"});
    }


}

const getAll = async (req,res) =>{
    const {user_id} = res.locals.user; 
    try {

        const userTodos = await pool.query("SELECT * FROM todos WHERE fk_user_id = $1 AND isdeleted=FALSE",[user_id]);
        return res.status(200).send(userTodos.rows);
        
    } catch (error) {
        return res.status(500).send({error:"error on getallto do"});
        
    }
}

const changeStatus = async(req,res) => {
    const {user_id}=res.locals.user;
    const {todo_id,status} = req.body;
    try {
        
        const dbRes = await pool.query("UPDATE todos SET status=$1 WHERE fk_user_id=$2 AND todo_id=$3 RETURNING *",[status,user_id,todo_id]);
        return res.status(200).send(dbRes.rows[0]);
        
    } catch (error) {
        return res.status(500).send({error:"error on change"});
        
    }
}

const deleteTodo = async(req,res)=>{
    const {user_id} = res.locals.user;
    const {id} = req.params;

    try {

        const dbRes = await pool.query("UPDATE todos SET isdeleted=TRUE WHERE fk_user_id=$1 AND todo_id=$2 RETURNING *",[user_id,id]);
        return res.status(200).send(dbRes.rows[0]);
        
    } catch (error) {
        return res.status(500).send({error:"error on delete"});
        
    }
}

const router = Router();
router.post('/',isAuth,createTodo); 
router.get('/',isAuth,getAll);
router.put('/',isAuth,changeStatus);
router.delete('/:id',isAuth,deleteTodo);

module.exports = router;