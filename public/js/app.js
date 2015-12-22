// import $ from 'jquery';
import Backbone from 'backbone';

require('bootstrap-webpack!./bootstrap.config.js');

import Router from './app/router';

const router = new Router();

if (!router) {
  console.log('Failed to initialize');
}

Backbone.history.start({pushState: true});
