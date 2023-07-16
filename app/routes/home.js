const router = require("express").Router();
const { post, user } = require("../models");

// Home route
router.get("/", async (req, res) => {
  try {
    // Retrieve all blog posts with their associated authors (users)
    const postData = await post.findAll({
      include: [
        {
          model: user,
          attributes: ["user"], // Include only the username from the User model
        },
      ],
    });

    // Map the retrieved data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));

    res.render("home", {
      posts,
      loggedIn: req.session.userId, // Assuming you set the userId in the session during login
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

module.exports = router;
