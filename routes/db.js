var express = require('express');
var router = express.Router();

const { mongodb } = require('../mongo')

/* GET users listing. */
router.get('/', async function(req, res, next) {
  const db = await mongodb()
  const result = await db.collection('test').findOne()
  res.send(result);
});

module.exports = router;
