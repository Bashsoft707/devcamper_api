const express = require("express")
const dotenv = require("dotenv")
const morgan = require('morgan')
const path = require('path')
const fileUpload = require('express-fileupload')
const connectDB = require('./config/db')
const errorHandler = require('./middleware/error')

// Load env files
dotenv.config({ path: './config/config.env' })

// connect database
connectDB()

// Route files
const bootcamps = require('./routes/bootcamps')
const courses = require('./routes/courses')

const app = express()

//Body parsing
app.use(express.json())

// Dev logging middleware 
if (process.env.NODE_ENV === 'development'){
    app.use(morgan('dev'))
}

// File uploading 
app.use(fileUpload())

// set static folder
app.use(express.static(path.join(__dirname, 'public')))

// Mount routers
app.use('/api/v1/bootcamps', bootcamps)
app.use('/api/v1/courses', courses)

app.use(errorHandler)

const PORT = process.eventNames.PORT || 5000

const server = app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on ${PORT}`))

// handling promise rejection
process.on('unhandledRejection', (err, promise) => {
    console.log(`Error: ${err.message}`);
    // close server
    server.close(() => process.exit(1))
})