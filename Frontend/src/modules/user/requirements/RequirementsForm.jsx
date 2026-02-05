import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';

const RequirementsForm = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  
  // Wedding service categories with high-quality images
  const serviceCategories = [
    {
      id: 'venues',
      name: 'Venues',
      subtitle: 'Banquet halls, lawns & destinations',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29d8ae8e4?w=400&h=300&fit=crop&crop=center',
      icon: 'home'
    },
    {
      id: 'photographers',
      name: 'Wedding Photographers',
      subtitle: 'Capture your special moments',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop&crop=center',
      icon: 'camera'
    },
    {
      id: 'makeup',
      name: 'Bridal Makeup Artists',
      subtitle: 'Look stunning on your big day',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=400&h=300&fit=crop&crop=center',
      icon: 'sparkles'
    },
    {
      id: 'planners',
      name: 'Wedding Planners & Decor',
      subtitle: 'Complete event management',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop&crop=center',
      icon: 'plan'
    },
    {
      id: 'mehndi',
      name: 'Mehndi Artists',
      subtitle: 'Beautiful henna designs',
      image: 'https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=400&h=300&fit=crop&crop=center',
      icon: 'heart'
    },
    {
      id: 'catering',
      name: 'Catering Services',
      subtitle: 'Delicious food for your guests',
      image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=400&h=300&fit=crop&crop=center',
      icon: 'star'
    },
    {
      id: 'entertainment',
      name: 'DJ / Music & Entertainment',
      subtitle: 'Keep the celebration alive',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=400&h=300&fit=crop&crop=center',
      icon: 'music'
    },
    {
      id: 'prewedding',
      name: 'Pre-Wedding Shoot',
      subtitle: 'Romantic couple photography',
      image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop&crop=center',
      icon: 'camera'
    },
    {
      id: 'bridalwear',
      name: 'Bridal Wear',
      subtitle: 'Stunning outfits for the bride',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=400&h=300&fit=crop&crop=center',
      icon: 'sparkles'
    },
    {
      id: 'groomwear',
      name: 'Groom Wear',
      subtitle: 'Elegant attire for the groom',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop&crop=center',
      icon: 'account'
    },
    {
      id: 'jewellery',
      name: 'Jewellery',
      subtitle: 'Exquisite wedding jewelry',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&crop=center',
      icon: 'rings'
    },
    {
      id: 'invitations',
      name: 'Invitations & Gifts',
      subtitle: 'Beautiful cards & return gifts',
      image: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=400&h=300&fit=crop&crop=center',
      icon: 'envelope'
    },
    {
      id: 'pandit',
      name: 'Pandit / Ritual Services',
      subtitle: 'Traditional ceremony guidance',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop&crop=center',
      icon: 'verified'
    }
  ];

  const [selectedServices, setSelectedServices] = useState([]);
  const [showPlanningPrompt, setShowPlanningPrompt] = useState(false);

  // Show planning prompt on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      
      // Show prompt when user scrolls down more than half the screen
      if (scrollPosition > windowHeight * 0.3) {
        setShowPlanningPrompt(true);
      } else {
        setShowPlanningPrompt(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleServiceToggle = (serviceId) => {
    setSelectedServices(prev => 
      prev.includes(serviceId)
        ? prev.filter(id => id !== serviceId)
        : [...prev, serviceId]
    );
  };

  const handleContinue = () => {
    if (selectedServices.length === 0) {
      return; // Don't proceed if no services selected
    }
    
    // Store selected services (in real app, this would go to backend/context)
    localStorage.setItem('selectedServices', JSON.stringify(selectedServices));
    
    // Navigate to next step (could be budget planning, vendor listings, etc.)
    navigate('/user/vendors', { 
      state: { 
        selectedServices,
        fromRequirements: true 
      } 
    });
  };

  const handleBack = () => {
    navigate('/user/home');
  };

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: theme.semantic.background.primary }}>
      {/* Header Section */}
      <div className="px-4 py-6">
        <div className="flex items-center mb-4">
          <button
            onClick={handleBack}
            className="mr-3 p-2 rounded-full"
            style={{ backgroundColor: theme.semantic.background.accent }}
          >
            <Icon name="chevronDown" size="sm" className="rotate-90" style={{ color: theme.semantic.text.primary }} />
          </button>
          <div>
            <h1 
              className="text-2xl font-bold"
              style={{ color: theme.semantic.text.primary }}
            >
              Plan Your Wedding
            </h1>
            <p 
              className="text-sm mt-1"
              style={{ color: theme.semantic.text.secondary }}
            >
              Explore services and get personalized recommendations
            </p>
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center space-x-2 mb-6">
          <div 
            className="flex-1 h-1 rounded-full"
            style={{ backgroundColor: theme.colors.primary[500] }}
          />
          <div 
            className="flex-1 h-1 rounded-full"
            style={{ backgroundColor: theme.semantic.border.light }}
          />
          <div 
            className="flex-1 h-1 rounded-full"
            style={{ backgroundColor: theme.semantic.border.light }}
          />
        </div>

        {/* Selection Counter */}
        <div 
          className="text-center py-3 px-4 rounded-lg mb-6"
          style={{ backgroundColor: theme.semantic.background.accent }}
        >
          <p 
            className="text-sm font-medium"
            style={{ color: theme.semantic.text.primary }}
          >
            {selectedServices.length} service{selectedServices.length !== 1 ? 's' : ''} selected
          </p>
        </div>
      </div>

      {/* Service Categories Grid */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-4">
          {serviceCategories.map((service) => {
            const isSelected = selectedServices.includes(service.id);
            
            return (
              <div
                key={service.id}
                onClick={() => handleServiceToggle(service.id)}
                className={`relative cursor-pointer transition-all duration-300 rounded-2xl overflow-hidden ${
                  isSelected ? 'scale-95' : 'hover:scale-105'
                }`}
                style={{
                  backgroundColor: theme.semantic.card.background,
                  boxShadow: isSelected 
                    ? `0 8px 25px -5px ${theme.colors.primary[500]}40, 0 0 0 2px ${theme.colors.primary[500]}`
                    : `0 4px 15px -3px ${theme.semantic.card.shadow}40`,
                }}
              >
                {/* Image */}
                <div className="relative h-32 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.name}
                    className="w-full h-full object-cover transition-transform duration-300"
                    style={{
                      transform: isSelected ? 'scale(1.05)' : 'scale(1)',
                      filter: isSelected ? 'brightness(0.9)' : 'brightness(1)'
                    }}
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/400x300?text=Wedding+Service';
                    }}
                  />
                  
                  {/* Overlay */}
                  <div 
                    className={`absolute inset-0 transition-opacity duration-300 ${
                      isSelected ? 'opacity-20' : 'opacity-0'
                    }`}
                    style={{ backgroundColor: theme.colors.primary[500] }}
                  />
                  
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div 
                      className="absolute top-2 right-2 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ backgroundColor: theme.colors.primary[500] }}
                    >
                      <Icon name="check" size="xs" style={{ color: 'white' }} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-3">
                  <h3 
                    className={`font-bold text-sm mb-1 line-clamp-2 transition-colors duration-300 ${
                      isSelected ? 'text-primary' : ''
                    }`}
                    style={{ 
                      color: isSelected 
                        ? theme.colors.primary[600] 
                        : theme.semantic.text.primary 
                    }}
                  >
                    {service.name}
                  </h3>
                  <p 
                    className="text-xs line-clamp-2"
                    style={{ color: theme.semantic.text.secondary }}
                  >
                    {service.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom spacing for sticky buttons */}
      <div className="h-32"></div>

      {/* Fixed CTA Button - Start Wedding Planning */}
      <div className="fixed bottom-32 left-4 right-4 z-50 md:bottom-28">
        <button
          onClick={() => navigate('/user/wedding-form')}
          className="wedding-planning-cta w-full py-4 px-6 rounded-full font-bold text-white text-base"
        >
          ✨ Start Wedding Planning
        </button>
      </div>

      {/* Sticky Continue Button */}
      <div 
        className="fixed bottom-16 left-0 right-0 p-4 border-t safe-area-pb md:bottom-6"
        style={{ 
          backgroundColor: theme.semantic.background.primary,
          borderTopColor: theme.semantic.border.light
        }}
      >
        <Button
          onClick={handleContinue}
          disabled={selectedServices.length === 0}
          className="w-full py-3 text-base font-bold transition-all duration-200"
          style={{
            backgroundColor: selectedServices.length > 0 
              ? theme.colors.primary[500] 
              : theme.semantic.background.accent,
            color: selectedServices.length > 0 
              ? 'white' 
              : theme.semantic.text.secondary,
            opacity: selectedServices.length > 0 ? 1 : 0.6
          }}
        >
          {selectedServices.length > 0 
            ? `Continue with ${selectedServices.length} service${selectedServices.length !== 1 ? 's' : ''}` 
            : 'Select at least one service'
          }
        </Button>
      </div>
    </div>
  );
};

export default RequirementsForm;