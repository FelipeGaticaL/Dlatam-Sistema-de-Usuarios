const { Pool } = require('pg')

const pool = new Pool({
    user: "postgres",
    host: "localhost",
    password: "1234",
    database: "softlife",
    port: 5432
})

const agregarUsuario = async ({ email, password }) => {
    const SQLQuery = {
        text: `INSERT INTO usuarios (email, password) values ($1, $2) RETURNING *;`,
        values: [email, password]
    };
    const result = await pool.query(SQLQuery);
    return result.rows[0];
}

const getUsuarios = async () => {
    const { rows } = await pool.query("SELECT * FROM usuarios")
    return rows
}

const loginUsuarios = async ({email,password}) => {
    const SQLQuery = {
        text: `SELECT FROM usuarios WHERE email=$1 AND password=$2`,
        values: [email,password]
    };
    const result = await pool.query(SQLQuery);

    const { rowCount } = result;
    if (!rowCount) throw 'No existe el usuario';

    return result.rows[0];
}


module.exports = { agregarUsuario,getUsuarios,loginUsuarios}