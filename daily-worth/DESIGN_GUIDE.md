# DailyWorth - Design & Animation Guide

## 🎨 Design System

This document outlines the design system, animations, and styling conventions used throughout DailyWorth.

---

## 📐 Color Palette

### Primary Colors
- **Cyan**: `#06b6d4` (Accent, CTAs)
- **Blue**: `#0ea5e9` (Secondary accent)
- **Dark Slate**: `#1e293b` (Backgrounds)

### Semantic Colors
- **Success**: `#10b981` (Green)
- **Error**: `#ef4444` (Red)
- **Warning**: `#f59e0b` (Orange)
- **Info**: `#3b82f6` (Blue)

### Neutral Colors
```
Slate-50:   #f8fafc
Slate-100:  #f1f5f9
Slate-200:  #e2e8f0
Slate-400:  #94a3b8
Slate-500:  #64748b
Slate-700:  #334155
Slate-800:  #1e293b
Slate-900:  #0f172a
Slate-950:  #020617
```

---

## 🔤 Typography

### Font Stack
- **Primary**: Geist (from next/font/google)
- **Monospace**: Geist Mono (for code)

### Font Sizes
```
Display (h1):    48px, weight 700
Heading (h2):    36px, weight 700
Subheading (h3): 24px, weight 600
Title (h4):      20px, weight 600
Body:            16px, weight 400
Small:           14px, weight 400
Tiny:            12px, weight 400
```

### Font Weights
- Regular: 400
- Semibold: 600
- Bold: 700

---

## ✨ Animation System

### Animation Library

#### 1. Fade In
```css
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
```
**Usage**: Page loads, initial appearance
**Duration**: 0.5s
**Easing**: ease-out

#### 2. Slide In Left
```css
@keyframes slideInLeft {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}
```
**Usage**: Content entering from left
**Duration**: 0.6s
**Delay**: Staggered (0.1s increments)

#### 3. Slide In Right
```css
@keyframes slideInRight {
  from { opacity: 0; transform: translateX(30px); }
  to { opacity: 1; transform: translateX(0); }
}
```
**Usage**: Content entering from right
**Duration**: 0.6s
**Staggered**: Yes

#### 4. Slide In Down
```css
@keyframes slideInDown {
  from { opacity: 0; transform: translateY(-20px); }
  to { opacity: 1; transform: translateY(0); }
}
```
**Usage**: Alerts, messages
**Duration**: 0.5s

#### 5. Scale In
```css
@keyframes scaleIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}
```
**Usage**: Form fields, modals
**Duration**: 0.4s

#### 6. Blob (Background)
```css
@keyframes blob {
  0%, 100% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(30px, -50px) scale(1.1); }
  66% { transform: translate(-20px, 20px) scale(0.9); }
}
```
**Usage**: Animated background elements
**Duration**: 7s
**Loop**: Infinite

#### 7. Pulse Glow
```css
@keyframes pulse-glow {
  0%, 100% { box-shadow: 0 0 20px rgba(0, 188, 212, 0.3); }
  50% { box-shadow: 0 0 40px rgba(0, 188, 212, 0.6); }
}
```
**Usage**: Hover states, focus states
**Duration**: 2s

#### 8. Float
```css
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}
```
**Usage**: Floating elements
**Duration**: 3s

---

## 🎯 Component Animation Patterns

### Page Load
1. Background (immediate, static)
2. Hero text (fadeIn, 0.5s)
3. Feature cards (slideInLeft/Right, staggered 0.1s each)
4. Buttons (slideInUp, 0.6s)

### Form Interactions
- Input focus: `focus:ring-2 focus:ring-cyan-500`
- Input hover: Border color shift + glow
- Button hover: Scale up, shadow increase
- Submission: Loading spinner animation

### Card Hover Effects
- Scale: +2% (transform: scale(1.02))
- Shadow: Expand 20px
- Border: Color shift to cyan
- Duration: 300ms
- Easing: ease-out

---

## 📦 Component Patterns

### Button Styles

#### Primary Button
```jsx
<button className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105">
  Action Text
</button>
```

#### Secondary Button
```jsx
<button className="px-6 py-3 border-2 border-cyan-500 text-cyan-400 font-semibold rounded-lg hover:bg-cyan-500 hover:text-white transition-all duration-300">
  Secondary
</button>
```

#### Ghost Button
```jsx
<button className="px-6 py-3 text-slate-300 hover:text-cyan-400 transition-colors duration-300">
  Ghost Action
</button>
```

### Card Styles

#### Standard Card
```jsx
<div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-all duration-300 card-hover">
  {/* Content */}
</div>
```

