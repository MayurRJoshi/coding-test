/**
 * Server
 */

const express = require('express')
const bodyParser = require('body-parser')
const httpStatus = require('http-status')
const routes = require('./src/routes')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()

// Hook up routes with controllers
Object.values(routes).forEach((route) => {
  for (const path in route) {
    const operations = route[path]
    for (const httpMethod in operations) {
      const handler = operations[httpMethod]
      const middlewares = []
      const controller = require(`./src/controller/${handler.controller}`)[handler.method]
      middlewares.push(controller)
      router[httpMethod](path, middlewares.map((middleware) =>
        // Wrap middleware functions with error handler
        async function errorHandlerMiddlewareWrapper (req, res, next) {
          try {
            await middleware(req, res, next)
          } catch (e) {
            next(e, req, res, next)
          }
        }
      ))
    }
  }
})

app.use('/', router)
app.use((err, req, res, next) => {
  // console.log(err)
  res.status(httpStatus.BAD_REQUEST).send(err.message || 'Bad request')
})

app.listen(3000, () => console.log('Listening'))

module.exports = app
