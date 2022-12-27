const express = require("express");
const router = express.Router();

const usersController = require("../controllers/Users");
const foodMenusController = require("../controllers/FoodMenus");
const playListController = require("../controllers/MusicPlaylists");
const { authenticate } = require("../middlewares/authenticate");

router.get("/profile/:id", authenticate, usersController.getUserProfile);

router.post(
    "/profile/changePassword",
    authenticate,
    usersController.changePassword
);

router
    .route("/profile/addressbook/")
    .get(authenticate, usersController.getAddressBook)
    .post(authenticate, usersController.createAddress);

router
    .route("/profile/addressbook/:id")
    .get(authenticate, usersController.getAddressById)
    .put(authenticate, usersController.editCustomAddress)
    .delete(authenticate, usersController.removeCustomAddress);

router
    .route("/profile/menus/")
    .get(authenticate, foodMenusController.getFoodMenusByUserId)
    .post(authenticate, foodMenusController.createCustomFoodMenu);

router
    .route("/profile/menus/:menuId")
    .get(authenticate, foodMenusController.getFoodMenuById)
    .put(authenticate, foodMenusController.updateCustomFoodMenu)
    .delete(authenticate, foodMenusController.removeCustomFoodMenu);

router
    .route("/profile/playlists")
    .get(authenticate, playListController.getMusicPlaylistsByUserId)
    .post(authenticate, playListController.createCustomMusicPlaylist);

router
    .route("/profile/playlists/:playlistId")
    .get(authenticate, playListController.getMusicPlaylistById)
    .put(authenticate, playListController.updateCustomMusicPlaylist)
    .delete(authenticate, playListController.removeCustomMusicPlaylist);

module.exports = router;
