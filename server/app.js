const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const mongoSanitize = require('express-mongo-sanitize')
const xss = require('xss-clean')

const authRouter = require('./routes/authRouters')
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const commentRouter = require('./routes/commentRoutes')
const likeRouter = require('./routes/likeRoutes')
const readingListRouter = require('./routes/readingListRoutes')

const app = express()
app.use(express.json())

// Data sanitization against NoSQL query injection
app.use(mongoSanitize())
// Data sanitization against xss
app.use(xss())

app.use(
  cors({
    // origin: ['http://localhost:5173'],
    origin: ['https://loor.netlify.app'],
    credentials: true,
    sameSite: 'none',
  })
)
// Allow credentials (cookies) to be sent
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Credentials', 'true')
  next()
})
// app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

app.use(cookieParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

app.use('/auth', authRouter)
app.use('/users', userRouter)
app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/likes', likeRouter)
app.use('/readingLists', readingListRouter)

module.exports = app
