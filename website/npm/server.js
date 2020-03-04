const express = require('express')
const app = express()

// app.get('/', function(req, res) {
//   res.sendFile(__dirname + '/index.html')
// })

// app.get('/findastation.html', function(req, res) {
//   res.sendFile(__dirname + '/findastation.html')
// })

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

staticServe = express.static(`${__dirname}/`)

app.use('/', staticServe)
app.use('*', staticServe)
