const express = require('express');

const router = express.Router();
const index_controller = require('../controllers/index');

router.post('/game', index_controller.game_post);

router.get('/score/:imageName', index_controller.score_get);

router.post('/score', index_controller.score_post);

module.exports = router;
