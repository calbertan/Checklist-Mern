const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://127.0.0.1:27017/checklist-mern", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to DB"))
.catch(console.error)

const Checklist = require('./models/checklist')

//if a request is made to 3001/checklists, find checklists using  model
app.get('/checklists', async (req, res) => {
  const checklists = await Checklist.find()

  res.json(checklists)
})

app.post('/checklist/new', (req, res) => {
  const item = new Checklist({
    text: req.body.text
  })

  item.save()
  res.json(item)
})

app.delete('/checklist/delete/:id', async (req, res) => {
  const result = await Checklist.findByIdAndDelete(req.params.id)

  res.json(result)
})

app.get('/checklist/complete/:id', async(req, res) => {
  const item = await Checklist.findById(req.params.id)

  item.complete = !item.complete
  item.save()
  res.json(item)
})

app.listen(3001, () => console.log("Server started on port 3001"))