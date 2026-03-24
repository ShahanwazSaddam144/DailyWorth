import React from 'react'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import AuthGuard from '../components/AuthGuard'
import AddIncome from '../components/AddIncome'
import IncomeCharts from '../components/IncomeCharts'
import ExpenseTips from '../components/ExpenseTips'
import FinancialHealthScore from '../components/FinancialScore'
import Footer from '../components/Footer'
import FinancialLiteracyQuiz from '../components/FinancialLiteracyQuiz'
import SavingsGoalTracker from '../components/SavingsGoalTracker'
import SmartTipsInsights from '../components/SmartTipsInsights'
import CountrySelector from '../components/CountrySelector'
import { countries } from '../data/countries'

const Dashboard = () => {
  return (
    <>
    <AuthGuard>
    <Navbar />
    <main className="pt-20 pb-20 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950">
      <Hero />
      <CountrySelector countries={countries} />
      <AddIncome />
      <SmartTipsInsights />
      <div className="max-w-6xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <FinancialLiteracyQuiz />
          <SavingsGoalTracker />
        </div>
      </div>
      <IncomeCharts />
      <ExpenseTips />
      <FinancialHealthScore />
    </main>
    <Footer />
    </AuthGuard> 
    </>
  )
}

export default Dashboard;