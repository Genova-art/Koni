require('dotenv').config()
const express = require('express')
const cors = require('cors')
const sequelize = require('./config/db')
const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')

const app = express()

// 🔹 Middleware
app.use(cors({
    origin: true,
    credentials: true
}))

app.use(express.json()) // ✅ ganti dari bodyParser

// 🔹 Routes
app.use('/api', userRoutes)
app.use('/api', authRoutes)

// 🔹 Jalankan server + koneksi DB
sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database connected ✅')
        app.listen(5000, () => console.log('Server started on port 5000'))
    })
    .catch((err) => {
        console.error('Database error:', err)
    })