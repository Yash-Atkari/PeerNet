if(process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
// if the incoming request has a JSON body (like from a frontend fetch() or Axios request), parse it and make it available as req.body.”
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors({
  origin: 'https://peernt.netlify.app', 
  credentials: true
}));

const MongoUrl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/peernet";

main()
    .then(() => {
        console.log("Connected to DB");
    })
    .catch((err) => {
        console.log(err);
    });

async function main() {
    await mongoose.connect(MongoUrl);
}

const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const MongoStore = require('connect-mongo');

const store = MongoStore.create({
    mongoUrl: MongoUrl,
    crypto: {
        secret: "hbsgturomjsg",
    },
    touchAfter: 24 * 3600,
});

store.on("error", () => {
    console.log("ERROR in MONGO SESSION STORE");
});

const sessionOptions = {
    store,
    secret: "fhnkndsjbryti",
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    }
};

const User = require("./models/user.js");
const Post = require('./models/post.js');

app.use(session(sessionOptions));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// POST /api/register
app.post("/api/auth/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const newUser = new User({ username, email  });
    const registeredUser = await User.register(newUser, password);
    
    req.login(registeredUser, (err) => {
      if (err) return res.status(500).json({ error: "Login failed" });
      res.status(201).json({ message: "User registered", user: registeredUser });
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// POST /api/login
app.post('/api/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) return next(err);
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    req.logIn(user, (err) => {
      if (err) return next(err);

      // Here, you can optionally generate a token (e.g., JWT), but if you're using sessions, you don't need it.
      return res.json({ user: { username: user.username, email: user.email } });
    });
  })(req, res, next);
});

app.get("/api/posts", async (req, res, next) => {
  try {
    const posts = await Post
      .find()
      .sort({ createdAt: -1 })
      .populate('author', 'username email');  // pull in author.username & email
    res.json(posts);
  } catch (err) {
    next(err);
  }
});

app.post("/api/posts", (req, res, next) => {
  if (!req.user) {
    console.log(req.user);
    return res.status(401).json({ error: 'Not authenticated' });
  }
  const { text } = req.body;
  const post = new Post({
    author: req.user._id,
    text
  });
  post.save()
    .then(doc => res.status(201).json(doc))
    .catch(next);
});

// GET /users/:id - get user profile
app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password'); // exclude password
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /users/:id/posts - get posts by user
app.get('/api/users/:id/posts', async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id }).sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log("Server is listening on port 3000");
})
