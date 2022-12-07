const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/db.config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);

  const rows = await db.query(
    `SELECT * FROM bird_tweets LIMIT ${offset}, ${config.listPerPage}`
  );

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function create(birdTweet) {
  var values = [ birdTweet ];

  const result = await db.query(
    `INSERT INTO bird_tweets (tweet_id, caption, image_url, time_and_date, location, bird_species) VALUES \
    ('${birdTweet.tweet_id}', '${birdTweet.caption}', '${birdTweet.image_url}', \
    '${birdTweet.time_and_date}', '${birdTweet.location}', '${birdTweet.bird_species}')`
  );

  let message = 'Error in creating bird tweet';

  if (result.affectedRows) {
    message = 'Bird tweet created successfully';
  }

  return { message };
}

async function update(id, birdTweet) {
  const result = await db.query(
    `UPDATE bird_tweet 
    SET tweet_id='${birdTweet.id}', caption='${birdTweet.caption}', image_url='${birdTweet.image_url}', 
    time_and_date='${birdTweet.time_and_date}', location='${birdTweet.location}', bird_species='${birdTweet.bird_species}' 
    WHERE id=${id}`
  );

  let message = 'Error in updating bird tweet';

  if (result.affectedRows) {
    message = 'Bird tweet updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM bird_tweets WHERE id=${id}`
  );

  let message = 'Error in deleting bird tweet';

  if (result.affectedRows) {
    message = 'Bird tweet deleted successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
};
