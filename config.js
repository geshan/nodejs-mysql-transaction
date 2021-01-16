const env = process.env;

const config = {
  db: { /* do not put password or any sensitive info here, done only for demo */
    host: env.DB_HOST || 'remotemysql.com',
    user: env.DB_USER || 'HcsMUZp37U',
    password: env.DB_PASSWORD || 'WmwYwwFrQp',
    database: env.DB_NAME || 'HcsMUZp37U',
    waitForConnections: true,
    connectionLimit: env.DB_CONN_LIMIT || 2,
    queueLimit: 0,
    debug: env.DB_DEBUG || false
  },
};
  
module.exports = config;