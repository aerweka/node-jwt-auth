const express = require("express");
const client = require("./config/dbConnection");
const authRoutes = require("./routes/authentication");
const bookRoutes = require("./routes/book");
const authorRoutes = require("./routes/author");
const cookieParser = require("cookie-parser");
const { requireAuth, checkUser } = require("./middlewares/authMiddleware");

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

const db = require("./models")
db.sequelize.sync({ force: true })
  .then(() => {
    console.log("DB synced");
  })
  .catch((err) => {
    console.log(`Failed to sync : ${err.message}`);
  })

// routes
app.get("*", checkUser);
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", requireAuth, (req, res) => res.render("smoothies"));
app.use(authRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/authors", authorRoutes);

app.listen(process.env.PORT || 3000, () => {
  console.log("Server running");
})