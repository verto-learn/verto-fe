import React from 'react'
import { useGetUserSession } from '../../hooks/users/useGetUserSession';
import { Circle, CircleUser } from 'lucide-react';

const Profile = () => {

    const { data, isLoading, isError } = useGetUserSession();
    const users = data?.data.user;
    console.log("User Session Data:", users);

  return (
    <section className='min-h-screen py-8 px-4 '>
      <div className='glass-card px-8 py-4'>
        <div className='flex items-center gap-6'>
          <div className='bg-accent p-3 rounded-full'>
            <CircleUser />
          </div>
          <div>
            <p>{users.full_name}</p>
            <p className='opacity-70'>{users.email}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Profile