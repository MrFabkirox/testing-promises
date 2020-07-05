const log = console.log;
const _ = require('lodash')
const should = require('chai').should();
const expect = require('chai').expect;
const chaiAsPromised = require('chai-as-promised')
const chai = require('chai')
chai.use(chaiAsPromised)

const {
  readCow
} = require('./index')

describe('#index', () => {

  describe('#readCow', () => {
    it('should work', (done) => {
      readCow((error, contents) => {
        contents.should.equal('yo')
        done()
      })
    })
    it('should not have an error', (done) => {
      // cant should on smthg that don t exist so chai expect used
      readCow((error, contents) => {
        expect(error).to.not.exist;
        done()
      })
    })
  })
})

describe('#Promises', () => {
  let maybe;
  beforeEach(() => {
    maybe = () => Promise.resolve('yo')
  })
  it('should be an Object', () => {
    const result = maybe();
    _.isObject(result).should.be.true
  })
  it('should work', (done) => {

    const result = maybe();
    result
      .then((data) => {
        // done with no parameters, we good !
        done()
      })
      .catch((error) => {
        // or we not good !
        done(error)

      })
  })
  it('should work', (done) => {

    const result = maybe();
    result
      .then((data) => {
        // done with no parameters, we good !
        done()
      })
  })
  it('should work one line test returned promisses', () => maybe())

  it('should work and return data', (done) => {
    const result = maybe();
    result
      .then((data) => {

        // throw new Error('boom'); // --> to see the tdst failing
        data.should.equal('yo');
        done();
      })
      .catch(done);
  })
})
const promiseShouldFailAtLife = (p) => {
  return new Promise((success, failure) => {
    p
      .then(() => {
        failure(new Error('should have failed, brah'))
      })
      .catch(() => {
        success()
      })
  })
}
describe('#Maybe Not', () => {
  it('should work', () => {
    return Promise.resolve();
  })
  it('should fail', (done) => {
    const result = Promise.reject();
    result
      .then(() => {
        // mocha promises return done with arg reject successfully tested
        done(new Error('Should have failed'))
      })
      .catch(() => {
        done()
      })
  })
  it('should fail predicate', () => {
    return promiseShouldFailAtLife(Promise.reject())
  })
})

describe.only('#as promised', () => {
  it('should work one', () => {
    return Promise.resolve().should.be.fulfilled;
  })
  it('as promised Many', () => {
    return Promise.all([
      Promise.resolve(true),
      Promise.resolve(1),
      Promise.resolve({ cow: 'moo' }),
      Promise.resolve(),
    ]).should.be.fulfilled;
  })
  it('should fail', () => {
    return Promise.reject().should.be.rejected;
  })
  it('1 + 1 should equal 2', () => {
    (1 + 1).should.equal(2);
  })
  it('1 + 1 should equal 2 with promisses too', () => {
    // if no return or no done callback mocha will always be wrongly green
    return Promise.resolve(1 + 1).should.eventually.equal(2);
  })
})