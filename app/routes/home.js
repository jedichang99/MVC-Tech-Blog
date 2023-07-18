const router = require("express").Router();
const post = require("../models/post");
const user = require("../models/user");

// Home route
router.get("/", async (req, res) => {
  console.log("hi");
  try {
    // Retrieve all blog posts with their associated authors (users)
    const postData = await post
      .findAll
      //     {
      //     where: {
      //         user_id: user.id
      //     },
      // //   include: [
      // //     {
      // //       model: user,
      // //       attributes: ["user"], // Include only the username from the User model
      // //     },
      // //   ],
      // }
      ();

    console.log(postData);

    // Map the retrieved data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));
console.log("hello")
    res.render("home", {
      posts,
      loggedIn: req.session.userId, // Assuming you set the userId in the session during login
    });
    // res.render("home");
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});
// router.get("/signin", async (req, res) => {
//     console.log("oooga");
// });

module.exports = router;
