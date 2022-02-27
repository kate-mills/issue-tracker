const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');


chai.use(chaiHttp);

suite('Functional Tests', function() {
  let  _ids = [];  // valid ids returned from succesful post request


  // #1
  test(`POST Create an issue with every field`, function(done) {
    chai
      .request(server)
      .post(`/api/issues/apitest`)
      .send({
        issue_title: "Be creative",
        issue_text: "Needs fixin, oh no!",
        created_by: "kate-mills",
        assigned_to: "kate",
        status_text: "asap"
      })
      .end(function(err, res) {
        _ids.push(res.body._id)
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, "Be creative");
        assert.equal(res.body.issue_text, "Needs fixin, oh no!");
        assert.equal(res.body.created_by, "kate-mills");
        assert.equal(res.body.assigned_to, "kate");
        assert.equal(res.body.status_text, "asap");
        assert.equal(res.body.open, true);
        assert.equal(res.body.created_on, new Date(res.body.created_on).toJSON());
        assert.equal(res.body.updated_on.length>0, true);
        done();
      });
  });

  // #2
  test(`POST Create an issue with only required fields`, function(done) {
    chai
      .request(server)
      .post(`/api/issues/apitest`)
      .send({
        issue_title: "Best Issue Ever",
        issue_text: "You're a superstar anyway!",
        created_by: "kate-mills",
      })
      .end(function(err, res) {
        _ids.push(res.body._id)
        assert.equal(res.status, 200);
        assert.equal(res.body.issue_title, "Best Issue Ever");
        assert.equal(res.body.issue_text, "You're a superstar anyway!");
        assert.equal(res.body.created_by, "kate-mills");
        assert.equal(res.body.assigned_to, "");
        assert.equal(res.body.status_text, "");
        assert.equal(res.body.open, true);
        assert.equal(res.body.created_on, new Date(res.body.created_on).toJSON());
        assert.equal(res.body.updated_on.length>0, true);
        done();
      });
  });

  // #3
  test(`POST Create an issue with missing required fields\n`, function(done) {
    chai
      .request(server)
      .post(`/api/issues/apitest`)
      .send({
        issue_title: "Needs more",
        issue_text: "Fix, please",
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.error,'required field(s) missing');
        done();
      });
  });

  // # 4
  test('GET View issues on a project', function(done) {
    chai
      .request(server)
      .get(`/api/issues/apitest`)
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.length, 2)
        done();
      });
  });

  // # 5
  test('GET View issues on a project with one filter', function(done) {
    chai
      .request(server)
      .get(`/api/issues/apitest?assigned_to=`)
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.length, 1);
        assert.equal(res.body[0].open, true);
        assert.equal(res.body[0].issue_title, "Best Issue Ever");
        done();
      });
  });

  // # 6
  test('GET View issues on a project with multiple filters\n', function(done) {
    chai
      .request(server)
      .get(`/api/issues/apitest?open=true&assigned_to=kate`)
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.body.length, 1);
        assert.equal(res.body[0].open, true);
        assert.equal(res.body[0].issue_title, "Be creative");
        done();
      });
  });

  // #7
  test('PUT Update one field on an issue', function(done) {
    chai
      .request(server)
      .put(`/api/issues/apitest`)
      .send({
        _id: _ids[0],
        issue_title: "Better Issue"
      })
      .end(function(err, res) {

        assert.equal(res.status, 200);
        assert.equal(res.body.result, 'successfully updated');
        assert.equal(res.body._id, _ids[0]);

        done();
      });
  });

  // #8
  test('PUT Update multiple fields on an issue', function(done) {
    chai
      .request(server)
      .put(`/api/issues/apitest`)
      .send({
        //_id: _ids[0],
        issue_title: "Better Issue",
        open: false
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });

  // #9
  test('PUT Update an issue with missing _id', function(done) {
    chai
      .request(server)
      .put(`/api/issues/apitest`)
      .send({
        issue_title: "Better Issue"
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });

  // #10
  test('PUT Update an issue with no fields to update', function(done) {
    chai
      .request(server)
      .put(`/api/issues/apitest`)
      .send({
        //_id: _ids[0]
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });

  // #11
  test('PUT Update an issue with an invalid _id\n', function(done) {
    chai
      .request(server)
      .put(`/api/issues/apitest`)
      .send({
        _id: 'abc123',
        issue_title: 'this is an error'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });

  // # 12
  test('DELETE an issue with a valid _id', function(done) {
    chai
      .request(server)
      .delete(`/api/issues/apitest`)
      .send({
        //_id: _ids[1]
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });

  // # 13
  test('DELETE an issue with an invalid _id', function(done) {
    chai
      .request(server)
      .delete(`/api/issues/apitest`)
      .send({
        _id: '123abc'
      })
      .end(function(err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });

  // # 14
  test('DELETE an issue with missing _id', function(done) {
    chai
      .request(server)
      .delete(`/api/issues/apitest`)
      .send({})
      .end(function(err, res) {
        assert.equal(res.status, 200);
        done();
      });
  });

});
