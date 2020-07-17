/**
 * Transform service
 */

const Joi = require('@hapi/joi')

/**
 * Transforms data by replacing references in data.payload with its values in data.referenceData
 * @param {Object} data
 */
function transform (data) {
  Joi.attempt(data, transform.schema)
  const references = data.referenceData
  const replacerRegex = new RegExp('{REF_.*?}', 'g')

  // Replace occurences of replacerRegex with the corresponding references
  const transformedPayload = JSON.stringify(data.payload).replace(replacerRegex, function replace (match) {
    return references[match.slice(1, -1)] // Remove the starting and closing {} from the match
  })

  return JSON.parse(transformedPayload)
}

transform.schema = Joi.object({
  payload: Joi.object().required(),
  referenceData: Joi.object().required()
})

module.exports = {
  transform
}
