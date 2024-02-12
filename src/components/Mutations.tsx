import React from "react"
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Link } from 'react-router-dom'
import mockData from "../mockData"

let initialData = Array.from(mockData)

type newPostObject = {
  id: number,
  title: string,
  body: string
}

function generateRandomId() {
  return Math.floor(Math.random() * 10000)
}

async function fetchMockPosts() {
  // wait 1 second and then resolve the promise to return our mockData
 await new Promise(resolve => setTimeout(resolve, 1000))
 return initialData
}

async function addNewMockPost(newPost:newPostObject) {
  // simulate a network request resolving in 500ms
  await new Promise(resolve => setTimeout(resolve, 1500))
  initialData.unshift(newPost)
}

async function deleteMockPost(postId:number) {

  let confirmDelete = confirm('Are you sure you want to delete post: ' + postId)

  if(confirmDelete) {
    await new Promise(resolve => setTimeout(resolve, 500))

    const updatedData = initialData.filter(post => post.id !== postId)

    return initialData = updatedData
  }

return
}

export default function Mutations() {

const queryClient = useQueryClient()

// useQuery function to store our posts state
const { data: mockPosts, isLoading, isError } = useQuery({
    queryKey: ['mockPosts'],
    queryFn: fetchMockPosts,  // our fake promise is used as the query function
})

// Whenever we add a new post we invalidate the query for the list of posts
const addPostMutation = useMutation({
  mutationFn: addNewMockPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['mockPosts'] })
  }
})
// Whenever we delete a post we invalidate the query for the list of posts
const deletePostMutation = useMutation({
  mutationFn: deleteMockPost,
  onSuccess: (updatedData) => { // updatedData is whatever deleteMockPost returns.
    queryClient.setQueryData(['mockPosts'], updatedData)
  }  
})

if(isLoading) return <h1>Loading...</h1>
if(isError) return <h3>Error...</h3>

    return <>
    <h1>Mutations page</h1>
    <Link  className="anchor-link" to="/">Go back</Link>
    <div className="description">
    <p>Here we can see basic mutations for changing our UI and data without using React Hooks such as <code>useState</code> and <code>useEffect</code>. We have a simple UI of posts and adding / removing setup. We can add or remove posts with the useMutation and useQuery hooks. We also simulate fake network requests by awaiting a promise to resolve after any new query.<br></br>
    <code>await new Promise(resolve ={">"} setTimeout(resolve, 500)) // handle logic after this</code>
    </p>
    </div>
    <button className="big-button" disabled={addPostMutation.isPending} onClick={() => addPostMutation.mutate({
                  id: initialData.length + 1,
                  title: `New Post ${initialData.length + 1}`,
                  body: `Lorem ipsum ${initialData.length + 1}`,
    })}>{addPostMutation.isPending ? 'Adding' : 'Add new post Mutation'}</button>

{mockPosts?.map(post => {
  return (
   <div key={post.id + generateRandomId()} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
    <h2>{post.title}</h2>  
    <p>{post.body}</p>
    <button onClick={() => deletePostMutation.mutate(post.id)}>Delete post</button>
   </div>
  )
})}

<h2>Main logic and workflow of a mutation</h2>
<div className="description-longer">
<ul>
  <li>Access and connect to our main QueryClient from App.tsx: <code>const queryClient = useQueryClient()</code></li>
  <li>Define the handler functions which fetch and return some data using JavaScript promises:<pre><code>
  {`async function fetchMockPosts() {
// simulate waiting for a network request to resolve
await new Promise(resolve => setTimeout(resolve, 1000))
return initialData }`}
</code>
</pre></li>

<li>Define the handler function for the mutations you intend on doing, e.g 'Adding a post':<pre><code>
  {`const addPostMutation = useMutation({
  mutationFn: addNewMockPost,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['mockPosts'] }) }})`}
</code>
</pre></li>

<li>
  Finally add the handler function somewhere to execute them:<pre><code>
  {` <button disabled={addPostMutation.isPending} onClick={() => addPostMutation.mutate({
      id: initialData.length + 1,
      title: 'New Post ' + (initialData.length + 1),
      body: 'Lorem ipsum ' + (initialData.length + 1), })}>
      {addPostMutation.isPending ? 'Adding' : 'Add new post Mutation'}
</button>`}
</code>
</pre>
</li>
</ul>
</div>
    </>
}