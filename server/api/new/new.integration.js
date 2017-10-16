'use strict';

/* globals describe, expect, it, beforeEach, afterEach */

var app = require('../..');
import request from 'supertest';

var newNew;

describe('New API:', function() {
  describe('GET /api/news', function() {
    var news;

    beforeEach(function(done) {
      request(app)
        .get('/api/news')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          news = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(news).to.be.instanceOf(Array);
    });
  });

  describe('POST /api/news', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/news')
        .send({
          name: 'New New',
          info: 'This is the brand new new!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          newNew = res.body;
          done();
        });
    });

    it('should respond with the newly created new', function() {
      expect(newNew.name).to.equal('New New');
      expect(newNew.info).to.equal('This is the brand new new!!!');
    });
  });

  describe('GET /api/news/:id', function() {
    var new;

    beforeEach(function(done) {
      request(app)
        .get(`/api/news/${newNew._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          new = res.body;
          done();
        });
    });

    afterEach(function() {
      new = {};
    });

    it('should respond with the requested new', function() {
      expect(new.name).to.equal('New New');
      expect(new.info).to.equal('This is the brand new new!!!');
    });
  });

  describe('PUT /api/news/:id', function() {
    var updatedNew;

    beforeEach(function(done) {
      request(app)
        .put(`/api/news/${newNew._id}`)
        .send({
          name: 'Updated New',
          info: 'This is the updated new!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          updatedNew = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedNew = {};
    });

    it('should respond with the updated new', function() {
      expect(updatedNew.name).to.equal('Updated New');
      expect(updatedNew.info).to.equal('This is the updated new!!!');
    });

    it('should respond with the updated new on a subsequent GET', function(done) {
      request(app)
        .get(`/api/news/${newNew._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if(err) {
            return done(err);
          }
          let new = res.body;

          expect(new.name).to.equal('Updated New');
          expect(new.info).to.equal('This is the updated new!!!');

          done();
        });
    });
  });

  describe('PATCH /api/news/:id', function() {
    var patchedNew;

    beforeEach(function(done) {
      request(app)
        .patch(`/api/news/${newNew._id}`)
        .send([
          { op: 'replace', path: '/name', value: 'Patched New' },
          { op: 'replace', path: '/info', value: 'This is the patched new!!!' }
        ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if(err) {
            return done(err);
          }
          patchedNew = res.body;
          done();
        });
    });

    afterEach(function() {
      patchedNew = {};
    });

    it('should respond with the patched new', function() {
      expect(patchedNew.name).to.equal('Patched New');
      expect(patchedNew.info).to.equal('This is the patched new!!!');
    });
  });

  describe('DELETE /api/news/:id', function() {
    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete(`/api/news/${newNew._id}`)
        .expect(204)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when new does not exist', function(done) {
      request(app)
        .delete(`/api/news/${newNew._id}`)
        .expect(404)
        .end(err => {
          if(err) {
            return done(err);
          }
          done();
        });
    });
  });
});
