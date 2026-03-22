"use client";

export default function FinancialLiteracyHub() {
  const resources = [
    {
      category: "Beginner",
      icon: "🌱",
      topics: [
        "Understanding Money",
        "Budgeting 101",
        "Emergency Fund Basics",
        "Debt Management"
      ]
    },
    {
      category: "Intermediate",
      icon: "📈",
      topics: [
        "Investing Fundamentals",
        "Stock Market Basics",
        "Passive Income",
        "Tax Planning"
      ]
    },
    {
      category: "Advanced",
      icon: "🚀",
      topics: [
        "Portfolio Optimization",
        "Real Estate Investment",
        "Business Finance",
        "Wealth Building"
      ]
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Student",
      text: "DailyWorth helped me understand finances like no other platform. Now I'm confident managing my money!",
      avatar: "👩‍🎓"
    },
    {
      name: "Michael Chen",
      role: "Young Professional",
      text: "The expense tracking and insights are amazing. I've saved $5,000 in just 3 months!",
      avatar: "👨‍💼"
    },
    {
      name: "Emma Wilson",
      role: "Entrepreneur",
      text: "Great tool for managing business finances and personal wealth simultaneously.",
      avatar: "👩‍🚀"
    }
  ];

  return (
    <section className="py-20 px-6 bg-slate-900">
      <div className="max-w-6xl mx-auto space-y-20">
        {/* Learning Resources */}
        <div className="animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            Learning Paths for Every Level
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((resource, idx) => (
              <div
                key={idx}
                className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-all duration-300 group animate-slideInUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {resource.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-6">{resource.category}</h3>
                <ul className="space-y-3">
                  {resource.topics.map((topic, topicIdx) => (
                    <li
                      key={topicIdx}
                      className="flex items-center gap-3 text-slate-300 hover:text-cyan-400 transition-colors duration-300 cursor-pointer"
                    >
                      <span className="w-2 h-2 rounded-full bg-cyan-500"></span>
                      {topic}
                    </li>
                  ))}
                </ul>
                <button className="mt-8 w-full py-3 px-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 group-hover:scale-105">
                  Explore Lessons
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Why Choose DailyWorth */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl p-12 text-white text-center animate-slideInUp">
          <h2 className="text-4xl font-bold mb-6">Why Choose DailyWorth?</h2>
          <div className="grid md:grid-cols-3 gap-8 mt-8">
            <div className="animate-slideInLeft" style={{ animationDelay: "0.1s" }}>
              <div className="text-5xl mb-4">🎓</div>
              <h3 className="text-xl font-semibold mb-2">Expert Education</h3>
              <p className="text-blue-100">Learn from financial experts and economists</p>
            </div>
            <div className="animate-slideInLeft" style={{ animationDelay: "0.2s" }}>
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-semibold mb-2">100% Secure</h3>
              <p className="text-blue-100">Bank-level encryption for your data</p>
            </div>
            <div className="animate-slideInLeft" style={{ animationDelay: "0.3s" }}>
              <div className="text-5xl mb-4">📱</div>
              <h3 className="text-xl font-semibold mb-2">Always Accessible</h3>
              <p className="text-blue-100">Access from any device, anytime</p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="animate-fadeIn">
          <h2 className="text-4xl md:text-5xl font-bold text-white text-center mb-16">
            What Our Users Say
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div
                key={idx}
                className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-all duration-300 card-hover animate-slideInUp"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-5xl">{testimonial.avatar}</span>
                  <div>
                    <h3 className="text-lg font-bold text-white">{testimonial.name}</h3>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-slate-300 italic">&quot;{testimonial.text}&quot;</p>
                <div className="flex gap-1 mt-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-12 animate-slideInUp">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Take Control of Your Finances?
          </h2>
          <p className="text-xl text-slate-300 mb-8 max-w-2xl mx-auto">
            Join thousands of users who are building their financial literacy and achieving their money goals
          </p>
          <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 text-lg">
            Start Your Journey Today
          </button>
        </div>
      </div>
    </section>
  );
}
