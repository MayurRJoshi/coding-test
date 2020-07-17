/**
 * Transform controller
 */

const transformService = require('../service/transformService')

async function transform (req, res) {
  res.json(await transformService.transform(req.body))
}

module.exports = {
  transform
}
