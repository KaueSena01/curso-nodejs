const express = require('express')
const cors = require('cors')

const app = express()

const User = require('./models/User')

// Solve CORS
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }))

// Public folder for images
app.use(express.static('public'))

// Routes
const UserRoutes = require('./routes/UserRoutes')

// Congig JSON response
app.use(express.json())
app.use('/users', UserRoutes)

app.listen(5000)