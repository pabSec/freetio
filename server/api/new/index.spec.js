'use strict';

/* globals sinon, describe, expect, it */

var proxyquire = require('proxyquire').noPreserveCache();

var newCtrlStub = {
  index: 'newCtrl.index',
  show: 'newCtrl.show',
  create: 'newCtrl.create',
  upsert: 'newCtrl.upsert',
  patch: 'newCtrl.patch',
  destroy: 'newCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var newIndex = proxyquire('./index.js', {
  express: {
    Router() {
      return routerStub;
    }
  },
  './new.controller': newCtrlStub
});

describe('New API Router:', function() {
  it('should return an express router instance', function() {
    expect(newIndex).to.equal(routerStub);
  });

  describe('GET /api/news', function() {
    it('should route to new.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'newCtrl.index')
        ).to.have.been.calledOnce;
    });
  });

  describe('GET /api/news/:id', function() {
    it('should route to new.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'newCtrl.show')
        ).to.have.been.calledOnce;
    });
  });

  describe('POST /api/news', function() {
    it('should route to new.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'newCtrl.create')
        ).to.have.been.calledOnce;
    });
  });

  describe('PUT /api/news/:id', function() {
    it('should route to new.controller.upsert', function() {
      expect(routerStub.put
        .withArgs('/:id', 'newCtrl.upsert')
        ).to.have.been.calledOnce;
    });
  });

  describe('PATCH /api/news/:id', function() {
    it('should route to new.controller.patch', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'newCtrl.patch')
        ).to.have.been.calledOnce;
    });
  });

  describe('DELETE /api/news/:id', function() {
    it('should route to new.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'newCtrl.destroy')
        ).to.have.been.calledOnce;
    });
  });
});
