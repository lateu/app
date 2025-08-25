const { getConnection } = require("../dbConnection/oracleConnection");


async function doGreeting(message) {
  let connection;
  try {
    connection = await getConnection();

    const result = await connection.execute(
      `INSERT INTO greetings (message) VALUES (:message) RETURNING id, created_at INTO :id, :created_at`,
      {
        message,
        id: { dir: connection.constructor.BIND_OUT, type: connection.constructor.NUMBER },
        created_at: { dir: connection.constructor.BIND_OUT, type: connection.constructor.DATE }
      }
    );

    await connection.commit();
    return {
      id: result.outBinds.id[0],
      created_at: result.outBinds.created_at[0],
      message
    };
  } finally {
    if (connection) await connection.close();
  }
}

module.exports = { doGreeting };
