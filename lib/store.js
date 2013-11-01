/**
 * Module Dependencies
 */
var assert = require('assert');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var thunky = require('thunky');
var _ = require('underscore');

/**
 * Cached db object
 */
var db;

/**
 * Expose `getDb`
 */
exports.getDb = getDb;
exports.ensureObjectId = ensureObjectId;

/**
 * noop
 *
 * No operation
 */
function noop() {}

/**
 * Persist to permanent storage
 *
 * @param {String} collection name
 * @param {Object} JSON data
 * @param {Function} callback to call after save
 * @callback save callback
 * @api public
 */
exports.save = function(collection, data, callback) {
  if ('function' !== typeof callback) callback = noop;
  save(collection, data, callback);
};

/**
 * Fetch a document by id
 *
 * @param {String} collection name
 * @param {String} id
 * @param {Function} callback to call after fetch
 * @api public
 */
exports.fetch = function(collection, id, callback) {
  if ('function' !== typeof callback) throw "Fetch needs callback";
  fetch(collection, id, callback);
};

exports.findOne = findOne;
exports.find = find;

/**
 * Get raw db object
 *
 * Useful for manual override
 *
 * @return {Object} database object
 * @api public
 */
exports.getDbSync = function() {
  return db;
};

/**
 * Get database object
 *
 * @callback getDb
 * @api public
 */
var getDb = thunky(function(callback) {
  MongoClient.connect('mongodb://localhost:27017/88things', callback);
});


function save(collection, data, callback) {
  getDb(function(err, db) {
    if (err) return callback(err);
    db.collection(collection).save(data, callback);
  });
}

function findOne(collection, query, callback) {
  getDb(function(err, db) {
    if (err) return callback(err);
    db.collection(collection).findOne(query, callback);
  });
}

function find(collection, query, fields, options, callback) {
  if ('function' === typeof query) {
    callback = query;
    query = null;
    fields = null;
    options = null;
  } else if ('function' === typeof fields) {
    callback = fields;
    fields = null;
    options = null;
  } else if ('function' === typeof options) {
    callback = options;
    options = null;
  }

  getDb(function(err, db) {
    if (err) return callback(err);
    db.collection(collection).find(query, fields, options, callback);
  });
}

/**
 * Convert to ObjectId always
 *
 * @param {mixed} the id
 * @return {Object} ObjectId
 * @api public
 */
function ensureObjectId(id) {
  if (_.isObject(id) && id instanceof ObjectId) {
    return id;
  } else {
    return ObjectId.createFromHexString(id);
  }
}