#### Glass Card
```jsx
<div className="glass rounded-2xl p-8 backdrop-blur-xl">
  {/* Content */}
</div>
```

### Input Styles

#### Standard Input
```jsx
<input
  className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500 focus:ring-opacity-30 transition-all duration-300"
  placeholder="Enter text..."
/>
```

---

## 🎨 Gradient Combinations

### Cyan to Blue
```
from-cyan-500 to-blue-600
Ideal for: Primary actions, headers
```

### Blue to Cyan
```
from-blue-600 to-cyan-600
Ideal for: Highlights, featured sections
```

### Purple to Pink
```
from-purple-500 to-pink-500
Ideal for: Learning section, secondary highlight
```

### Green to Emerald
```
from-green-500 to-emerald-500
Ideal for: Success states, goal tracking
```

---

## 📱 Responsive Breakpoints

```
Mobile:   < 640px   (default)
Tablet:   640px+    (sm)
Medium:   768px+    (md)
Large:    1024px+   (lg)
XL:       1280px+   (xl)
2XL:      1536px+   (2xl)
```

### Responsive Patterns
- **Hero Section**: Full width on mobile, grid on desktop
- **Cards Grid**: 1 column mobile, 2-3 desktop
- **Navigation**: Hamburger mobile, full menu desktop
- **Modals**: Full screen mobile, centered modal desktop

---

## 🌙 Light/Dark Mode

Currently implementing **dark mode only**:
- Dark backgrounds (Slate 800-950)
- Light text (White, Slate 100-300)
- Cyan/Blue accents

---

## ♿ Accessibility

### Color Contrast Ratios
- Text on background: 7:1 (AAA standard)
- Interactive elements: 4.5:1 minimum
- Focus states: Always visible

### Interactive Elements
- Minimum touch target: 44x44px
- Clear focus indicators
- Semantic HTML structure
- ARIA labels where needed

---

## 🎬 Animation Best Practices

### Duration Guidelines
- Micro interactions: 0.2s - 0.3s
- Page transitions: 0.4s - 0.6s
- Complex animations: 0.6s - 1s

### Performance
- Use `transform` and `opacity` for smooth animations
- Avoid animating expensive properties (width, height)
- GPU acceleration with `will-change` when needed
- Respect `prefers-reduced-motion` setting

### Staggering
- Each element delay: +0.1s
- Maximum stagger: 0.6s (6 elements)
- Creates sense of progression

---

## 📐 Spacing System

```
0:   0px
1:   4px
2:   8px
3:   12px
4:   16px (base)
6:   24px
8:   32px
12:  48px
16:  64px
20:  80px
24:  96px
```

---

## 🖼️ Image Guidelines

### Logo
- SVG format preferred
- Supports both light/dark themes
- Minimum 44x44px

### Icons
- Use emoji or icon libraries (lucide-react)
- Consistent sizing (24px-32px common)
- Color matches theme

### Backgrounds
- Use gradients instead of images
- Animated blobs for visual interest
- Keep contrast for text readability

---

## 🎓 Usage Examples

### Complete Animated Card
```jsx
<div className="bg-slate-800 rounded-2xl p-8 border border-slate-700 hover:border-cyan-500 transition-all duration-300 card-hover animate-slideInUp">
  <div className="mb-6 animate-scaleIn">
    <span className="text-4xl">📊</span>
  </div>
  <h3 className="text-2xl font-bold text-white mb-4 animate-slideInLeft">
    Title
  </h3>
  <p className="text-slate-300 animate-slideInLeft" style={{ animationDelay: "0.1s" }}>
    Description
  </p>
</div>
```

### Form with Animation
```jsx
<form className="animate-slideInRight">
  <input
    className="w-full px-4 py-3 rounded-lg bg-slate-800 border border-slate-600 focus:ring-2 focus:ring-cyan-500 transition-all duration-300"
    animate-scaleIn
  />
  <button className="mt-4 w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:scale-105 transition-all duration-300">
    Submit
  </button>
</form>
```

---

## 🔄 Development Workflow

1. **Plan Layout**: Mobile-first, then desktop
2. **Apply Base Styles**: Colors, typography, spacing
3. **Add Interactions**: Hover, focus, active states
4. **Implement Animations**: Entrance, transition, feedback
5. **Test Responsiveness**: All breakpoints
6. **Performance Check**: Animation smoothness, load time

---

## 🚀 Future Enhancements

- Light mode support
- Custom theme builder
- Advanced animation library
- Component Storybook
- Design tokens export

---

**Last Updated**: March 2024
**Maintained By**: DailyWorth Design Team
