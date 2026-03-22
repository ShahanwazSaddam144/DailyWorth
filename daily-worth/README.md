# DailyWorth - Financial Literacy Hackathon Project 🎓💰

## 🚀 Project Vision

**DailyWorth** is an innovative financial literacy platform designed to spread awareness about economics and personal finance management in communities. This platform transforms financial education into an engaging, interactive experience that empowers users to take control of their financial futures.

## 💡 Core Features

### 1. **Financial Dashboard**
- Real-time income & expense tracking
- Visual financial metrics and analytics
- Financial health scoring system
- Goal tracking and progress monitoring

### 2. **Financial Education Hub**
- Curated lessons on economics and money management
- Interactive tutorials on budgeting, saving, and investing
- Real-world case studies and scenarios
- Tips tailored to user behavior patterns

### 3. **Expense Management**
- Smart categorization of expenses
- Receipt scanning and organization
- Spending insights and patterns
- Budget recommendations based on data

### 4. **Income Optimization**
- Income tracking across multiple sources
- Earning potential analysis
- Side income opportunities
- Tax planning basics

## 🎨 Modern Design Features

### Beautiful Split-Layout Authentication
- **Left Side**: Features showcase with animated benefits
- **Right Side**: Clean, focused login/signup form
- **Smooth Animations**: Elegant transitions and entrance effects
- **Glass-morphism**: Modern frosted glass design patterns
- **Dynamic Backgrounds**: Animated blob elements for visual appeal
- **Responsive**: Works perfectly on all device sizes

### Premium Animation System
- ✨ Fade-in effects on page load
- 🔄 Slide-in transitions for content
- 📈 Scale animations for interactive elements
- 💫 Glowing effects on hover states
- 🎯 Smooth transitions throughout the app
- 🌊 Floating blob animations in background

## 🛠️ Tech Stack

- **Frontend**: Next.js 14+, React 18+, Tailwind CSS
- **Backend**: Node.js, Express
- **Database**: MongoDB
- **Authentication**: Secure cookie-based auth
- **Styling**: Tailwind CSS with custom animation system

## 📁 Project Structure

```
daily-worth/
├── app/
│   ├── Auth/
│   │   └── Auth.js              # Enhanced split-layout authentication
│   ├── components/
│   │   ├── AddIncome.js
│   │   ├── AuthGuard.js
│   │   ├── ExpenseTips.js
│   │   ├── FinancialScore.js
│   │   ├── Hero.js
│   │   ├── IncomeCharts.js
│   │   └── Navbar.js
│   ├── dashboard/
│   │   └── page.js
│   ├── globals.css              # Enhanced animations & styles
│   ├── layout.js                # Updated metadata
│   └── page.js
└── backend/
    ├── server.js
    ├── controllers/
    ├── Database/
    ├── middleware/
    └── utils/
```

## 🚀 Quick Start

### Installation

1. **Navigate to project**
   ```bash
   cd daily-worth
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (.env.local)
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Start backend**
   ```bash
   cd backend
   npm install
   node server.js
   ```

5. **Start frontend**
   ```bash
   npm run dev
   ```

6. **Visit** `http://localhost:3000`

## 🎯 Hackathon Alignment

✅ **Financial Literacy Focus** - Comprehensive education on money management
✅ **Community Impact** - Accessible platform for all backgrounds
✅ **Beginner-Friendly** - Intuitive interface and smooth onboarding
✅ **Economic Awareness** - Built-in lessons on financial concepts
✅ **Real-World Application** - Practical tools for personal finance
✅ **Innovative Design** - Beautiful UI with engaging animations

## 📚 Key Pages

- **Home (`/`)**: Split-layout authentication with feature showcase
- **Dashboard (`/dashboard`)**: Complete financial overview and management

## 🎨 Animation Library

All smooth animations are in `globals.css`:
- `animate-fadeIn` - Fade effect
- `animate-slideInLeft` - Slide from left
- `animate-slideInRight` - Slide from right  
- `animate-slideInDown` - Slide from top
- `animate-scaleIn` - Scale up effect
- `animate-blob` - Background blob motion
- `animate-pulse-glow` - Pulsing glow
- `animate-float` - Floating motion

## 📱 Responsive & Accessible

- Mobile-first design
- Touch-optimized interactions
- Multiple breakpoints (sm, md, lg, xl)
- Accessible color contrasts
- Semantic HTML structure

## 🔐 Security

- Secure authentication (HTTP-only cookies)
- Password encryption
- Input validation
- CSRF protection
- Protected routes via AuthGuard

## 🌟 Future Enhancements

- AI-powered financial recommendations
- Community features & leaderboards
- Mobile app version
- Advanced investment tracking
- Personal finance coaching

---

**Building financial literacy, one user at a time. 🌍💡**
