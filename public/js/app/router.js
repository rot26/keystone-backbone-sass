//Third Party Includes
import $ from 'jquery';
import _ from 'lodash';
import Backbone from 'backbone';

//Models
//import PortfolioItem from './models/portfolioitem';

//Collections
//import PortfolioItems from './collections/portfolioitems';

//Views
import HomeView from './views/home';

var el;
var cache = {
  views: {},
  collections: {},
  models: {}
};

export default Backbone.Router.extend({

  routes: {
    '': 'home',
    '*path':  'defaultRoute'
  },

  initialize: () => {

    el = $('#app');

    console.log('init');

  },

  home: () => {
    console.log('home');

    // var pages = cache.collections.pages;
    //
    // pages.initial.done(function () {
    //   var home = pages.get('');
    //
    //   var homeView = new HomeView({
    //     model: home,
    //     el: el
    //   });
    //
    //   homeView.render();
    //
    //   cache.views.VideoView.render();
    //
    // });
  },

  defaultRoute: () => {
    console.log('path');
  }

});
