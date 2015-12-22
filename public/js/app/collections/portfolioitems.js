import Backbone from 'backbone';
import PortfolioItem from './../models/portfolioitem';

export default Backbone.Collection.extend({

  comparator: function(a, b) {
    a = a.get('sortOrder');
    b = b.get('sortOrder');

    return a > b ?  1 : a < b ? -1 : 0;
  },

  model: PortfolioItem,

});
