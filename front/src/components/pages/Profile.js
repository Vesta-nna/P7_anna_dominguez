import React, { useEffect, useState } from 'react'
import axios from 'axios'

import Email from './Profile/Email'
import Infos from './Profile/Infos'
import Password from './Profile/Password'
import DeleteAccount from './Profile/DeleteAccount'
import authHeader from '../auth-header'

const Profile = ({ userId }) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [bio, setBio] = useState('')

  useEffect(() => {
    (async() => {
      const res = await axios.get(`http://localhost:8080/api/profile/${userId}`, { headers: authHeader()})
      const { firstName, lastName, bio, user } = res.data.userProfile
      setFirstName(firstName)
      setLastName(lastName)
      setBio(bio || '')
      setEmail(user.email)
    })()
  }, [])

  return (
    <div>
      <Infos userId={userId} firstName={firstName} setFirstName={setFirstName} lastName={lastName} setLastName={setLastName} bio={bio} setBio={setBio} />
      <Email userId={userId} email={email} setEmail={setEmail} />
      <Password userId={userId} />
      <DeleteAccount userId={userId} />
    </div>
  )
}

export default Profile
