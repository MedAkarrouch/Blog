const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

const authRouter = require('./routes/authRouters')
const userRouter = require('./routes/userRoutes')
const postRouter = require('./routes/postRoutes')
const commentRouter = require('./routes/commentRoutes')
const likeRouter = require('./routes/likeRoutes')
const readingListRouter = require('./routes/readingListRoutes')

const app = express()

app.use(express.json())
// app.use(
//   cors({
//     origin: 'http://localhost:5173',
//     credentials: true,
//     optionSuccessStatus: 200,
//     Headers: true,
//     exposedHeaders: 'Set-Cookie',
//     methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
//     allowedHeaders: [
//       'Access-Control-Allow-Origin',
//       'Content-Type',
//       'Authorization',
//     ],
//   })
// );
app.use(
  cors({
    // origin: ['http://localhost:5173'],
    origin: ['https://loor.netlify.app'],
    credentials: true,
    sameSite: 'none',
  })
)
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
