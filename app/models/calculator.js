var Calculator = Ember.Object.extend({
  firstOperand: null,
  secondOperand: null,
  operation: null,
  result: null,
  status: null,

  display: function() {
    return this.get('result')
  }.property('result')
});

export default Calculator;