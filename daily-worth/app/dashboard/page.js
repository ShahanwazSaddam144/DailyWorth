import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AuthGuard from '../components/AuthGuard'
import AddIncome from '../components/AddIncome'

const Dashboard = () => {
  return (
    <>
    <AuthGuard>
    <Navbar />
    <Hero />
    <AddIncome />
    </AuthGuard> 
    </>
  )
}

export default Dashboard;