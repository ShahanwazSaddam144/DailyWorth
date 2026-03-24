'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';

const CountrySelector = ({ countries }) => {
  const router = useRouter();

  const handleCountryClick = (countryName) => {
    router.push(`/game?country=${encodeURIComponent(countryName)}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
      <h2 className="text-3xl font-bold text-white mb-8 text-center tracking-tight">
        World Economy Simulator
      </h2>
      <p className="text-gray-300 text-center mb-12">
        Choose a country to manage its economy and see the impacts of your decisions.
      </p>

      <Swiper
        spaceBetween={24}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
          1280: { slidesPerView: 4 },
        }}
      >
        {countries.map((country, index) => (
          <SwiperSlide key={index}>
            <div
              onClick={() => handleCountryClick(country.name)}
              className="group bg-gradient-to-br from-slate-800/60 to-slate-900/60 backdrop-blur-md border border-slate-700/60 rounded-2xl p-6 cursor-pointer transition-all duration-500 hover:scale-[1.04] hover:shadow-2xl hover:shadow-cyan-500/10 hover:border-cyan-500/40"
            >
              <div className="text-4xl mb-4 transform transition-transform duration-500 group-hover:scale-110">
                {country.flag}
              </div>

              <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-cyan-400 transition-colors duration-300">
                {country.name}
              </h3>

              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex justify-between">
                  <span>GDP:</span>
                  <span className="text-green-400 group-hover:text-green-300 transition">
                    ${country.gdp}B
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Poverty Rate:</span>
                  <span className="text-red-400 group-hover:text-red-300 transition">
                    {country.povertyRate}%
                  </span>
                </div>

                <div className="flex justify-between">
                  <span>Population:</span>
                  <span className="text-blue-400 group-hover:text-blue-300 transition">
                    {(country.population / 1000000).toFixed(1)}M
                  </span>
                </div>
              </div>

              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-500 pointer-events-none bg-gradient-to-r from-cyan-500/5 to-blue-500/5"></div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CountrySelector;