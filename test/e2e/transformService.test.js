const chai = require('chai')
const chaiHttp = require('chai-http')
const httpStatus = require('http-status')
const app = require('../../index')

chai.use(chaiHttp)
const expect = chai.expect

const transformServiceData = require('../data/transformServiceData')

describe('Transform service e2e tests', () => {
  describe('POST /transform', () => {
    it('should return status bad request as input does not contain payload', async () => {
      const res = await chai.request(app)
        .post('/transform')
        .send(transformServiceData.noPayload)
      expect(res).to.have.status(httpStatus.BAD_REQUEST)
      expect(res.text).eq(transformServiceData.errorMessages.noPayload)
    })

    it('should return status bad request as input does not contain referenceData', async () => {
      const res = await chai.request(app)
        .post('/transform')
        .send(transformServiceData.noReferenceData)
      expect(res).to.have.status(httpStatus.BAD_REQUEST)
      expect(res.text).eq(transformServiceData.errorMessages.noReferenceData)
    })

    it('should transform data successfully', async () => {
      const res = await chai.request(app)
        .post('/transform')
        .send(transformServiceData.valid.input)
      expect(res).to.have.status(httpStatus.OK)
      expect(res.body).eql(transformServiceData.valid.output)
    })
  })
})
