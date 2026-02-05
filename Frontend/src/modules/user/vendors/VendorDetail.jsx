import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { useCart } from '../../../contexts/CartContext';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';
import { vendors } from '../../../data/vendors';

const VendorDetail = () => {
  const { vendorId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { addToCart, isInCart } = useCart();
  
  const [vendor, setVendor] = useState(null);
  const [activeTab, setActiveTab] = useState('pricing');
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isSticky, setIsSticky] = useState(false);
  
  const tabsRef = useRef(null);
  const sectionsRef = useRef({});

  // Mock data for vendor details
  const vendorImages = [
    'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&h=600&fit=crop&q=80',
    'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop&q=80'
  ];

  const pricingData = [
    {
      id: 1,
      name: 'Photo Package',
      description: 'Candid & Traditional',
      price: '₹25,000',
      unit: 'per day',
      icon: 'camera'
    },
    {
      id: 2,
      name: 'Photo + Video',
      description: 'Photo Package & Cinematic Video',
      price: '₹35,000',
      unit: 'per day',
      icon: 'video'
    },
    {
      id: 3,
      name: 'Pre-Wedding Shoot',
      description: '',
      price: '₹15,000',
      unit: 'per day',
      icon: 'heart'
    },
    {
      id: 4,
      name: 'Albums',
      description: '',
      price: '₹5,000',
      unit: 'per 40 pages',
      icon: 'book'
    }
  ];

  const albumsData = [
    {
      id: 1,
      name: 'Portfolio',
      imageCount: 67,
      coverImage: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop&q=80'
    },
    {
      id: 2,
      name: 'Sayali',
      imageCount: 45,
      coverImage: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=300&fit=crop&q=80'
    },
    {
      id: 3,
      name: 'Wedding Collection',
      imageCount: 89,
      coverImage: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop&q=80'
    },
    {
      id: 4,
      name: 'Pre-Wedding',
      imageCount: 23,
      coverImage: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=400&h=300&fit=crop&q=80'
    },
    {
      id: 5,
      name: 'Reception',
      imageCount: 56,
      coverImage: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop&q=80'
    },
    {
      id: 6,
      name: 'Engagement',
      imageCount: 34,
      coverImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=400&h=300&fit=crop&q=80'
    }
  ];

  const videoStories = [
    {
      id: 1,
      thumbnail: 'https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=600&fit=crop&q=80',
      duration: '2:45'
    },
    {
      id: 2,
      thumbnail: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=400&h=600&fit=crop&q=80',
      duration: '1:30'
    }
  ];

  const reviewsData = [
    {
      id: 1,
      name: 'Priya Sharma',
      rating: 5,
      review: 'Honestly at start I was bit skeptical. But as the time passed and I overlooked their work, my skepticism faded. Genuinely they are the feeling makers, truly astonishing work. Keep working hard!',
      timeAgo: '2 months ago',
      initial: 'P'
    },
    {
      id: 2,
      name: 'Anshika Sinha',
      rating: 1,
      review: 'This photographer took our money 10 months ago and never delivered anything. Ignored all our calls. This is fraud! We are going to file a police complaint.',
      timeAgo: '2 months ago',
      initial: 'A'
    }
  ];

  const faqData = [
    {
      id: 1,
      question: 'What all services does The Feeling Makers offer?',
      answer: 'The Feeling Makers offers Maternity Shoots, Pre wedding Films, Drone Photography'
    },
    {
      id: 2,
      question: 'What is the cost of wedding photography & video package by The Feeling Makers?',
      answer: '35,000 - per day wedding photography & video package including Candid photo shoot, traditional photography, cinematic videography'
    },
    {
      id: 3,
      question: 'What is the cost of Wedding Photography package by The Feeling Makers',
      answer: '25,000 - cost of Candid Photography and Traditional Photography'
    }
  ];

  useEffect(() => {
    const foundVendor = vendors.find(v => v.id === parseInt(vendorId));
    if (foundVendor) {
      setVendor(foundVendor);
    } else {
      navigate('/user/vendors');
    }
  }, [vendorId, navigate]);

  useEffect(() => {
    const handleScroll = () => {
      if (tabsRef.current) {
        const tabsTop = tabsRef.current.offsetTop;
        const scrollTop = window.pageYOffset;
        setIsSticky(scrollTop > tabsTop - 100);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const section = sectionsRef.current[tab];
    if (section) {
      const headerHeight = 120; // Approximate header + tabs height
      const elementPosition = section.offsetTop - headerHeight;
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = vendor?.phone || '919876543210';
    const message = `Hi! I'm interested in your ${vendor?.services?.join(', ')} services for my wedding. Can you please share more details?`;
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const handleCall = () => {
    const phoneNumber = vendor?.phone || '919876543210';
    window.open(`tel:${phoneNumber}`, '_self');
  };

  const handleMessage = () => {
    navigate(`/user/chats/${vendorId}`);
  };

  if (!vendor) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: theme.semantic.background.primary }}>
      {/* Hero Image Section */}
      <div className="relative">
        <div className="w-full h-64 sm:h-80 overflow-hidden">
          <img
            src={vendorImages[currentImageIndex]}
            alt={vendor.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Image Counter */}
        <div className="absolute top-4 right-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
          {currentImageIndex + 1} / {vendorImages.length}
        </div>

        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-4 left-4 w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center"
        >
          <Icon name="arrowLeft" size="sm" />
        </button>

        {/* Share & Bookmark */}
        <div className="absolute top-4 right-16 flex gap-2">
          <button className="w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center">
            <Icon name="share" size="sm" />
          </button>
          <button className="w-10 h-10 bg-black bg-opacity-50 text-white rounded-full flex items-center justify-center">
            <Icon name="bookmark" size="sm" />
          </button>
        </div>
      </div>

      {/* Vendor Summary Card */}
      <div className="px-4 -mt-8 relative z-10">
        <div 
          className="rounded-2xl p-4 sm:p-6 shadow-lg"
          style={{ backgroundColor: theme.semantic.card.background }}
        >
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1 min-w-0">
              <h1 
                className="text-xl sm:text-2xl font-semibold mb-2 line-clamp-2"
                style={{ color: theme.semantic.text.primary }}
              >
                {vendor.name}
              </h1>
              
              <div className="flex items-center gap-3 mb-2">
                <div className="flex items-center gap-1">
                  <Icon name="star" size="sm" color="secondary" />
                  <span 
                    className="font-medium text-sm"
                    style={{ color: theme.semantic.text.primary }}
                  >
                    {vendor.rating}
                  </span>
                  <span 
                    className="text-sm"
                    style={{ color: theme.semantic.text.secondary }}
                  >
                    Excellent ({vendor.reviews} Reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Icon name="location" size="sm" color="secondary" />
                <span 
                  className="text-sm flex-1 min-w-0 truncate"
                  style={{ color: theme.semantic.text.secondary }}
                >
                  {vendor.location}
                </span>
                <button 
                  className="text-sm underline flex-shrink-0"
                  style={{ color: theme.colors.primary[600] }}
                >
                  Location
                </button>
              </div>
            </div>

            <button className="p-2 flex-shrink-0">
              <Icon name="more" size="sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div 
        ref={tabsRef}
        className={`px-4 py-3 ${isSticky ? 'shadow-md' : ''}`}
        style={{ backgroundColor: theme.semantic.background.primary }}
      >
        <div className="flex gap-4 sm:gap-6 overflow-x-auto scrollbar-hide">
          {[
            { key: 'pricing', label: 'Pricing' },
            { key: 'projects', label: 'Projects' },
            { key: 'about', label: 'About' },
            { key: 'reviews', label: 'Reviews' }
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleTabClick(tab.key)}
              className={`whitespace-nowrap pb-2 border-b-2 transition-colors text-sm sm:text-base ${
                activeTab === tab.key 
                  ? 'border-current font-medium' 
                  : 'border-transparent'
              }`}
              style={{ 
                color: activeTab === tab.key 
                  ? theme.colors.primary[600] 
                  : theme.semantic.text.secondary 
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="px-4 pb-24 sm:pb-32">
        {/* Pricing Section */}
        <div 
          ref={el => sectionsRef.current['pricing'] = el}
          className="mb-6 sm:mb-8"
        >
          <h2 
            className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
            style={{ color: theme.semantic.text.primary }}
          >
            Pricing Info
          </h2>
          
          <div 
            className="rounded-2xl p-4 sm:p-6 space-y-3 sm:space-y-4"
            style={{ backgroundColor: theme.semantic.card.background }}
          >
            {pricingData.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-2 sm:py-3 border-b border-gray-100 last:border-b-0">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: theme.colors.primary[100] }}
                  >
                    <Icon name={item.icon} size="sm" color="primary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 
                      className="font-medium text-sm sm:text-base line-clamp-1"
                      style={{ color: theme.semantic.text.primary }}
                    >
                      {item.name}
                    </h3>
                    {item.description && (
                      <p 
                        className="text-xs sm:text-sm line-clamp-1"
                        style={{ color: theme.semantic.text.secondary }}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="text-right flex-shrink-0">
                  <div 
                    className="font-bold text-sm sm:text-lg"
                    style={{ color: theme.semantic.text.primary }}
                  >
                    {item.price}
                  </div>
                  <div 
                    className="text-xs sm:text-sm"
                    style={{ color: theme.semantic.text.secondary }}
                  >
                    {item.unit}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Check Availability */}
          <div 
            className="rounded-2xl p-4 sm:p-6 mt-4 sm:mt-6"
            style={{ backgroundColor: theme.semantic.card.background }}
          >
            <h3 
              className="text-base sm:text-lg font-semibold mb-3 sm:mb-4"
              style={{ color: theme.semantic.text.primary }}
            >
              Check Availability
            </h3>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1">
                <input
                  type="date"
                  defaultValue="2028-04-08"
                  className="w-full p-2 sm:p-3 border rounded-lg text-sm sm:text-base"
                  style={{ 
                    borderColor: theme.semantic.card.border,
                    backgroundColor: theme.semantic.background.primary 
                  }}
                />
              </div>
              <Button
                variant="outline"
                className="px-4 sm:px-6 text-sm sm:text-base"
                style={{
                  borderColor: theme.colors.primary[500],
                  color: theme.colors.primary[600]
                }}
              >
                Check Dates
              </Button>
            </div>
          </div>
        </div>

        {/* Projects Section */}
        <div 
          ref={el => sectionsRef.current['projects'] = el}
          className="mb-6 sm:mb-8"
        >
          <div className="flex items-center justify-between mb-3 sm:mb-4">
            <h2 
              className="text-lg sm:text-xl font-semibold"
              style={{ color: theme.semantic.text.primary }}
            >
              Albums <span className="text-sm font-normal">3 nos.</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
            {albumsData.map((album) => (
              <div key={album.id} className="relative">
                <div className="aspect-square rounded-xl overflow-hidden">
                  <img
                    src={album.coverImage}
                    alt={album.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Image Count Badge */}
                <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded text-xs flex items-center gap-1">
                  <Icon name="image" size="xs" />
                  {album.imageCount}
                </div>
                
                {/* Album Name */}
                <div className="absolute bottom-2 left-2">
                  <span className="text-white font-medium text-xs sm:text-sm bg-black bg-opacity-50 px-2 py-1 rounded">
                    {album.name}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <Button
            variant="outline"
            className="w-full mb-4 sm:mb-6 text-sm sm:text-base"
          >
            View All Albums →
          </Button>

          {/* Video Stories */}
          <h3 
            className="text-base sm:text-lg font-semibold mb-3 sm:mb-4"
            style={{ color: theme.semantic.text.primary }}
          >
            Video Stories
          </h3>
          
          <div className="flex gap-3 overflow-x-auto">
            {videoStories.map((video) => (
              <div key={video.id} className="relative flex-shrink-0">
                <div className="w-24 h-36 sm:w-32 sm:h-48 rounded-xl overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt="Video story"
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
                    <Icon name="play" size="sm" color="white" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Custom Quote CTA */}
          <div 
            className="rounded-2xl p-3 sm:p-4 mt-4 sm:mt-6 border-2 border-dashed"
            style={{ borderColor: theme.colors.primary[300] }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                <div 
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: theme.colors.primary[100] }}
                >
                  <Icon name="message" size="sm" color="primary" />
                </div>
                <span 
                  className="font-medium text-sm sm:text-base"
                  style={{ color: theme.semantic.text.primary }}
                >
                  Require Custom quote?
                </span>
              </div>
              <Button
                size="sm"
                className="text-sm"
                style={{
                  backgroundColor: theme.colors.primary[500],
                  color: 'white'
                }}
              >
                Chat Now
              </Button>
            </div>
          </div>
        </div>

        {/* About Section */}
        <div 
          ref={el => sectionsRef.current['about'] = el}
          className="mb-6 sm:mb-8"
        >
          <h2 
            className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
            style={{ color: theme.semantic.text.primary }}
          >
            About
          </h2>
          
          <div 
            className="rounded-2xl p-4 sm:p-6"
            style={{ backgroundColor: theme.semantic.card.background }}
          >
            <p className="mb-3 sm:mb-4 text-sm sm:text-base">
              <span className="font-medium">Been on </span>
              <span style={{ color: theme.colors.primary[600] }}>WedMeGood</span>
              <span className="font-medium"> Since 2 years 9 months</span>
            </p>
            
            <p 
              className="text-sm sm:text-base leading-relaxed mb-3 sm:mb-4"
              style={{ color: theme.semantic.text.secondary }}
            >
              Offering professional photography and videography services, The Feeling Makers is situated in Bhopal of Madhya Pradesh. The team of skillful individuals here have been continuously impressing clients with their artistry and excellence.
            </p>
            
            <div>
              <h4 
                className="font-medium mb-2 text-sm sm:text-base"
                style={{ color: theme.semantic.text.primary }}
              >
                Services provided by The Feeling Makers
              </h4>
              <div className="flex flex-wrap gap-2">
                {vendor.services.map((service) => (
                  <span
                    key={service}
                    className="px-2 sm:px-3 py-1 text-xs sm:text-sm rounded-full"
                    style={{
                      backgroundColor: theme.colors.primary[100],
                      color: theme.colors.primary[700]
                    }}
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div 
          ref={el => sectionsRef.current['reviews'] = el}
          className="mb-6 sm:mb-8"
        >
          <h2 
            className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
            style={{ color: theme.semantic.text.primary }}
          >
            Reviews
          </h2>
          
          <div className="space-y-3 sm:space-y-4">
            {reviewsData.map((review) => (
              <div 
                key={review.id}
                className="rounded-2xl p-4 sm:p-6"
                style={{ backgroundColor: theme.semantic.card.background }}
              >
                <div className="flex items-start gap-3 mb-3">
                  <div 
                    className="w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-white font-medium text-sm flex-shrink-0"
                    style={{ backgroundColor: theme.colors.primary[500] }}
                  >
                    {review.initial}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span 
                        className="font-medium text-sm sm:text-base truncate"
                        style={{ color: theme.semantic.text.primary }}
                      >
                        {review.name}
                      </span>
                      <div className="flex items-center gap-1 flex-shrink-0">
                        {[...Array(5)].map((_, i) => (
                          <Icon
                            key={i}
                            name="star"
                            size="xs"
                            color={i < review.rating ? "secondary" : "gray"}
                          />
                        ))}
                        <span className="text-xs sm:text-sm ml-1">{review.rating}</span>
                      </div>
                    </div>
                    
                    <p 
                      className="text-xs sm:text-sm mb-2"
                      style={{ color: theme.semantic.text.secondary }}
                    >
                      Reviewed {review.timeAgo}
                    </p>
                  </div>
                  
                  <button className="flex-shrink-0">
                    <Icon name="share" size="sm" />
                  </button>
                </div>
                
                <p 
                  className="text-sm sm:text-base leading-relaxed"
                  style={{ color: theme.semantic.text.primary }}
                >
                  {review.review}
                </p>
                
                {review.review.length > 100 && (
                  <button 
                    className="text-sm mt-2"
                    style={{ color: theme.colors.primary[600] }}
                  >
                    Read More
                  </button>
                )}
              </div>
            ))}
          </div>
          
          <Button
            variant="outline"
            className="w-full mt-3 sm:mt-4 text-sm sm:text-base"
          >
            View All Reviews
          </Button>
        </div>

        {/* FAQ Section */}
        <div className="mb-6 sm:mb-8">
          <h2 
            className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4"
            style={{ color: theme.semantic.text.primary }}
          >
            Frequently Asked Questions
          </h2>
          
          <div className="space-y-2 sm:space-y-3">
            {faqData.map((faq) => (
              <details 
                key={faq.id}
                className="rounded-2xl overflow-hidden"
                style={{ backgroundColor: theme.semantic.card.background }}
              >
                <summary 
                  className="p-3 sm:p-4 cursor-pointer font-medium text-sm sm:text-base"
                  style={{ color: theme.semantic.text.primary }}
                >
                  {faq.question}
                </summary>
                <div 
                  className="px-3 sm:px-4 pb-3 sm:pb-4 text-xs sm:text-sm"
                  style={{ color: theme.semantic.text.secondary }}
                >
                  {faq.answer}
                </div>
              </details>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Action Buttons */}
      <div 
        className="fixed bottom-16 left-0 right-0 p-3 sm:p-4 z-30"
        style={{ backgroundColor: theme.semantic.background.primary }}
      >
        <div className="flex gap-2 sm:gap-3 max-w-md mx-auto">
          <Button
            onClick={handleMessage}
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base py-2 sm:py-3"
            style={{
              backgroundColor: theme.colors.primary[500],
              color: 'white'
            }}
          >
            <Icon name="message" size="sm" />
            Message
          </Button>
          
          <Button
            onClick={handleWhatsAppContact}
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base py-2 sm:py-3"
            style={{
              backgroundColor: '#25D366',
              color: 'white'
            }}
          >
            <Icon name="whatsapp" size="sm" />
            WhatsApp
          </Button>
          
          <Button
            onClick={handleCall}
            variant="outline"
            className="flex-1 flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base py-2 sm:py-3"
          >
            <Icon name="phone" size="sm" />
            Call
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VendorDetail;