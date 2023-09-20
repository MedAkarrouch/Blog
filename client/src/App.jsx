import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { QueryClientProvider, QueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { Toaster } from "react-hot-toast"

import AppLayout from "./ui/AppLayout"
import Home from "./pages/Home"
import GlobalStyles from "./styles/GlobalStyles"
import Post from "./pages/Post"
import CreatePost from "./pages/CreatePost"
import Signup from "./pages/Signup"
import Login from "./pages/Login"
import PageNotFound from "./pages/PageNotFound"
import ProtectedRoute from "./ui/ProtectedRoute"
import PostsLayout from "./pages/PostsLayout"
import Users from "./pages/Users"
import Test from "./pages/Test"

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <GlobalStyles />
      <Toaster
        gutter={15}
        containerStyle={{ margin: "0" }}
        toastOptions={{
          success: {
            duration: 3000
          },
          error: {
            duration: 5000
          },
          style: {
            fontSize: "1.4rem",
            // padding: "1.6rem 2.4rem",
            padding: "1.6rem 1.4rem",
            maxWidth: "50rem",
            color: "var(--color-grey-700)",
            minWidth: "25rem"
          }
        }}
      />
      <BrowserRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route index element={<Navigate replace to="/posts" />} />
            <Route element={<Home />}>
              <Route path="/posts" element={<PostsLayout />} />
              <Route path="/users" element={<Users />} />
            </Route>
            <Route path="/post/:postId" element={<Post />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/new" element={<CreatePost />} />
            </Route>
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/pageNotFound" element={<PageNotFound />} />
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
