import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AuthGuard from '../components/AuthGuard'
import AddIncome from '../components/AddIncome'
import IncomeCharts from '../components/IncomeCharts'
import ExpenseTips from '../components/ExpenseTips'
import FinancialHealthScore from '../components/FinancialScore'

const Dashboard = () => {
  return (
    <>
    <AuthGuard>
    <Navbar />
    <Hero />
    <AddIncome />
    <IncomeCharts />
    <ExpenseTips />
    <FinancialHealthScore />
    </AuthGuard> 
    </>
  )
}

export default Dashboard;