const db = require('./db.service');
const helper = require('../utils/helper.util');
const config = require('../configs/db.config');

async function getMultiple(page = 1) {
  const offset = helper.getOffset(page, config.listPerPage);

  const rows = await db.query(
    `SELECT * FROM bird_migration LIMIT ${offset}, ${config.listPerPage}`
  );

  const data = helper.emptyOrRows(rows);
  const meta = { page };

  return {
    data,
    meta
  }
}

async function create(birdMigration) {
  var values = [ birdMigration ];

  const result = await db.query(
    `INSERT INTO bird_migration (species, appearances, location, latitude, longitude, date) VALUES \
    ('${birdMigration.species}', '${birdMigration.appearances}', '${birdMigration.location}', \
    '${birdMigration.latitude}', '${birdMigration.longitude}', '${birdMigration.date}')`
  );

  let message = 'Error in creating bird migration';

  if (result.affectedRows) {
    message = 'Bird migration created successfully';
  }

  return { message };
}

async function update(id, birdMigration) {
  const result = await db.query(
    `UPDATE bird_migration \
    SET species='${birdMigration.species}', \
    appearances='${birdMigration.appearances}', \
    location='${birdMigration.location}', \
    latitude='${birdMigration.latitude}', \
    longitude='${birdMigration.longitude}', \
    date='${birdMigration.date}' \
    WHERE id=${id}`
  );

  let message = 'Error in updating bird migration';

  if (result.affectedRows) {
    message = 'Bird migration updated successfully';
  }

  return { message };
}

async function remove(id) {
  const result = await db.query(
    `DELETE FROM bird_migration WHERE id=${id}`
  );

  let message = 'Error in deleting bird migration';

  if (result.affectedRows) {
    message = 'Bird migration deleted successfully';
  }

  return { message };
}

module.exports = {
  getMultiple,
  create,
  update,
  remove
};
