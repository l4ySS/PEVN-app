const express = require('express')
const cors = require('cors')
const studentRouter = require('./routes/student.router.js')

const port = process.env.PORT || 8082;
 
const app = express()
app.use(express.json())
app.use(cors({ origin: true}))
app.use('/api', studentRouter)

app.listen(port, ()=>{
    console.log('Express web app on http://localhost:%s', port)
})

