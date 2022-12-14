const express = require('express');
const router = express.Router();
const birdMigration = require('../services/birdMigration.service');

/* GET */
router.get('/', async function(req, res, next) {
  try {
    res.json(await birdMigration.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error GET `, err.message);
    next(err);
  }
});

/* POST */
router.post('/', async function(req, res, next) {
  try {
    res.json(await birdMigration.create(req.body));
  } catch (err) {
    console.error(`Error POST `, err.message);
    next(err);
  }
});

/* UPDATE */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await birdMigration.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error UPDATE `, err.message);
    next(err);
  }
});

/* DELETE */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await birdMigration.remove(req.params.id));
  } catch (err) {
    console.error(`Error DELETE `, err.message);
    next(err);
  }
});

module.exports = router;
