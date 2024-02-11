import { useQuery } from '@tanstack/react-query'
import { getIndividualPost } from '../services/getIndividualPost.js';
import { useParams, Link } from 'react-router-dom';
import React from 'react';

export default function PostContent() {

    const { id } = useParams()

    const { data: postContent, isLoading, isError } = useQuery({

        queryKey: ['individualPost', id],
        queryFn: () => getIndividualPost(id)
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