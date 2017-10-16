'use strict';

interface newsModel {
  title: String,
  description: String,
  link: String,
  tags: String[],
  avatar: String,
  thumbnail: String
}

export default class AdminController {
  users: Object[];
  $http;
  theNew: newsModel = {
    title: '',
    description: '',
    link: '',
    tags: [],
    avatar: 'https://media.licdn.com/mpr/mpr/shrinknp_200_200/AAEAAQAAAAAAAAQBAAAAJDRmYzEyMGM1LTE4ZmItNDA3Ny04M2MzLWUzM2I5OGE0N2IyNQ.jpg',
    thumbnail: ''
  };
  $state;

  /*@ngInject*/
  constructor(User, $http, $state) {
    // Use the User $resource to fetch all users
    this.users = User.query();
    this.$http = $http;
    this.$state = $state;
  }

  delete(user) {
    user.$remove();
    this.users.splice(this.users.indexOf(user), 1);
  }

  addTag(tag) {
    console.log(tag);
    this.theNew.tags.push(tag);
  }

  createNew() {
    this.$http.post('/api/news', this.theNew)
    .then(resp => {
      console.log(resp);
      this.$state.reload();
    })
    .catch(err => console.log(err));
  }

}
