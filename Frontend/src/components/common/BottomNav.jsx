import { NavLink } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../contexts/AuthContext';
import Icon from '../ui/Icon';

const BottomNav = () => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  
  const navItems = [
    { path: '/user/home', label: 'Home', iconName: 'home' },
    { path: '/user/requirements', label: 'Plan', iconName: 'plan' },
    { path: '/user/vendors', label: 'Vendors', iconName: 'vendors' },
    { path: '/user/news', label: 'News', iconName: 'envelope' },
    { 
      path: '/user/account', 
      label: 'Account', 
      iconName: 'account' 
    },
  ];

  const navStyles = {
    backgroundColor: theme.semantic.navigation.background,
    borderTopColor: theme.semantic.border.accent,
    borderTopWidth: '1px',
    borderTopStyle: 'solid',
    boxShadow: `0 -1px 3px 0 ${theme.semantic.card.shadow}`,
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 md:hidden z-40" style={navStyles}>
      <div className="flex justify-around items-center h-16 px-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className="flex flex-col items-center justify-center flex-1 py-2 px-1 text-xs transition-all duration-200 rounded-lg"
            style={({ isActive }) => ({
              color: isActive ? theme.semantic.navigation.textActive : theme.semantic.navigation.text,
              backgroundColor: isActive ? theme.semantic.navigation.backgroundActive : 'transparent',
            })}
            onMouseEnter={(e) => {
              if (!e.target.classList.contains('active')) {
                e.target.style.color = theme.semantic.text.accent;
                e.target.style.backgroundColor = theme.semantic.navigation.backgroundHover;
              }
            }}
            onMouseLeave={(e) => {
              if (!e.target.classList.contains('active')) {
                e.target.style.color = theme.semantic.navigation.text;
                e.target.style.backgroundColor = 'transparent';
              }
            }}
          >
            <Icon 
              name={item.iconName} 
              size="lg" 
              className="mb-1"
            />
            <span className="text-xs font-medium">{item.label}</span>
          </NavLink>
        ))}
      </div>
      {/* Safe area for devices with home indicator */}
      <div className="h-safe-area-inset-bottom" style={{ backgroundColor: theme.semantic.navigation.background }}></div>
    </nav>
  );
};

export default BottomNav;