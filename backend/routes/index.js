const express = require('express');

const router = express.Router();
const index_controller = require('../controllers/index');

router.get('/', index_controller.homepage_get);

router.post('/game', index_controller.game_post);

router.post('/game/score', index_controller.score_post);

module.exports = router;
