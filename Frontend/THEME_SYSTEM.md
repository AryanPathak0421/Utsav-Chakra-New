# UtsavChakra Theme System

A centralized, flexible theme system built with CSS variables and Tailwind CSS.

## Features

- ✅ All colors defined in one place (`src/theme/colors.js`)
- ✅ No hardcoded colors in components
- ✅ CSS variables with Tailwind integration
- ✅ Multiple theme support (light, dark, festival)
- ✅ Theme persistence in localStorage
- ✅ Easy theme switching at runtime

## File Structure

```
src/
├─ theme/
│   ├─ colors.js      # Color definitions
│   ├─ themes.js      # Theme configurations
│   └─ index.js       # Theme utilities
├─ hooks/
│   └─ useTheme.js    # Theme hook
├─ app/providers/
│   └─ ThemeProvider.jsx  # Theme context provider
└─ styles/
    └─ globals.css    # Global styles with CSS variables
```

## Usage

### Using the Theme Hook

```jsx
import { useTheme } from '../hooks/useTheme';

const MyComponent = () => {
  const { theme, themeName, changeTheme, availableThemes } = useTheme();
  
  return (
    <div>
      <p>Current theme: {themeName}</p>
      <button onClick={() => changeTheme('dark')}>
        Switch to Dark
      </button>
    </div>
  );
};
```

### Using Theme Classes

```jsx
// Background colors
<div className="bg-theme-primary">Primary background</div>
<div className="bg-theme-card">Card background</div>

// Text colors
<p className="text-theme-primary">Primary text</p>
<p className="text-theme-secondary">Secondary text</p>

// Borders and shadows
<div className="border-theme-card shadow-theme-card">
  Card with themed border and shadow
</div>
```

### Using CSS Variables Directly

```css
.custom-element {
  background-color: var(--color-primary-500);
  color: var(--color-text-primary);
  border: 1px solid var(--color-card-border);
}
```

## Available Themes

### Light Theme (Default)
- Clean, bright interface
- Orange primary colors
- Blue secondary colors
- Purple accent colors

### Dark Theme
- Dark backgrounds with light text
- Same color palette with inverted backgrounds

### Festival Theme
- Red and gold color scheme
- Warm, celebratory feel
- Perfect for special occasions

## Adding New Themes

1. Define colors in `src/theme/themes.js`:

```javascript
export const myCustomTheme = {
  name: 'custom',
  colors: {
    primary: { /* color palette */ },
    secondary: { /* color palette */ },
    // ... other color definitions
  },
};
```

2. Add to themes object:

```javascript
export const themes = {
  light: lightTheme,
  dark: darkTheme,
  festival: festivalTheme,
  custom: myCustomTheme, // Add here
};
```

## CSS Variables Reference

### Primary Colors
- `--color-primary-50` to `--color-primary-950`

### Secondary Colors  
- `--color-secondary-50` to `--color-secondary-950`

### Accent Colors
- `--color-accent-50` to `--color-accent-950`

### Background Colors
- `--color-bg-primary`
- `--color-bg-secondary` 
- `--color-bg-tertiary`

### Text Colors
- `--color-text-primary`
- `--color-text-secondary`
- `--color-text-tertiary`
- `--color-text-inverse`

### Card Colors
- `--color-card-bg`
- `--color-card-border`
- `--color-card-shadow`

### Status Colors
- `--color-success`
- `--color-warning`
- `--color-error`
- `--color-info`

## Best Practices

1. **Never use hardcoded colors** - Always use theme variables
2. **Use semantic naming** - Prefer `text-theme-primary` over specific color names
3. **Test all themes** - Ensure components work with all available themes
4. **Consistent spacing** - Use Tailwind's spacing system consistently
5. **Accessible colors** - Ensure sufficient contrast ratios

## Component Guidelines

When creating new components:

```jsx
// ✅ Good - Uses theme classes
<button className="bg-theme-primary text-theme-inverse">
  Click me
</button>

// ❌ Bad - Hardcoded colors
<button className="bg-orange-500 text-white">
  Click me
</button>
```

## Tailwind Integration

The theme system extends Tailwind's default colors:

```javascript
// tailwind.config.js
theme: {
  extend: {
    colors: {
      primary: {
        500: 'var(--color-primary-500)',
        // ... other shades
      },
    },
  },
}
```

This allows using both `bg-primary-500` and `bg-theme-primary` classes.