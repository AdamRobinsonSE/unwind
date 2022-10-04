const express = require("express"); // enables express
const router = express.Router(); // enables router
const upload = require("../middleware/multer"); // middleware for uploading images
const postsController = require("../controllers/posts"); // enables postsController
const { ensureAuth, ensureGuest } = require("../middleware/auth"); // enables ensureAuth and ensureGuest

//Post Routes - simplified for now
router.get("/:id", ensureAuth, postsController.getPost); // :id is a placeholder for the post id, when we see req.params.id, we are referring to the id of the post. id could be anything, but we are using id for consistency

router.post("/createPost", upload.single("file"), postsController.createPost);

router.put("/likePost/:id", postsController.likePost);

router.delete("/deletePost/:id", postsController.deletePost);

module.exports = router;
