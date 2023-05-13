const express = require('express')
const bodyParser = require('body-parser')
const studentRouter = require('./routes/student.routes')
const port = process.env.PORT || 8080;
 
const app = express()
app.use(express.json())
//app.use(bodyParser.json())
//app.use(bodyParser.urlencoder({extended: true}))
app.use('/api', studentRouter)

app.listen(port, ()=>{
    console.log('Express web app on http://localhost:%s', port)
})
