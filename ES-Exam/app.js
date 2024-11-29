const express = require('express');
const app = express();
const port = 3000;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// inmem storage so that i dont have to use a DB
const users = [];

app.use(express.json());

//route cerated
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the JWT Auth API' });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


//todo - make env
const JWT_SECRET = 'your-secret-key';

app.post('/signup', async (req, res) => {
  try {
    const { email, password } = req.body;
  
    if (users.find(user => user.email === email)) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // create new user
    const user = {
      id: users.length + 1,
      email,
      password: hashedPassword
    };

    users.push(user);

    res.status(201).jso n({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error in signing up' });
  }
});

// log
app.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // chk pass
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // cr token
    const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error in logging in' });
  }
});

// auth
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
};

// Protected route
app.get('/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', userId: req.user.id });
});
