const mongoose = require('mongoose')
const dotenv = require('dotenv')
const app = require('./app')

dotenv.config()
// NEW

// NEW

// const DB = process.env.DATABASE.replace('<password>', process.env.PASSWORD);
// console.log('** ', process.env.DB)
mongoose
  .connect(process.env.DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB connection successful!'))
  .catch((err) => console.log(err))

const port = process.env.PORT || 3000
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
