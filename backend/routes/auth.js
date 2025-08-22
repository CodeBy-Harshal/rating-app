const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// helpers
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passRegex = /^(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,16}$/;

router.post('/signup', async (req, res) => {
  try {
    const { name, email, address, password } = req.body;

    // validations per spec
    if (!name || name.length < 20 || name.length > 60)
      return res.status(400).json({ message: 'Name must be 20-60 characters' });

    if (!address || address.length > 400)
      return res.status(400).json({ message: 'Address must be <= 400 chars' });

    if (!emailRegex.test(email || ''))
      return res.status(400).json({ message: 'Invalid email' });

    if (!passRegex.test(password || ''))
      return res.status(400).json({ message: 'Password 8-16, 1 uppercase, 1 special char' });

    // unique email
    const [existing] = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existing.length) return res.status(409).json({ message: 'Email already registered' });

    const hash = await bcrypt.hash(password, 12);
    await db.query(
      'INSERT INTO users (name, email, address, password, role) VALUES (?,?,?,?, "USER")',
      [name, email, address, hash]
    );

    return res.status(201).json({ message: 'User registered. Please login.' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Signup failed' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!emailRegex.test(email || '') || !password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const [rows] = await db.query('SELECT id, name, email, password, role FROM users WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ message: 'Invalid credentials' });

    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role, name: user.name },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES || '1h' }
    );

    return res.json({
      token,
      user: { id: user.id, name: user.name, email: user.email, role: user.role }
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: 'Login failed' });
  }
});

module.exports = router;
