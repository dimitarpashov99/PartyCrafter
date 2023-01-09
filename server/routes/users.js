const express = require("express");
const router = express.Router();

const usersController = require("../controllers/Users");
const foodMenusController = require("../controllers/FoodMenus");
const playListController = require("../controllers/MusicPlaylists");
const requireToken = require("../middlewares/authenticate");
const { body } = require("express-validator");
const handleValidation = require("../middlewares/handleValidation");

router.get(
    "/profile/:id",
    requireToken,
    body("address").isEmpty().withMessage("Request must contain address"),
    handleValidation,
    usersController.getUserProfile
);

router
    .route("/profile/addressbook/")
    .get(requireToken, usersController.getAddressBook)
    .post(requireToken, usersController.createAddress);

router
    .route("/profile/addressbook/:id")
    .get(requireToken, usersController.getAddressById)
    .put(requireToken, usersController.editCustomAddress)
    .delete(requireToken, usersController.removeCustomAddress);

router
    .route("/profile/menus/")
    .get(requireToken, foodMenusController.getFoodMenusByUserId)
    .post(requireToken, foodMenusController.createCustomFoodMenu);

router
    .route("/profile/menus/:menuId")
    .get(requireToken, foodMenusController.getFoodMenuById)
    .put(requireToken, foodMenusController.updateCustomFoodMenu)
    .delete(requireToken, foodMenusController.removeCustomFoodMenu);

router
    .route("/profile/playlists")
    .get(requireToken, playListController.getMusicPlaylistsByUserId)
    .post(requireToken, playListController.createCustomMusicPlaylist);

router
    .route("/profile/playlists/:playlistId")
    .get(requireToken, playListController.getMusicPlaylistById)
    .put(requireToken, playListController.updateCustomMusicPlaylist)
    .delete(requireToken, playListController.removeCustomMusicPlaylist);

module.exports = router;
