require('dotenv').config();
const bcrypt = require('bcryptjs');
const db = require('../db');

(async () => {
  try {
    const name = 'System Administrator Default User';
    const email = 'admin@example.com';
    const address = 'HQ';
    const rawPass = 'Admin@123'; // meets policy

    const hash = await bcrypt.hash(rawPass, 12);

    // upsert-ish
    const [rows] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (!rows.length) {
      await db.query(
        'INSERT INTO users (name, email, address, password, role) VALUES (?,?,?,?, "ADMIN")',
        [name, email, address, hash]
      );
      console.log('Admin seeded:', email, 'password:', rawPass);
    } else {
      await db.query('UPDATE users SET role="ADMIN", password=? WHERE email=?', [hash, email]);
      console.log('Admin updated:', email, 'password reset to:', rawPass);
    }
    process.exit(0);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();
