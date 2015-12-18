var Server = require('../lib/server')
var assert = require('assert')

describe('When Server.init is called at a given port', function() {
  var PORT = 9000

  beforeEach(function(done) {
    this.server = Server.init(PORT, done)
  })

  afterEach(function(done) {
    this.server.stop(done)
  })

  it ('creates a server at a given port', function () {
    assert.equal(this.server.info.port, PORT)
  })

  it ('serves the version of the project at /version', function (done) {
    // server.inject comes from the Shot testing library
    // https://github.com/hapijs/shot
    this.server.inject('/version', function(response) {
      assert.equal(response.statusCode, 200)
      assert.deepEqual(response.result, Server.metadata)
      done()
    })
  })

  context('when another server is created at that port', function() {

    it ('returns an address in use error', function(done) {
      Server.init(PORT, function(error, server) {
        assert.equal(error.code, 'EADDRINUSE')
        server.stop(done)
      })
    })

  })

})
