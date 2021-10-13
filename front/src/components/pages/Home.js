import React, { useEffect, useState } from 'react'
import Post from './Home/Post'
import CreatePost from './Home/CreatePost'
import axios from 'axios'
import authHeader from '../auth-header'
import moment from 'moment'

const Home = ({ userId }) => {
  const [posts, setPosts] = useState([])

  const getAllPosts = async () => {
    const res = await axios.get(`http://localhost:8080/api/feed/all`, { headers: authHeader() })
    setPosts(res.data.posts)
  }

  useEffect(() => {
    (async () => {
      await getAllPosts()
    })()
  }, [])

  const handleDelete = async (e, id) => {
    e.preventDefault()

    await axios.delete(`http://localhost:8080/api/feed/${id}`, { headers: authHeader() })
    await getAllPosts()
  }

  return (
    <div>
      <CreatePost changePosts={setPosts} userId={userId} />
      {posts.map(({ content, user, createdAt, id }) => {
          const { firstName, lastName, bio } = user.profile
          const dateFromNow = moment(createdAt).fromNow()
          return <Post handlePostDelete={handleDelete} id={id} key={id} bio={bio} content={content} dateFromNow={dateFromNow} authorId={user.id} fullName={`${firstName} ${lastName}`}/>
        }
      )}
    </div>
  )
}

export default Home
