var OPERATIONS = {
  'add': function(a, b) { return a + b },
  'subtract': function(a, b) { return a - b },
  'multiply': function(a, b) { return a * b },
  'divide': function(a , b) { return a / b }
}

var Calculator = Ember.Object.extend({
  firstOperand: null,
  secondOperand: null,
  operation: null,
  currentNumber: null,
  status: null,

  display: function() {
    return this.get('currentNumber')
  }.property('currentNumber'),

  calculate: function(operation, first, second) {
    return OPERATIONS[operation](first, second)
  }
});

export default Calculator;