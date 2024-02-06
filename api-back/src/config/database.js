import mysql from "mysql2/promise";

const pool = mysql.createPool({
    host : process.env.DB_HOST,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    port : process.env.DB_PORT,
});

pool.getConnection().then((connection)=>{
    console.log("connected to database")
    connection.release();
});

export default pool ;