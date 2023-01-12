const express = require("express");

const router = express.Router();
const controller = require("../controllers/Account");
const foodMenusController = require("../controllers/FoodMenus");
const playListController = require("../controllers/MusicPlaylists");

const requireToken = require("../middlewares/authenticate");

// const handleValidation = require("../middlewares/handleValidation");

/**
 * Account API routes
 */

router.get("/profile", requireToken, controller.getUserProfile);

router
    .route("/addressbook/")
    .get(requireToken, controller.getAddressBook)
    .post(requireToken, controller.createAddress);

router
    .route("/addressbook/:id")
    .get(requireToken, controller.getAddressById)
    .put(requireToken, controller.editCustomAddress)
    .delete(requireToken, controller.removeCustomAddress);

router
    .route("/menus/")
    .get(requireToken, foodMenusController.getFoodMenusByUserId)
    .post(requireToken, foodMenusController.createCustomFoodMenu);

router
    .route("/menus/:id")
    .get(requireToken, foodMenusController.getFoodMenuById)
    .put(requireToken, foodMenusController.updateCustomFoodMenu)
    .delete(requireToken, foodMenusController.removeCustomFoodMenu);

router
    .route("/playlists")
    .get(requireToken, playListController.getMusicPlaylistsByUserId)
    .post(requireToken, playListController.createCustomMusicPlaylist);

router
    .route("/playlists/:id")
    .get(requireToken, playListController.getMusicPlaylistById)
    .put(requireToken, playListController.updateCustomMusicPlaylist)
    .delete(requireToken, playListController.removeCustomMusicPlaylist);

router.get("/invitations", requireToken, controller.getUserInvitations);

module.exports = router;
