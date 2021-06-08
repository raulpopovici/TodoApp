const jwt = require('jsonwebtoken');
const pool = require("../database/config");

const isAuth = async (req,res,next) => {
    try{
        const token = req.cookies.token;
        if(!token) return res.status(401).json({error: 'Not authenticated'})

        const {user} = jwt.verify(token,config.jwt);
        const dbRes = await pool.query("SELECT user_id,username,email FROM users",[user.username]);

        res.locals.user = dbRes.rows[0];

        return next();
    }catch(e){
        return res.status(500).send(error);
    }
}

module.exports = isAuth;