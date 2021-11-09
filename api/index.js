const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const movieRoute = require('./routes/movies')
const listRoute = require('./routes/lists')
var cors = require('cors')


dotenv.config()



mongoose.connect(process.env.MONGO_URL, {})
    .then(() => console.log('db connection successfull!'))
    .catch(error => console.log(error))

app.use(cors())
app.use(express.json())
app.use('/api/auth', authRoute)
app.use('/api/users', userRoute)
app.use('/api/movies', movieRoute)
app.use('/api/lists', listRoute)


app.listen(8800, () => {
    console.log("backend running")
})