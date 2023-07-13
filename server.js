const express = require("express");
const session = require("express-session");
const exphbs = require("express-handlebars");
const path = require("path");
const dotenv = require("dotenv");
const sequelize = require("./config/config.json");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Configure session middleware
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: false,
  })
);

// Set up Handlebars.js as the view engine
const hbs = exphbs.create();

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

// Middleware for parsing JSON and URL-encoded request bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./app/routes/authRoutes"));
app.use("/posts", require("./app/routes/postRoutes"));

// Sync Sequelize models and start the server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () =>
    console.log(`Server listening on http://localhost:${PORT}`)
  );
});
