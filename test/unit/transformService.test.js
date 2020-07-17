const chai = require('chai')
const expect = chai.expect

const transformServiceData = require('../data/transformServiceData')
const transformService = require('../../src/service/transformService')

describe('Transform service unit tests', () => {
  it('should throw an error as input does not contain payload', () => {
    expect(() => transformService.transform(transformServiceData.noPayload)).to.throw(transformServiceData.errorMessages.noPayload)
  })

  it('should throw an error as input does not contain referenceData', () => {
    expect(() => transformService.transform(transformServiceData.noReferenceData)).to.throw(transformServiceData.errorMessages.noReferenceData)
  })

  it('should transform data with no errors', () => {
    expect(transformService.transform(transformServiceData.valid.input)).to.eql(transformServiceData.valid.output)
  })
})
