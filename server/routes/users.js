const express = require("express");

const router = express.Router();
const controller = require("../controllers/Users");

const requireToken = require("../middlewares/authenticate");

/**
 * Users API routes
 */
router.get("/", requireToken, controller.getAllAsQuery);

router
    .route("/:id")
    .get(requireToken, controller.getById)
    .put(requireToken, controller.update)
    .delete(requireToken, controller.delete);

router
    .route("/:userId/addressbook")
    .get(requireToken, controller.getAddressBook)
    .post(requireToken, controller.createAddress);

router
    .route("/:userId/addressbook/:id")
    .get(requireToken, controller.getAddressById)
    .put(requireToken, controller.editCustomAddress)
    .delete(requireToken, controller.removeCustomAddress);

router
    .route("/:userId/playlists")
    .get(requireToken, controller.getAddressBook)
    .post(requireToken, controller.createAddress);

router
    .route("/:userId/playlists/:id")
    .get(requireToken, controller.getAddressById)
    .put(requireToken, controller.editCustomAddress)
    .delete(requireToken, controller.removeCustomAddress);

router
    .route("/:userId/menus")
    .get(requireToken, controller.getAddressBook)
    .post(requireToken, controller.createAddress);

router
    .route("/:userId/menus/:id")
    .get(requireToken, controller.getAddressById)
    .put(requireToken, controller.editCustomAddress)
    .delete(requireToken, controller.removeCustomAddress);

// router
//     .route("/:userId/playlists")
//     .get(requireToken, controller.getMusicPlaylistsByUserId)
//     .post(requireToken, playListController.createCustomMusicPlaylist);

// router
//     .route("/:userId/playlists/:id")
//     .get(requireToken, playListController.getMusicPlaylistById)
//     .put(requireToken, playListController.updateCustomMusicPlaylist)
//     .delete(requireToken, playListController.removeCustomMusicPlaylist);

module.exports = router;
