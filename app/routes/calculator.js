import Calculator from 'appkit/models/calculator';

var CalculatorRoute = Ember.Route.extend({
  model: function(){
    return Calculator.create({
      result: '',
      status: 'first'
    })
  },

  actions: {
    operate: function(operation) {
      var result = this.controller.get('result');
      if (this.controller.get('status') === 'first') {
        this.controller.set('firstOperand', result);
        this.controller.set('operation', operation);
        this.controller.set('status', 'second');
        this.controller.set('result', '');
      }
    },
    equals: function() {
      var result = this.controller.get('result');
      this.controller.set('secondOperand', result);
      var first = parseInt(this.controller.get('firstOperand'));
      var second = parseInt(this.controller.get('secondOperand'));
      if (this.controller.get('operation') === 'add') {
        this.controller.set('result', first + second);
      } else if (this.controller.get('operation') === 'subtract') {
        this.controller.set('result', first - second);
      } else if (this.controller.get('operation') === 'multiply') {
        this.controller.set('result', first * second);
      } else {
        this.controller.set('result', first / second);
      }
      this.controller.set('status', 'first');
    },
    show: function(number) {
      var result = this.controller.get('result');
      this.controller.set('result', result += number);
    },
    clear: function() {
      this.controller.set('status', 'first');
      this.controller.set('result', '');
    }
  }
});

export default CalculatorRoute;