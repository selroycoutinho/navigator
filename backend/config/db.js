const mysql = require("mysql2");

const isCloudDatabase =
    process.env.DB_HOST &&
    !process.env.DB_HOST.includes("localhost") &&
    !process.env.DB_HOST.includes("127.0.0.1");

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT) || 3306,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    dateStrings: true,

    ...(isCloudDatabase && {
        ssl: {
            rejectUnauthorized: false
        }
    })
});

db.connect((err) => {
    if (err) {
        console.log("Database connection failed:", err);
        return;
    }

    console.log("MySQL connected successfully");
});

module.exports = db;