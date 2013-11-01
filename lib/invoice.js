/**
 * Module Dependencies
 */
var _ = require('underscore');
var store = require('./store');
var ensureObjectId = require('./store').ensureObjectId;

/**
 * Expose `Invoice`.
 */
module.exports = Invoice;

var defaults = {
  number: '',
  date: 0,
  dueDate: 0,
  sentDate: 0,
  paid: false,
  notPaying: false,
  sent: false,
  details: [],
  subtotal: 0,
  discount: null,
  taxes: [],
  currency: '',
  grandtotal: 0,
  paymentInstruction: ''
};

var defaultItem = {
  description: '',
  rate: 0,
  items: 0,
  total: 0
};

/**
 * Creates a new Invoice
 *
 * @constructor
 */
function Invoice(data) {
  data = data || {};
  this.attributes = _.defaults(data, defaults);
}

/**
 * Get invoice by id
 */
Invoice.getById = function(id, callback) {
  store.findOne('invoices', { _id: ensureObjectId(id) }, callback);
};

/**
 * Get serialized attributes object
 *
 * @return {Object} serialzed data
 * @api public
 */
Invoice.prototype.toData = function() {
  return this.attributes;
};

/**
 * Validate internal state
 *
 * @return {Object} Object with validation state & failure reasons
 * @api public
 */
Invoice.prototype.validate = function() {
  var d = this.toData();
  var reasons = [];
  var result = { valid: false, reasons: reasons };

  if (_.isEmpty(d.number)) reasons.push('Invoice number cannot be empty');

  if (!_.isString(d.number)) reasons.push('Invoice number should be string');

  if (!_.isString(d.currency)) reasons.push('Invoice currency should be string');

  if (!_.isString(d.paymentInstruction)) reasons.push('Invoice paymentInstruction should be string');

  if (!_.isNumber(d.date)) reasons.push('Invoice date is invalid');

  if (!_.isNumber(d.dueDate)) reasons.push('Invoice due date is invalid');

  if (!_.isNumber(d.sentDate)) reasons.push('Invoice sent date is invalid');

  if (!_.isBoolean(d.paid)) reasons.push('Invoice paid status is invalid');

  if (!_.isBoolean(d.notPaying)) reasons.push('Invoice not paying status is invalid');

  if (!_.isBoolean(d.sent)) reasons.push('Invoice sent status is invalid');

  if (!_.isNumber(d.subtotal)) reasons.push('Invoice subtotal is invalid');

  if (!_.isNumber(d.grandtotal)) reasons.push('Invoice grandtotal is invalid');

  if (d.subtotal < 0) reasons.push('Invoice subtotal cannot be less than zero');

  if (d.grandtotal < 0) reasons.push('Invoice grandtotal cannot be less than zero');

  result.valid = !result.reasons.length;
  return result;
};

/**
 * Persist to permanent storage
 *
 * @param {Function} callback post save
 * @callback save callback
 * @api public
 */
Invoice.prototype.save = function(callback) {
  store.save('invoices', this.toData(), callback);
};

function createId(callback) {
  store.find('invoices', {}, {}, {}, function(err, cursor) {
    cursor.count(function(err, total) {
      if (err) return callback(err);
      total = total || 0;
      console.log(total);
    });
  });
}

createId();