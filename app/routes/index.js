var IndexRoute = Ember.Route.extend({
  redirect: function() {
    this.transitionTo('calculator')
  }
});

export default IndexRoute;
