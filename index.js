const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.static('build'))

res.redirect('https://' + req.headers.host + req.url);


app.get('/*', function(req, res) {
    res.sendfile('./build/index.html');
});


const PORT = process.env.PORT || 3001
console.log(PORT)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})