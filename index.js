const express = require('express')
const app = express()
const cors = require('cors')

app.use(cors())

app.use(express.static('build'))

if(process.env.NODE_ENV === 'production') {
  app.get('/*',function(req,res,next){
    if(req.headers['x-forwarded-proto']!='https')
      res.redirect('https://surveyapp-front.herokuapp.com'+req.url)
    else
      next() /* Continue to other routes if we're not redirecting */
  })
}



app.get('/*', function(req, res) {
    res.sendfile('./build/index.html');
});


const PORT = process.env.PORT || 3001
console.log(PORT)


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})