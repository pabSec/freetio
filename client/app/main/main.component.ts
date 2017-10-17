const angular = require('angular');
const uiRouter = require('angular-ui-router');
import routing from './main.routes';

export class MainController {
  $http;
  allNews;
  dates;

  /*@ngInject*/
  constructor($http) {
    this.$http = $http;
    this.allNews = [];
  }

  $onInit() {
    this.$http.get('/api/news')
    .then(res => {
      this.dates = []; 
      _.map(res.data, el => {
        if(!this.dates.includes(el['date'])) { 
          this.dates.push(el['date']) 
        }
      });

      this.dates.sort(function(a,b){
        return +new Date(a) - (+new Date(b));
      });
      
      res.data.forEach(element => {
        if(!this.allNews[element.date]) this.allNews[element.date] = [];
        this.allNews[element.date].push(element);
      });
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
