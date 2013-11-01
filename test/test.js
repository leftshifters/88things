var assert = require('assert');
var Invoice = require('../lib/invoice');

describe('Invoice', function() {
  describe('instance', function() {
    var id;
    var invoice = new Invoice({ number: 'BB-001' });
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

    it('store invoice', function(done) {
      invoice.save(function(err, invoice) {
        id = invoice._id;
        done();
      });
    });

    it('fetch invoice', function(done) {
      Invoice.getById(id, function(err, invoice) {
        if (err) return done(err);
        assert.equal(invoice._id.toString(), id);
        done();
      });
    });

    it('validate', function() {
      var result = invoice.validate();
      assert.strictEqual(result.valid, true);
      assert.strictEqual(result.reasons.length, 0);
    });

  });
});