import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../hooks/useTheme';
import Button from '../ui/Button';
import Icon from '../ui/Icon';

const Welcome = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Trigger animations after component mounts
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleLogin = () => {
    navigate('/login');
  };

  const handleRegister = () => {
    navigate('/signup');
  };

  const handleSocialLogin = (provider) => {
    console.log(`Social login with ${provider}`);
    // Implement social login logic here
  };

  return (
    <div className="welcome-container">
      {/* Background with wedding theme */}
      <div className="welcome-background">
        <div className="welcome-gradient-overlay" />
        <div className="welcome-particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="welcome-particle"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className={`welcome-content ${isLoaded ? 'welcome-content-loaded' : ''}`}>
        {/* Logo Section */}
        <div className="welcome-logo-section">
          <div className="welcome-logo">
            <div 
              className="welcome-logo-icon"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.accent[500]})`
              }}
            >
              <span className="welcome-logo-text">UC</span>
            </div>
          </div>
          <h1 
            className="welcome-brand-name"
            style={{ color: theme.semantic.text.primary }}
          >
            UtsavChakra
          </h1>
          <p 
            className="welcome-tagline"
            style={{ color: theme.semantic.text.secondary }}
          >
            Your Dream Wedding Awaits
          </p>
        </div>

        {/* Welcome Message */}
        <div className="welcome-message-section">
          <h2 
            className="welcome-heading"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.accent[500]})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Welcome to Your
          </h2>
          <h2 
            className="welcome-heading-accent"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.accent[500]}, ${theme.colors.primary[500]})`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            Perfect Wedding Journey
          </h2>
        </div>

        {/* CTA Buttons */}
        <div className="welcome-cta-section">
          <Button
            variant="primary"
            size="lg"
            onClick={handleLogin}
            className="welcome-cta-button welcome-login-button"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.primary[500]}, ${theme.colors.primary[600]})`,
              border: 'none',
              boxShadow: `0 8px 32px ${theme.colors.primary[500]}40`
            }}
          >
            <span className="welcome-button-text">Login</span>
          </Button>

          <Button
            variant="secondary"
            size="lg"
            onClick={handleRegister}
            className="welcome-cta-button welcome-register-button"
            style={{
              background: `linear-gradient(135deg, ${theme.colors.accent[500]}, ${theme.colors.accent[600]})`,
              border: 'none',
              color: 'white',
              boxShadow: `0 8px 32px ${theme.colors.accent[500]}40`
            }}
          >
            <span className="welcome-button-text">Register</span>
          </Button>
        </div>

        {/* Social Login Section */}
        <div className="welcome-social-section">
          <div className="welcome-divider">
            <div 
              className="welcome-divider-line"
              style={{ backgroundColor: theme.semantic.border.light }}
            />
            <span 
              className="welcome-divider-text"
              style={{ 
                color: theme.semantic.text.tertiary,
                backgroundColor: theme.semantic.background.primary
              }}
            >
              OR WITH
            </span>
            <div 
              className="welcome-divider-line"
              style={{ backgroundColor: theme.semantic.border.light }}
            />
          </div>

          <div className="welcome-social-buttons">
            <button
              onClick={() => handleSocialLogin('facebook')}
              className="welcome-social-button welcome-facebook-button"
              style={{
                backgroundColor: theme.semantic.background.primary,
                borderColor: theme.semantic.border.light,
                color: '#1877F2'
              }}
            >
              <Icon name="facebook" size="sm" style={{ color: '#1877F2' }} />
              <span>Facebook</span>
            </button>

            <button
              onClick={() => handleSocialLogin('google')}
              className="welcome-social-button welcome-google-button"
              style={{
                backgroundColor: theme.semantic.background.primary,
                borderColor: theme.semantic.border.light,
                color: '#DB4437'
              }}
            >
              <Icon name="google" size="sm" style={{ color: '#DB4437' }} />
              <span>Google</span>
            </button>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="welcome-decorative-elements">
          <div className="welcome-mandala welcome-mandala-1">
            <div className="welcome-mandala-ring" style={{ borderColor: `${theme.colors.primary[300]}40` }} />
            <div className="welcome-mandala-ring" style={{ borderColor: `${theme.colors.accent[300]}40` }} />
          </div>
          <div className="welcome-mandala welcome-mandala-2">
            <div className="welcome-mandala-ring" style={{ borderColor: `${theme.colors.accent[300]}40` }} />
            <div className="welcome-mandala-ring" style={{ borderColor: `${theme.colors.primary[300]}40` }} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Welcome;