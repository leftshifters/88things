var assert = require('assert');
var Invoice = require('../lib/invoice');

describe('Invoice', function() {
  describe('instance', function() {
    var invoice = new Invoice();
    var invoiceData = invoice.toData();

    it('default properties', function() {
      assert.strictEqual(typeof invoiceData.number, 'string');
      assert.strictEqual(invoiceData.date, 0);
      assert.strictEqual(invoiceData.dueDate, 0);
      assert.strictEqual(invoiceData.sentDate, 0);
      assert.strictEqual(invoiceData.paid, false);
      assert.strictEqual(invoiceData.notPaying, false);
      assert.strictEqual(invoiceData.sent, false);
      assert.strictEqual(Array.isArray(invoiceData.details), true);
      assert.strictEqual(invoiceData.subtotal, 0);
      assert.strictEqual(invoiceData.discount, null);
      assert.strictEqual(Array.isArray(invoiceData.taxes), true);
      assert.strictEqual(typeof invoiceData.currency, 'string');
      assert.strictEqual(invoiceData.grandtotal, 0);
      assert.strictEqual(typeof invoiceData.paymentInstruction, 'string');
    });


  });
});