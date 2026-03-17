import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AuthGuard from '../components/AuthGuard'

const Dashboard = () => {
  return (
    <>
    <AuthGuard>
    <Navbar />
    <Hero />
    </AuthGuard> 
    </>
  )
}

export default Dashboard;