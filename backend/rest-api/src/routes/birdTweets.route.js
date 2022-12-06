const express = require('express');
const router = express.Router();
const birdTweets = require('../services/birdTweets.service');

/* GET bird tweets. */
router.get('/', async function(req, res, next) {
  try {
    res.json(await birdTweets.getMultiple(req.query.page));
  } catch (err) {
    console.error(`Error while getting birds `, err.message);
    next(err);
  }
});

/* POST bird tweets */
router.post('/', async function(req, res, next) {
  try {
    res.json(await birdTweets.create(req.body));
  } catch (err) {
    console.error(`Error while creating birds`, err.message);
    next(err);
  }
});

/* PUT bird tweets */
router.put('/:id', async function(req, res, next) {
  try {
    res.json(await birdTweets.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating bird tweets`, err.message);
    next(err);
  }
});

/* DELETE bird tweets */
router.delete('/:id', async function(req, res, next) {
  try {
    res.json(await birdTweets.remove(req.params.id));
  } catch (err) {
    console.error(`Error while deleting bird tweets`, err.message);
    next(err);
  }
});

module.exports = router;
