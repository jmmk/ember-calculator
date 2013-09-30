define("appkit/app",
  ["resolver","appkit/utils/register_components"],
  function(Resolver, registerComponents) {
    "use strict";

    var App = Ember.Application.extend({
      LOG_MODULE_RESOLVER: true,
      LOG_ACTIVE_GENERATION: true,
      LOG_VIEW_LOOKUPS: true,
      modulePrefix: 'appkit', // TODO: loaded via config
      Resolver: Resolver
    });

    App.initializer({
      name: 'Register Components',
      initialize: function(container, application) {
        registerComponents(container);
      }
    });



    return App;
  });
define("appkit/models/calculator",
  [],
  function() {
    "use strict";
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

    return Calculator;
  });
define("appkit/router",
  [],
  function() {
    "use strict";
    var Router = Ember.Router.extend(); // ensure we don't share routes between all Router instances

    Router.map(function(){
      this.route('calculator');
    });


    return Router;
  });
define("appkit/routes/calculator",
  ["appkit/models/calculator"],
  function(Calculator) {
    "use strict";

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

    return CalculatorRoute;
  });
define("appkit/routes/index",
  [],
  function() {
    "use strict";
    var IndexRoute = Ember.Route.extend({
      redirect: function() {
        this.transitionTo('calculator')
      }
    });


    return IndexRoute;
  });
define("appkit/utils/register_components",
  [],
  function() {
    "use strict";
    /* global requirejs */
    /* global require */

    function registerComponents(container) {
      var seen = requirejs._eak_seen;
      var templates = seen, match;
      if (!templates) { return; }

      for (var prop in templates) {
        if (match = prop.match(/templates\/components\/(.*)$/)) {
          require(prop, null, null, true);
          registerComponent(container, match[1]);
        }
      }
    }


    function registerComponent(container, name) {
      Ember.assert("You provided a template named 'components/" + name + "', but custom components must include a '-'", name.match(/-/));

      var fullName         = 'component:' + name,
          templateFullName = 'template:components/' + name;

      container.injection(fullName, 'layout', templateFullName);

      var Component = container.lookupFactory(fullName);

      if (!Component) {
        container.register(fullName, Ember.Component);
        Component = container.lookupFactory(fullName);
      }

      Ember.Handlebars.helper(name, Component);
    }


    return registerComponents;
  });
//@ sourceMappingURL=app.js.map