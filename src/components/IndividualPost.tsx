import { useQuery, useQueryClient } from '@tanstack/react-query'
import { getIndividualPost } from '../services/getIndividualPost.js';
import { useParams, Link } from 'react-router-dom';
import React from 'react';

type postObject = {
  id: number,
  title: string,
  body: string
}

export default function PostContent() {

    const { id } = useParams()

    const queryClient = useQueryClient()

    // Get the cached data for the individual post to prevent needless network requests
    const cachedPost = queryClient.getQueryData(['individualPost', id]) as postObject

    const { data: postContent, isLoading, isError } = useQuery({

        queryKey: ['individualPost', id],
        queryFn: () => getIndividualPost(id),
        staleTime: 1000 * 60 * 10, //10 minutes
        initialData: cachedPost, // use the cached data if available
    })

    if(isLoading) return <div>Loading...</div>
    if(isError) return <div>Error</div>

    return (
        <div>
          {postContent && (
            <>
            <h1>Individual post</h1>
            <h3>{postContent.title}</h3>
            <h3>{postContent.body}</h3>
            <p style={{ fontSize: '20px' }}>Posted by User: {postContent.userId}</p>
            <Link style={{ margin: '10px', fontSize: '30px' }} to="/posts">Go back</Link>
            </>
          )}
        </div>
      )

}