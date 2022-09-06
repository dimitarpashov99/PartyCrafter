const express = require("express");
const usersController = require("../controllers/Users");
const foodMenusController = require("../controllers/FoodMenus");
const playListController = require("../controllers/MusicPlaylists");
var router = express.Router();

router.get("/profile/:id", usersController.getUserProfile);

router.post("/profile/changePassword", usersController.changePassword);

router.post("/profile/changeEmail", usersController.changeEmail);

router
    .route("/custom/menus/")
    .get(foodMenusController.getAllFoodMenus)
    .post(foodMenusController.createCustomFoodMenu);

router
    .route("/custom/menus/:menuId")
    .get(foodMenusController.getFoodMenuById)
    .put(foodMenusController.updateCustomFoodMenu)
    .delete(foodMenusController.removeCustomFoodMenu);

router
    .route("/custom/playlists")
    .get(playListController.getAllMusicPlaylists)
    .post(playListController.createCustomMusicPlaylist);

router
    .route("/custom/playlists/:playlistId")
    .get(playListController.getMusicPlaylistById)
    .put(playListController.updateCustomMusicPlaylist)
    .delete(playListController.removeCustomMusicPlaylist);

module.exports = router;
