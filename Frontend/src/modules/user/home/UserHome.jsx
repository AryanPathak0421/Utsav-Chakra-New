import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { useLenisContext } from '../../../providers/LenisProvider';
import useScrollAnimations from '../../../hooks/useScrollAnimations';
import Icon from '../../../components/ui/Icon';
import AdvertisementSlider from '../../../components/ui/AdvertisementSlider';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import SmartSlider from '../../../components/ui/SmartSlider';
import FeedbackSection from '../../../components/ui/FeedbackSection';
import Banner from '../../../components/ui/Banner';
import FloatingAIButton from '../../../components/common/FloatingAIButton';
import { smartSliderCategories } from '../../../data/smartSliderData';
import { homeBanners } from '../../../data/banners';

const UserHome = () => {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [selectedCity] = useState('Indore');
  const [showStickyHeader, setShowStickyHeader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hoveredIcon, setHoveredIcon] = useState(null);

  // Get global Lenis instance
  const lenis = useLenisContext();

  // Initialize scroll animations
  const { refreshAnimations } = useScrollAnimations();

  // Wedding categories with circular images - Expanded for horizontal scrolling
  const weddingCategories = [
    {
      id: 'venues',
      name: 'Wedding Venues',
      image: 'https://images.unsplash.com/photo-1519167758481-83f29d8ae8e4?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/venues'
    },
    {
      id: 'photographers',
      name: 'Wedding Photographers',
      image: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/photographers'
    },
    {
      id: 'makeup',
      name: 'Bridal Makeup Artists',
      image: 'https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/makeup-artists'
    },
    {
      id: 'decorators',
      name: 'Wedding Decorators',
      image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/decorators'
    },
    {
      id: 'mehndi',
      name: 'Mehndi Artists',
      image: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/mehndi'
    },
    {
      id: 'music-dance',
      name: 'Music & Dance',
      image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/music-dance'
    },
    {
      id: 'bridal-wear',
      name: 'Bridal Wear',
      image: 'https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/bridal-wear'
    },
    {
      id: 'groom-wear',
      name: 'Groom Wear',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/groom-wear'
    },
    {
      id: 'jewellery',
      name: 'Jewellery',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/jewellery'
    },
    {
      id: 'catering',
      name: 'Catering',
      image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/catering'
    },
    {
      id: 'invitations',
      name: 'Invitations',
      image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/invitations'
    },
    {
      id: 'pandits',
      name: 'Wedding Pandits',
      image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center',
      route: '/user/vendors/pandits'
    }
  ];

  // Fix Issue 1: Proper loading state - only run once on mount
  useEffect(() => {
    const initializePage = async () => {
      // Simulate data loading (replace with actual API calls)
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsLoading(false);
      
      // Refresh animations after content loads
      setTimeout(() => {
        refreshAnimations();
      }, 100);
    };

    initializePage();
  }, [refreshAnimations]); // Include refreshAnimations in dependency array

  // Fix Issue 1: Optimize scroll handler with proper cleanup - Use Lenis scroll events
  useEffect(() => {
    if (!lenis) return;

    let lastScrollY = 0;
    
    const handleScroll = (e) => {
      const currentScrollY = e.scroll;
      
      // Show sticky header when scrolling down past 100px
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setShowStickyHeader(true);
      }
      // Hide sticky header when scrolling up or at the top
      else if (currentScrollY < lastScrollY || currentScrollY <= 50) {
        setShowStickyHeader(false);
      }
      
      lastScrollY = currentScrollY;
    };

    lenis.on('scroll', handleScroll);
    
    return () => {
      lenis.off('scroll', handleScroll);
    };
  }, [lenis]); // Depend on lenis instance

  const handleCategoryClick = (category) => {
    navigate(category.route);
  };

  const handleSliderItemClick = (item, index) => {
    console.log('Clicked item:', item, 'at index:', index);
    // Navigate to vendor detail page
    if (item.id) {
      navigate(`/user/vendor/${item.id}`);
    }
  };

  // Navigation handlers for secondary icons
  const handleSearchClick = () => {
    navigate('/user/search');
  };

  const handleChatClick = () => {
    navigate('/user/chats');
  };

  const handleAccountClick = () => {
    navigate('/user/account');
  };

  const handleAddRelativesClick = () => {
    navigate('/user/family/contacts');
  };

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.semantic.background.primary }}>
      {/* SECTION 1 - TOP HEADER */}
      <div 
        className="px-4 py-3 border-b"
        style={{ 
          backgroundColor: theme.semantic.background.primary,
          borderBottomColor: theme.semantic.border.light,
        }}
      >
        <div className="flex justify-between items-center">
          {/* Left - City Selector */}
          <div className="flex items-center space-x-2">
            <span style={{ color: theme.semantic.text.primary }} className="">
              {selectedCity}
            </span>
            <Icon name="chevronDown" size="sm" style={{ color: theme.semantic.text.secondary }} />
          </div>

          {/* Right - Action Icons */}
          <div className="flex items-center space-x-4">
            <button
              onClick={handleSearchClick}
              className="p-1 rounded-lg transition-colors"
              style={{ 
                color: hoveredIcon === 'search' ? theme.semantic.text.primary : theme.semantic.text.secondary,
                backgroundColor: hoveredIcon === 'search' ? theme.semantic.background.accent : 'transparent'
              }}
              onMouseEnter={() => setHoveredIcon('search')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Icon name="search" size="md" />
            </button>
            <button
              onClick={handleChatClick}
              className="p-1 rounded-lg transition-colors"
              style={{ 
                color: hoveredIcon === 'chat' ? theme.semantic.text.primary : theme.semantic.text.secondary,
                backgroundColor: hoveredIcon === 'chat' ? theme.semantic.background.accent : 'transparent'
              }}
              onMouseEnter={() => setHoveredIcon('chat')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Icon name="chat" size="md" />
            </button>
            <button
              onClick={handleAccountClick}
              className="p-1 rounded-lg transition-colors"
              style={{ 
                color: hoveredIcon === 'account' ? theme.semantic.text.primary : theme.semantic.text.secondary,
                backgroundColor: hoveredIcon === 'account' ? theme.semantic.background.accent : 'transparent'
              }}
              onMouseEnter={() => setHoveredIcon('account')}
              onMouseLeave={() => setHoveredIcon(null)}
            >
              <Icon name="account" size="md" />
            </button>
          </div>
        </div>
        
        {/* Add Relatives Button */}
        <div className="px-4 py-3">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={handleAddRelativesClick}
              className="py-3 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              style={{
                backgroundColor: theme.colors.accent[500],
                color: 'white',
                boxShadow: `0 4px 12px ${theme.colors.accent[500]}30`
              }}
            >
              <Icon name="users" size="sm" />
              <span className="font-semibold text-sm">Add Relatives</span>
            </button>
            
            <button
              onClick={() => navigate('/user/family/groups')}
              className="py-3 px-4 rounded-xl transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
              style={{
                backgroundColor: theme.colors.primary[500],
                color: 'white',
                boxShadow: `0 4px 12px ${theme.colors.primary[500]}30`
              }}
            >
              <Icon name="chat" size="sm" />
              <span className="font-semibold text-sm">Family Groups</span>
            </button>
          </div>
        </div>
      </div>

      {/* VISUAL WEDDING CATEGORIES SECTION - Horizontal Scrolling */}
      <div className="py-6 scroll-animate-section">
        <div className="px-4 mb-4">
          <h2 
            className="text-lg font-medium"
            style={{ color: theme.semantic.text.primary }}
          >
            Wedding Services
          </h2>
        </div>
        
        {/* Horizontal Scrolling Container */}
        <div className="overflow-x-auto scrollbar-hide category-scroll-container">
          <div className="flex space-x-4 px-4" style={{ minWidth: 'max-content' }}>
            {weddingCategories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleCategoryClick(category)}
                className="category-item flex-shrink-0 cursor-pointer text-center transition-all duration-200 hover:scale-105"
                style={{ width: '80px' }}
              >
                {/* Circular Image */}
                <div 
                  className="w-16 h-16 mx-auto mb-2 rounded-full overflow-hidden shadow-lg"
                  style={{
                    boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40`
                  }}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-200 hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1519741497674-611481863552?w=300&h=300&fit=crop&q=80';
                    }}
                  />
                </div>
                
                {/* Category Name */}
                <p 
                  className="text-xs line-clamp-2 leading-tight"
                  style={{ color: theme.semantic.text.primary }}
                >
                  {category.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* BANNER 1 - After Categories */}
      <div className="px-4 py-4">
        <Banner
          type={homeBanners[0].type}
          images={homeBanners[0].images}
          title={homeBanners[0].title}
          subtitle={homeBanners[0].subtitle}
          clickAction={homeBanners[0].clickAction}
        />
      </div>

      {/* SMART SLIDER SECTIONS - NO AUTO-SLIDE, MANUAL NAVIGATION ONLY */}
      <div className="space-y-2 overflow-x-hidden">
        {/* Advertisement Section - Premium Sponsored Content */}
        <AdvertisementSlider />

        {/* Trending Vendors */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.trending.title}
            items={smartSliderCategories.trending.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Budget Friendly Picks */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.budget.title}
            items={smartSliderCategories.budget.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* BANNER 2 - Between Sliders */}
        <div className="px-4 py-4">
          <Banner
            type={homeBanners[1].type}
            images={homeBanners[1].images}
            title={homeBanners[1].title}
            subtitle={homeBanners[1].subtitle}
            clickAction={homeBanners[1].clickAction}
          />
        </div>

        {/* Luxury Wedding Specialists */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.luxury.title}
            items={smartSliderCategories.luxury.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Top Rated Vendors */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.topRated.title}
            items={smartSliderCategories.topRated.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* BANNER 3 - Mid Section */}
        <div className="px-4 py-4">
          <Banner
            type={homeBanners[2].type}
            images={homeBanners[2].images}
            title={homeBanners[2].title}
            subtitle={homeBanners[2].subtitle}
            clickAction={homeBanners[2].clickAction}
          />
        </div>

        {/* Value for Money Deals */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.valueForMoney.title}
            items={smartSliderCategories.valueForMoney.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Most Booked This Month */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.mostBooked.title}
            items={smartSliderCategories.mostBooked.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* BANNER 4 - Between More Sliders */}
        <div className="px-4 py-4">
          <Banner
            type={homeBanners[3].type}
            images={homeBanners[3].images}
            title={homeBanners[3].title}
            subtitle={homeBanners[3].subtitle}
            clickAction={homeBanners[3].clickAction}
          />
        </div>

        {/* Newly Added Vendors */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.newVendors.title}
            items={smartSliderCategories.newVendors.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Best for Pre-Wedding Shoots */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.preWeddingShoot.title}
            items={smartSliderCategories.preWeddingShoot.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* BANNER 5 - Near End */}
        <div className="px-4 py-4">
          <Banner
            type={homeBanners[4].type}
            images={homeBanners[4].images}
            title={homeBanners[4].title}
            subtitle={homeBanners[4].subtitle}
            clickAction={homeBanners[4].clickAction}
          />
        </div>

        {/* Best for Sangeet & Entertainment */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.sangeetEntertainment.title}
            items={smartSliderCategories.sangeetEntertainment.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Bridal Favorites */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.bridalFavorites.title}
            items={smartSliderCategories.bridalFavorites.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Editor's Choice */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.editorsChoice.title}
            items={smartSliderCategories.editorsChoice.items}
            onItemClick={handleSliderItemClick}
          />
        </div>

        {/* Near Your Location */}
        <div className="smart-slider-section">
          <SmartSlider
            title={smartSliderCategories.nearLocation.title}
            items={smartSliderCategories.nearLocation.items}
            onItemClick={handleSliderItemClick}
          />
        </div>
      </div>

      {/* FEEDBACK SECTION - Appears at the bottom */}
      <FeedbackSection />

      {/* SECTION 5 - FLOATING ACTION BUTTON */}
      <div className="fixed bottom-20 right-4 z-40 md:bottom-6">
        <button 
          className="w-14 h-14 rounded-full shadow-lg flex items-center justify-center"
          style={{ 
            backgroundColor: theme.colors.primary[500],
            boxShadow: `0 4px 12px ${theme.colors.primary[500]}40`,
          }}
        >
          <Icon name="genie" size="lg" style={{ color: 'white' }} />
        </button>
      </div>

      {/* Bottom spacing for mobile navigation */}
      <div className="h-20 md:h-8"></div>
      
      {/* Floating AI Assistant Button */}
      <FloatingAIButton />
    </div>
  );
};

export default UserHome;