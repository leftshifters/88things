
module.exports = Invoice;

function Invoice(data) {
  this.defaults.details.push(this.defaultItem);
  return this.defaults;
}

Invoice.prototype.defaultItem = {
  description: '',
  rate: 0,
  items: 0,
  total: 0
};

Invoice.prototype.defaults = {
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