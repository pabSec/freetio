const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

export class MainController {

  /*@ngInject*/
  constructor() {

  }

  $onInit() {
    
  }
}

export default angular.module('freetioApp.main', [
  uiRouter])
    .config(routing)
    .component('main', {
      template: require('./main.html'),
      controller: MainController
    })
    .name;
