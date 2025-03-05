const express = require("express");
const { getUserFavorite, favoriteToggle } = require("../controllers/favoriteController");

const router = express.Router();



// toggle add to fav and remove
router.get("/:id/:item_id", favoriteToggle);


// get perticullary user favorite list
router.get("/:user_id", getUserFavorite);



module.exports = router;

