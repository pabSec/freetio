const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

interface newsModel {
  [index: number]:{
    title: String,
    description: String,
    link: String,
    tags: String[],
    avatar: String,
    thumbnail: String,
    created: Date
  }
}

export class MainController {
  $http;
  news : newsModel;

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
  }

  $onInit() {
    this.$http.get('/api/news')
    .then(res => {
      this.news = res.data;
    })
    .catch(err => console.log(err));
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
