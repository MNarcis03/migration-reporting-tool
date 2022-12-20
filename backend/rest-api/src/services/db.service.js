// const mysql = require('mysql2/promise');
const mysql = require('mysql2/promise');
const config = require('../configs/db.config');

const connectionPool = mysql.createPool(config.db);

async function query(sql, params) {
  const connection = await connectionPool.getConnection();
  const [results, ] = await connection.execute(sql, params);
  await connection.release();

  return results;
}

module.exports = {
  query
};
