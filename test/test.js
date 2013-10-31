var assert = require('assert');
var Invoice = require('../lib/invoice');

describe('Invoice', function() {
  describe('instance', function() {
    var invoice = new Invoice().toData();

    it('default properties', function() {
      assert.strictEqual(typeof invoice.number, 'string');
      assert.strictEqual(invoice.date, 0);
      assert.strictEqual(invoice.dueDate, 0);
      assert.strictEqual(invoice.sentDate, 0);
      assert.strictEqual(invoice.paid, false);
      assert.strictEqual(invoice.notPaying, false);
      assert.strictEqual(invoice.sent, false);
      assert.strictEqual(Array.isArray(invoice.details), true);
      assert.strictEqual(invoice.subtotal, 0);
      assert.strictEqual(invoice.discount, null);
      assert.strictEqual(Array.isArray(invoice.taxes), true);
      assert.strictEqual(typeof invoice.currency, 'string');
      assert.strictEqual(invoice.grandtotal, 0);
      assert.strictEqual(typeof invoice.paymentInstruction, 'string');
    });

  });
});