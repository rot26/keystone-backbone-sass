import Backbone from 'backbone';

export default Backbone.Model.extend({

  urlRoot: '/api/portfolioitems',

  idAttribute: 'slug'
});
