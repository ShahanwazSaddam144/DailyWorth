import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AuthGuard from '../components/AuthGuard'
import AddIncome from '../components/AddIncome'
import IncomeCharts from '../components/IncomeCharts'
import ExpenseTips from '../components/ExpenseTips'

const Dashboard = () => {
  return (
    <>
    <AuthGuard>
    <Navbar />
    <Hero />
    <AddIncome />
    <IncomeCharts />
    <ExpenseTips />
    </AuthGuard> 
    </>
  )
}

export default Dashboard;