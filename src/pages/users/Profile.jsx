import React from 'react'
import { useGetUserSession } from '../../hooks/users/useGetUserSession';

const Profile = () => {

    const { data } = useGetUserSession();
    console.log("User Session Data:", data);

  return (
    <div>Profile</div>
  )
}

export default Profile