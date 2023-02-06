const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const userRoutes = require('./routes/UserRoutes')

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://user1:789123@cluster0.twhgrzf.mongodb.net/blog?retryWrites=true&w=majority')
.then(() => console.log('db created'))

app.use('/api/user', userRoutes)
app.listen(5000, console.log('server started'))