/**
 * Module Dependencies
 */
var _ = require('underscore');
var store = require('./store');

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
 * @return {Boolean} true/false
 * @api public
 */
Invoice.prototype.validate = function() {};

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

// var invoice = new Invoice();
// setTimeout(function() {
//   invoice.save();
// }, 3000);