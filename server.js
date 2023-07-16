const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");
const dotenv = require("dotenv");
const sequelize = require("./config/connection");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure session middleware
const sessionOptions = {
  secret: "secret",
  resave: false,
  saveUninitialized: false,
  store: new SequelizeStore({
    db: sequelize,
  }),
};
app.use(session(sessionOptions));


app.use(
  session({
    secret: "your-secret-key", // Replace with a secret key for session data
    resave: false,
    saveUninitialized: false,
    store: new SequelizeStore({
      db: sequelize,
    }),
  })
);
// Set up Handlebars.js as the view engine
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: ".handlebars",
});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./app/routes/home")); 
app.use("/dashboard", require("./app/routes/blogRoutes"));
app.use("/auth", require("./app/routes/authRoutes")); 
app.use("/post", require("./app/routes/postRoutes")); 

// Sync Sequelize models and start the server
sequelize
  .sync({ force: false }) // Set to true if you want to recreate the tables on every server start
  .then(() => {
    app.listen(PORT, () =>
      console.log(`Server listening on http://localhost:${PORT}`)
    );
  })

  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });
