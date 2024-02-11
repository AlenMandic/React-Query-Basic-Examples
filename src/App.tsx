import React from "react"
import "./style.css"
import { QueryClient, QueryClientProvider, useQuery, } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import { getAllPosts } from './services/getPosts.js'
import PostContent from "./components/IndividualPost"
import Mutations from "./components/Mutations"

type PostObject = {
  userId: string,
  id: string,
  title: string,
  body: string,
}

const queryClient = new QueryClient()

export default function App() {

  return (

  <QueryClientProvider client={queryClient}>
    <Router>
      <Routes>
        <Route path="/" element={<div className="homepage">
          <h1>Home</h1>
          <h2>Tanstack/React Query basic examples with React Router</h2>
          <div className="intro-links">
          <Link className="anchor-link"  to="/posts">View 'All Posts' Example</Link>
          <Link className="anchor-link" to="/mutations">View Mutation examples</Link>
          </div>
          <div className="description">
          <p>This is a tutorial project for learning the basics of React Query such as querying / asynchronous state management without React Hooks such as useState / useEffect, basic mutations and default caching.</p>
          </div>
          <p><strong>React Query Developer Tools</strong> are set to be opened by default.</p>
          <footer>
            <div className="footer-div">
              <a href="https://tanstack.com/query/latest/docs/framework/react/overview" target="_blank">Visit the official Tanstack/React Query documentation</a>
            </div>
            <p>Hope you learned something valuable! 🧐</p>
          </footer>
          </div>} />

        <Route path="/posts" element={<Posts />} />

        <Route path="/mutations" element={<Mutations />} />

        <Route path="/posts/:id" element={<PostContent />} />
      </Routes>

    </Router>
    <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>

  );
}

function Posts() {

  const { data: posts, isLoading, isError } = useQuery({
    queryKey: ['posts'],
    queryFn: getAllPosts,
  })

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <>
      <Link className="anchor-link" to="/">Go back</Link>
      <div className="description">
      <p>This is a basic React Query example of doing asnychronous state management with their <code>useQuery</code> hook. We fetch an array of posts from the <code>jsonplaceholder</code> website/endpoint and display them.<br></br>You can click on individual posts and be taken to their page using <code>React Router</code>. <br></br></p><hr></hr>
      <p>Notice that when you go back to the 'All posts' page, the individual posts you have visited will be highlighted in green. These posts have been cached by React Query and will load extremely fast the next time you visit their pages. Try it! 🤓</p>
      </div>

      <h1 className="posts-h1">All posts</h1>
      {posts.map((post: PostObject)=> (
        <Link key={post.id} to={`/posts/${post.id}`} className="post-link">
         <div style={ queryClient.getQueryData(['individualPost', post.id.toString()]) ? { fontWeight: 'bold', color: 'green', margin: '10px' } : { margin: '10px' } }>{post.title}</div>
        </Link>
      ))}
    </>
  )
}
