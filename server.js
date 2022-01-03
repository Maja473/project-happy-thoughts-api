import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/happyThoughts"
mongoose.connect(mongoUrl, { useNewUrlParser: true, useUnifiedTopology: true })
mongoose.Promise = Promise

// Defines the port the app will run on. Defaults to 8080, but can be 
// overridden when starting the server. For example:
//
//   PORT=9000 npm start
const port = process.env.PORT || 8080
const app = express()

const MemberSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    enum: ['Karin', 'John', 'Lisa', 'Hans']
  },
  description: {
    type: String,
    minlength: 5,
    maxlength: 20,
    trim: true,
  },

  score: {
    type: Number, 
    default: 0,
  },
  createdAt: {
   type: Number,
   default: () => Date.now(),
  },
})

const Member = mongoose.model('Member', {

})

// Add middlewares to enable cors and json body parsing
app.use(cors())
app.use(express.json())

// Start defining your routes here
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.post ('/members', async (req, res) => {
  const {name, description } = req.body


try {
  const newMember = await new Member({name, description}).save()
} catch {

}
})

// Start the server
app.listen(port, () => {
  // eslint-disable-next-line
  console.log(`Server running on http://localhost:${port}`)
})
