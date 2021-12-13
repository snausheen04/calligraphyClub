import chai from 'chai';
const assert = chai.assert;
const expect = chai.expect;

// Chai assert
describe('Array via Assert Style', function() {
    const numbers = [1, 2, 3, 4, 5];
    it('is array of numbers', function() {
        assert.isArray(numbers, 'is array of numbers');
    });
    it('array contains 2', function() {
        assert.include(numbers, 2, 'array contains 2');
    });
    it('array contains 5 numbers', function() {
        assert.lengthOf(numbers, 5, 'array contains 5 numbers');
    });
});
    
// Expect style from Chai
describe('Array tests via Expect style', function() {
    const numbers = [1, 2, 3, 4, 5];
    it('A test with multiple assertions', function() {
        expect(numbers).to.be.an('array').that.includes(3);
        expect(numbers).to.have.lengthOf(5);
    });
});