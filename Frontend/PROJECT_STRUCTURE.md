# UtsavChakra Project Structure

## ✅ Restructured Architecture

```
Frontend/src/
├── App.jsx                    # Main App component (kept in src root)
├── main.jsx                   # Entry point (kept in src root)
├── index.css                  # Global styles with CSS variables
├── App.css                    # App-specific styles
│
├── router/
│   └── index.jsx              # Centralized routing configuration
│
├── providers/
│   └── ThemeProvider.jsx      # Theme context provider
│
├── hooks/
│   └── useTheme.js            # Theme management hook
│
├── theme/
│   ├── colors.js              # All color definitions
│   ├── themes.js              # Theme configurations
│   └── index.js               # Theme utilities
│
├── components/
│   ├── ui/                    # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   └── Input.jsx
│   ├── common/                # Common layout components
│   │   ├── Header.jsx         # Mobile-responsive header
│   │   ├── BottomNav.jsx      # Mobile navigation
│   │   └── Loader.jsx
│   └── demo/                  # Demo components
│       ├── ThemeDemo.jsx
│       └── ThemeShowcase.jsx
│
├── modules/
│   ├── user/                  # User module
│   │   ├── routes.jsx         # User routing
│   │   ├── auth/
│   │   │   ├── Login.jsx
│   │   │   └── Signup.jsx
│   │   ├── home/
│   │   │   ├── UserHome.jsx
│   │   │   └── sections/
│   │   │       ├── EventTypeSelector.jsx
│   │   │       ├── RequirementIntro.jsx
│   │   │       └── ServicesGrid.jsx
│   │   ├── requirements/
│   │   │   └── RequirementsForm.jsx
│   │   └── vendors/
│   │       ├── VendorsList.jsx
│   │       └── VendorCard.jsx
│   ├── admin/                 # Admin module (placeholder)
│   │   └── routes.jsx
│   └── vendor/                # Vendor module (placeholder)
│       └── routes.jsx
│
└── data/
    ├── events.js              # Event types data
    ├── services.js            # Services data
    └── vendors.js             # Vendors data
```

## Key Features Implemented

### ✅ Clean Architecture
- **App.jsx and main.jsx remain in src root** as requested
- **Centralized routing** via `src/router/index.jsx`
- **ThemeProvider** in `src/providers/ThemeProvider.jsx`
- **Modular structure** with user/admin/vendor modules

### ✅ Theme System
- **No hardcoded colors** anywhere in components
- **CSS variables** with Tailwind integration
- **Runtime theme switching** (light, dark, festival)
- **Centralized color management** in `theme/colors.js`

### ✅ Mobile-First Responsive Design
- **Responsive Header** with mobile menu
- **Bottom Navigation** for mobile devices
- **Adaptive layouts** using Tailwind breakpoints
- **Touch-friendly** interface elements

### ✅ Component Architecture
- **Reusable UI components** (Button, Card, Input)
- **Consistent theming** across all components
- **Semantic naming** for better maintainability
- **Modular imports** for better tree-shaking

## Import Structure

### Main App Flow
```javascript
// main.jsx
import App from './App.jsx'

// App.jsx
import { ThemeProvider } from './providers/ThemeProvider'
import AppRouter from './router'

// router/index.jsx
import UserRoutes from '../modules/user/routes'
```

### Theme Usage
```javascript
// Any component
import { useTheme } from '../hooks/useTheme'

const MyComponent = () => {
  const { themeName, changeTheme } = useTheme()
  return <div className="bg-theme-card text-theme-primary">...</div>
}
```

## Mobile-First Features

### Responsive Header
- Desktop: Horizontal layout with theme switcher
- Mobile: Hamburger menu with collapsible options
- Sticky positioning for better UX

### Bottom Navigation
- Hidden on desktop (md:hidden)
- Fixed positioning on mobile
- Active state indicators
- Touch-optimized sizing

### Responsive Layouts
- Grid systems adapt to screen size
- Cards stack on mobile
- Forms optimize for touch input
- Typography scales appropriately

## Development Commands

```bash
# Development server
npm run dev

# Production build
npm run build

# Lint code
npm run lint
```

## Theme System Usage

### Available Themes
- **Light**: Default clean theme
- **Dark**: Dark mode variant
- **Festival**: Special occasion theme

### CSS Classes
```css
/* Background colors */
.bg-theme-primary    /* Primary brand color */
.bg-theme-card       /* Card/surface color */

/* Text colors */
.text-theme-primary    /* Main text */
.text-theme-secondary  /* Supporting text */
.text-theme-tertiary   /* Subtle text */

/* Borders and shadows */
.border-theme-card   /* Card borders */
.shadow-theme-card   /* Card shadows */
```

## Future Expansion

### Admin Module
- Ready for admin panel implementation
- Placeholder route structure in place
- Will follow same theming patterns

### Vendor Module  
- Ready for vendor dashboard
- Placeholder route structure in place
- Will integrate with user module

### Additional Features
- Authentication system ready
- Form validation can be added
- API integration points identified
- State management can be added (Redux/Zustand)

## Build Status
✅ **No import errors**  
✅ **Clean build output**  
✅ **Mobile-responsive**  
✅ **Theme system working**  
✅ **Routing functional**