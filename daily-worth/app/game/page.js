'use client';

import React, { useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';
import AuthGuard from '../components/AuthGuard';
import Footer from '../components/Footer';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const Game = () => {
  const searchParams = useSearchParams();
  const country = searchParams.get('country') || 'Unknown';

  const [settings, setSettings] = useState({
    corporateTax: 60,
    interestRate: 30,
    publicSpending: 30,
    rndCommitment: 16,
    foreignLending: 10,
    wealthFundRisk: 95,
    tariffLevel: 50,
    printCurrency: 0
  });

  const [showGraph, setShowGraph] = useState(false);
  const [graphData, setGraphData] = useState([]);

  const handleSliderChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = () => {
    const data = [];
    for (let i = 1; i <= 10; i++) {
      const gdpGrowth = 2 + (settings.publicSpending / 100) * 0.5 - (settings.corporateTax / 100) * 0.3 + (settings.rndCommitment / 100) * 0.2;
      const inflation = 2 + (settings.interestRate / 100) * (-0.5) + (settings.printCurrency / 100) * 2;
      const unemployment = 5 - (settings.publicSpending / 100) * 0.3 + (settings.tariffLevel / 100) * 0.1;
      data.push({
        year: 2025 + i,
        gdpGrowth: Math.max(0, gdpGrowth + Math.random() * 2 - 1),
        inflation: Math.max(0, inflation + Math.random() * 1 - 0.5),
        unemployment: Math.max(0, unemployment + Math.random() * 1 - 0.5)
      });
    }
    setGraphData(data);
    setShowGraph(true);
  };

  const parameters = [
    { key: 'corporateTax', label: 'Corporate Tax', unit: '%', description: 'Higher tax funds spending but dampens business investment.', icon: '∫' },
    { key: 'interestRate', label: 'Interest Rate', unit: '%', description: 'Controls borrowing cost. Raise to cool inflation; lower to stimulate.', icon: 'Σ' },
    { key: 'publicSpending', label: 'Public Spending', unit: '%', description: 'Government expenditure as % of GDP. Multiplier effect applies.', icon: '' },
    { key: 'rndCommitment', label: 'R&D Commitment', unit: '%', description: 'Shifts productivity frontier over time. Long-run payoff.', icon: '↯' },
    { key: 'foreignLending', label: 'Foreign Lending', unit: '%', description: 'Interest income vs. geopolitical exposure trade-off.', icon: '∆' },
    { key: 'wealthFundRisk', label: 'Wealth Fund Risk', unit: '%', description: 'Higher risk allocation increases potential returns and volatility.', icon: '' },
    { key: 'tariffLevel', label: 'Tariff Level', unit: '%', description: 'Protects domestic industry. Risks retaliatory trade action.', icon: '⚠' },
    { key: 'printCurrency', label: 'Print Currency', unit: '%', description: 'Emergency liquidity injection through central bank.', icon: '⊗' }
  ];

  return (
    <>
      <AuthGuard>
        <Navbar />
        <main className="pt-20 pb-20 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 min-h-screen">
          <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
                Economy Simulator: <span className="text-cyan-400">{country}</span>
              </h1>
              <p className="text-gray-400">Adjust economic parameters and see the impacts.</p>
            </motion.div>

            <div className="flex flex-col lg:flex-row gap-8">
              
              {/* Controls */}
              <div className="w-full lg:w-1/2">
                <div className="hidden lg:grid grid-cols-1 gap-6">
                  {parameters.map((param, i) => (
                    <motion.div
                      key={param.key}
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md border border-slate-700/60 rounded-2xl p-6"
                    >
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <span className="text-xl text-cyan-400">{param.icon}</span>
                          <h3 className="text-lg font-semibold text-white">{param.label}</h3>
                        </div>

                        <p className="text-gray-400 text-sm">{param.description}</p>

                        <div className="flex flex-col gap-2 mt-2">
                          <input
                            type="range"
                            min="0"
                            max="100"
                            value={settings[param.key]}
                            onChange={(e) => handleSliderChange(param.key, parseInt(e.target.value))}
                            className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
                          />

                          <div className="flex justify-between text-sm">
                            <span className="text-slate-400">0{param.unit}</span>
                            <span className="text-cyan-400 font-mono text-lg">
                              {settings[param.key]}{param.unit}
                            </span>
                            <span className="text-slate-400">100{param.unit}</span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Swiper */}
                <div className="lg:hidden">
                  <Swiper spaceBetween={16} slidesPerView={1.1}>
                    {parameters.map((param, i) => (
                      <SwiperSlide key={param.key}>
                        <div className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 border border-slate-700/60 rounded-2xl p-6">
                          <div className="flex flex-col gap-3">
                            <div className="flex items-center gap-3">
                              <span className="text-xl text-cyan-400">{param.icon}</span>
                              <h3 className="text-lg font-semibold text-white">{param.label}</h3>
                            </div>

                            <p className="text-gray-400 text-sm">{param.description}</p>

                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={settings[param.key]}
                              onChange={(e) => handleSliderChange(param.key, parseInt(e.target.value))}
                              className="w-full h-2 bg-slate-700 rounded-lg"
                            />

                            <div className="flex justify-between text-sm">
                              <span className="text-slate-400">0{param.unit}</span>
                              <span className="text-cyan-400 font-mono text-lg">
                                {settings[param.key]}{param.unit}
                              </span>
                              <span className="text-slate-400">100{param.unit}</span>
                            </div>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={handleSubmit}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold py-3 px-10 rounded-xl hover:scale-105 transition"
                  >
                    Simulate Economy
                  </button>
                </div>
              </div>

              {/* Graph */}
              <div className="w-full lg:w-1/2">
                {showGraph && (
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md border border-slate-700/60 rounded-2xl p-6"
                  >
                    <h2 className="text-2xl font-bold text-white mb-6 text-center">
                      Economic Projections
                    </h2>

                    <ResponsiveContainer width="100%" height={400}>
                      <LineChart data={graphData}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                        <XAxis dataKey="year" stroke="#9CA3AF" />
                        <YAxis stroke="#9CA3AF" />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#1F2937',
                            border: '1px solid #374151',
                            borderRadius: '10px',
                            color: '#F9FAFB'
                          }}
                        />
                        <Legend />
                        <Line type="monotone" dataKey="gdpGrowth" stroke="#10B981" strokeWidth={3} />
                        <Line type="monotone" dataKey="inflation" stroke="#F59E0B" strokeWidth={3} />
                        <Line type="monotone" dataKey="unemployment" stroke="#EF4444" strokeWidth={3} />
                      </LineChart>
                    </ResponsiveContainer>
                  </motion.div>
                )}
              </div>

            </div>

          </div>
        </main>
        <Footer />
      </AuthGuard>
    </>
  );
};

export default Game;