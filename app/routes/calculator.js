import Calculator from 'appkit/models/calculator';

var CalculatorRoute = Ember.Route.extend({
  model: function(){
    return Calculator.create({
      currentNumber: '',
      status: 'first'
    })
  },

  actions: {
    operate: function(operation) {
      var number = this.controller.get('currentNumber');
      if (this.controller.get('status') === 'first') {
        this.controller.setProperties({'firstOperand': number,
          'operation': operation, 'status': 'transition'});
      }
    },
    equals: function() {
      var number = this.controller.get('currentNumber');
      this.controller.set('secondOperand', number);
      var first = parseInt(this.controller.get('firstOperand'));
      var second = parseInt(this.controller.get('secondOperand'));
      var operation = this.controller.get('operation')
      var result = this.controller.get('model').calculate(operation, first, second)
      this.controller.setProperties({'currentNumber': result, 'status': 'first'});
    },
    show: function(newNumber) {
      if (this.controller.get('status') === 'transition') {
        this.controller.setProperties({'currentNumber': '', 'status': 'second'});
      }

      var number = this.controller.get('currentNumber');
      this.controller.set('currentNumber', number += newNumber);
    },
    clear: function() {
      this.controller.setProperties({'status': 'first', 'currentNumber': ''});
    }
  }
});

export default CalculatorRoute;