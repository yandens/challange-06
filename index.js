require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes')

//const port = 3000

app.use(express.json())
app.use(router)

app.get('/', (req, res) => {
  res.status(200).json({
    status: true,
    message: 'succes load default page'
  })
})

// 404 handler
app.use((req, res, next) => {
  res.status(404).json({
    status: false,
    message: 'are u lost?'
  })
})

// 500 handler
app.use((err, req, res, next) => {
  //console.log(err)
  res.status(500).json({
    status: false,
    message: err.message
  })
})

/*app.listen(port, () => {
  console.log('listening on http://localhost:3000')
})*/

module.exports = app
