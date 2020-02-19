var express = require('express');
var router = express.Router();
const logger = require('../util/logger');
const eventController = require('../controller/event');

/* GET eventss listing. */
router.get('/', eventController.list);
router.post('/', eventController.create);
router.put('/', eventController.update);
router.delete('/', eventController.del);


module.exports = router;
