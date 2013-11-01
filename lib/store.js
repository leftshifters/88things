/**
 * Module Dependencies
 */
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;

/**
 * Cached db object
 */
var db;

connect();

/**
 * noop
 *
 * No operation
 */
function noop() {}

/**
 * Persist to permanent storage
 *
 * @param {String} Collection name
 * @param {Object} JSON data
 * @param {Function} Callback to call after save
 * @callback save callback
 * @api public
 */
exports.save = function(location, data, callback) {
  if ('function' !== typeof callback) callback = noop;
  save(location, data, callback);
};

/**
 * Get raw db object
 *
 * Useful for manual override
 *
 * @return {Object} database object
 * @api public
 */
exports.getDb = function() {
  return db;
};

function save(location, data, callback) {
  db.collection(location).save(data, callback);
}

/**
 * Connect & cache the database
 */
function connect(fn) {
  MongoClient.connect('mongodb://localhost:27017/88things', function(err, dbHandle) {
    assert.equal(null, err);
    console.log('asdf');
    db = dbHandle;

  });
}