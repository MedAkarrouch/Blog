import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster } from 'react-hot-toast'

import GlobalStyles from './styles/GlobalStyles'
import Spinner from './ui/Spinner'

// import AppLayout from './ui/AppLayout'
// import Header from './ui/Header'
// import Account from './pages/Account'

// const AppLayout = lazy(() => import('./ui/AppLayout'))
// const Home = lazy(() => import('./pages/Home'))
// const Post = lazy(() => import('./pages/Post'))
// const CreatePost = lazy(() => import('./pages/CreatePost'))
// const Signup = lazy(() => import('./pages/Signup'))
// const Login = lazy(() => import('./pages/Login'))
// const PageNotFound = lazy(() => import('./pages/PageNotFound'))
// const ProtectedRoute = lazy(() => import('./ui/ProtectedRoute'))
// // const PostsLayout = lazy(() => import('./pages/PostsLayout'))
// const Test = lazy(() => import('./pages/Test'))
// const Account = lazy(() => import('./pages/Account'))
// const Dashboard = lazy(() => import('./pages/Dashboard'))

import ProtectedRoute from './ui/ProtectedRoute'
import AppLayout from './ui/AppLayout'
import Home from './pages/Home'
import Post from './pages/Post'
import CreatePost from './pages/CreatePost'
import Signup from './pages/Signup'
import Login from './pages/Login'
import PageNotFound from './pages/PageNotFound'
import Test from './pages/Test'
import Account from './pages/Account'
import Dashboard from './pages/Dashboard'
import EditPost from './pages/EditPost'
import AddPost from './pages/AddPost'
import ReadingList from './pages/ReadingList'
import Test1 from './pages/Test1'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <Toaster
        gutter={15}
        containerStyle={{ margin: '0', zIndex: '100000' }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: '1.4rem',
            // padding: "1.6rem 2.4rem",
            padding: '1.6rem 1.4rem',
            maxWidth: '50rem',
            color: 'var(--color-grey-700)',
            minWidth: '25rem',
          },
        }}
      />
      <BrowserRouter>
        <Routes>
          {/* <Route element={<AppLayout />}> */}
          <Route index element={<Navigate replace to="/posts" />} />
          <Route path="/posts" element={<Home />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route element={<ProtectedRoute />}>
            <Route path="/account" element={<Account />} />
            <Route path="/dashboard" element={<Dashboard />} />
            {/* <Route path="/new" element={<CreatePost />} /> */}
            <Route path="/new" element={<AddPost />} />
            <Route path="/edit/:postId" element={<EditPost />} />
            <Route path="/readingList" element={<ReadingList />} />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/test" element={<Test />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}
// function App() {
//   return (
//     <QueryClientProvider client={queryClient}>
//       <ReactQueryDevtools initialIsOpen={false} />
//       <GlobalStyles />
//       <Toaster
//         gutter={15}
//         containerStyle={{ margin: '0', zIndex: '100000' }}
//         toastOptions={{
//           success: {
//             duration: 3000,
//           },
//           error: {
//             duration: 5000,
//           },
//           style: {
//             fontSize: '1.4rem',
//             // padding: "1.6rem 2.4rem",
//             padding: '1.6rem 1.4rem',
//             maxWidth: '50rem',
//             color: 'var(--color-grey-700)',
//             minWidth: '25rem',
//           },
//         }}
//       />
//       <BrowserRouter>
//         <Suspense
//           fallback={
//             <Spinner.Wrapper>
//               <Spinner />
//             </Spinner.Wrapper>
//           }
//         >
//           <Routes>
//             <Route element={<AppLayout />}>
//               <Route index element={<Navigate replace to="/posts" />} />
//               <Route path="/posts" element={<Home />} />
//               <Route path="/post/:postId" element={<Post />} />
//               <Route element={<ProtectedRoute />}>
//                 <Route path="/new" element={<CreatePost />} />
//                 <Route path="/account" element={<Account />} />
//                 <Route path="/dashboard" element={<Dashboard />} />
//               </Route>
//             </Route>
//             <Route path="/signup" element={<Signup />} />
//             <Route path="/login" element={<Login />} />
//             <Route path="*" element={<PageNotFound />} />
//             <Route path="/test" element={<Test />} />
//           </Routes>
//         </Suspense>
//       </BrowserRouter>
//     </QueryClientProvider>
//   )
// }

export default App
