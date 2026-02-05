import { useState, useEffect } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { useLenisContext } from '../../../providers/LenisProvider';
import { useToast } from '../../../components/ui/Toast';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/ui/Icon';
import Card from '../../../components/ui/Card';
import VendorCard from './VendorCardFixed';
import { vendors } from '../../../data/vendors';
import { useTheme } from '../../../hooks/useTheme';

const VendorsList = () => {
  const location = useLocation();
  const { category } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();
  const { showToast, ToastComponent } = useToast();
  
  // Get global Lenis instance
  const lenis = useLenisContext();
  
  const categoryTitle = location.state?.categoryTitle || category || 'Vendors';
  const [sortBy, setSortBy] = useState('rating');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    priceRange: 'all',
    rating: 'all',
    availability: 'all',
    location: 'all'
  });

  // Initialize scroll animations for vendor cards
  useEffect(() => {
    const initializeAnimations = async () => {
      if (!lenis) return;

      // Temporarily disable animations to test click functionality
      console.log('Animations disabled for testing');
      return;

      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger')
      ]);

      gsap.registerPlugin(ScrollTrigger);

      // Animate vendor cards
      const vendorCards = document.querySelectorAll('.vendor-list-card');
      
      vendorCards.forEach((card, index) => {
        gsap.set(card, {
          opacity: 0,
          y: 20,
          scale: 0.98
        });

        ScrollTrigger.create({
          trigger: card,
          start: 'top 90%',
          once: true,
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 0.5,
              ease: 'power1.out',
              delay: index * 0.03
            });
          }
        });
      });
    };

    // Small delay to ensure DOM is ready
    setTimeout(initializeAnimations, 100);
  }, [lenis, sortBy]); // Re-run when sort changes

  const filteredVendors = vendors.filter(vendor => {
    // Category filter
    const matchesCategory = category === 'all' || vendor.category === category;
    
    // Search filter
    const matchesSearch = searchQuery === '' || 
      vendor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      vendor.specialties?.some(specialty => 
        specialty.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    // Price range filter
    const matchesPriceRange = filters.priceRange === 'all' || (() => {
      const price = vendor.price || vendor.priceRange;
      if (!price) return true;
      
      const priceNum = parseInt(price.replace(/[^\d]/g, ''));
      switch (filters.priceRange) {
        case 'budget': return priceNum < 50000;
        case 'mid': return priceNum >= 50000 && priceNum < 150000;
        case 'premium': return priceNum >= 150000;
        default: return true;
      }
    })();
    
    // Rating filter
    const matchesRating = filters.rating === 'all' || (() => {
      const rating = vendor.rating || 0;
      switch (filters.rating) {
        case '4+': return rating >= 4;
        case '4.5+': return rating >= 4.5;
        default: return true;
      }
    })();
    
    // Availability filter
    const matchesAvailability = filters.availability === 'all' || 
      (filters.availability === 'available' && vendor.isAvailable !== false);
    
    return matchesCategory && matchesSearch && matchesPriceRange && matchesRating && matchesAvailability;
  });

  const sortedVendors = [...filteredVendors].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        const priceA = parseInt((a.price || a.priceRange || '0').replace(/[^\d]/g, ''));
        const priceB = parseInt((b.price || b.priceRange || '0').replace(/[^\d]/g, ''));
        return priceA - priceB;
      case 'price-high':
        const priceA2 = parseInt((a.price || a.priceRange || '0').replace(/[^\d]/g, ''));
        const priceB2 = parseInt((b.price || b.priceRange || '0').replace(/[^\d]/g, ''));
        return priceB2 - priceA2;
      default:
        return 0;
    }
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      priceRange: 'all',
      rating: 'all',
      availability: 'all',
      location: 'all'
    });
    setSearchQuery('');
    showToast('All filters cleared', 'info', 2000);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => value !== 'all').length + (searchQuery ? 1 : 0);
  };

  return (
    <div 
      className="min-h-screen"
      style={{ backgroundColor: theme.semantic.background.primary }}
    >
      <div className="px-3 sm:px-4 py-3 max-w-7xl mx-auto">
        {/* Back Button and Title */}
        <div className="flex items-center justify-between mb-4">
          <button 
            onClick={() => navigate('/user/vendors')}
            className="flex items-center space-x-2 text-sm font-medium py-1 px-2 rounded-lg hover:bg-opacity-10 hover:bg-black transition-colors"
            style={{ color: theme.semantic.text.secondary }}
          >
            <Icon name="chevronLeft" size="sm" />
            <span className="hidden xs:inline">Back</span>
          </button>
          
          <h1 
            className="text-base sm:text-lg font-bold text-center flex-1 mx-4"
            style={{ color: theme.semantic.text.primary }}
          >
            {categoryTitle}
          </h1>
          
          <div className="w-12 sm:w-16"></div> {/* Spacer for center alignment */}
        </div>

        {/* Search Bar with Filter */}
        <div className="flex items-center gap-3 mb-4">
          <div className="flex-1 relative">
            <Icon 
              name="search" 
              size="sm" 
              className="absolute left-3 top-1/2 transform -translate-y-1/2"
              style={{ color: theme.semantic.text.secondary }}
            />
            <input
              type="text"
              placeholder={`Search ${categoryTitle.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-xl border text-sm"
              style={{
                backgroundColor: theme.semantic.background.accent,
                borderColor: theme.semantic.border.light,
                color: theme.semantic.text.primary
              }}
            />
          </div>
          
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-xl border transition-all relative ${showFilters ? 'shadow-md' : ''}`}
            style={{
              backgroundColor: showFilters ? theme.colors.primary[500] : theme.semantic.background.accent,
              borderColor: showFilters ? theme.colors.primary[500] : theme.semantic.border.light,
              color: showFilters ? 'white' : theme.semantic.text.primary
            }}
          >
            <Icon name="filter" size="sm" />
            {getActiveFiltersCount() > 0 && (
              <div 
                className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ backgroundColor: theme.colors.accent[500], color: 'white' }}
              >
                {getActiveFiltersCount()}
              </div>
            )}
          </button>
        </div>

        {/* Filter Panel */}
        {showFilters && (
          <Card className="mb-4 p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm" style={{ color: theme.semantic.text.primary }}>
                Filters
              </h3>
              <button
                onClick={clearAllFilters}
                className="text-xs font-medium px-3 py-1 rounded-lg"
                style={{ 
                  color: theme.colors.primary[600],
                  backgroundColor: theme.colors.primary[50]
                }}
              >
                Clear All
              </button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Price Range Filter */}
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: theme.semantic.text.secondary }}>
                  Price Range
                </label>
                <select
                  value={filters.priceRange}
                  onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                  className="vendor-filter-select w-full px-3 py-2 border rounded-lg text-sm"
                  style={{
                    backgroundColor: theme.semantic.background.accent,
                    borderColor: theme.semantic.border.light,
                    color: theme.semantic.text.primary
                  }}
                >
                  <option value="all">All Prices</option>
                  <option value="budget">Under ₹50K</option>
                  <option value="mid">₹50K - ₹1.5L</option>
                  <option value="premium">Above ₹1.5L</option>
                </select>
              </div>

              {/* Rating Filter */}
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: theme.semantic.text.secondary }}>
                  Rating
                </label>
                <select
                  value={filters.rating}
                  onChange={(e) => handleFilterChange('rating', e.target.value)}
                  className="vendor-filter-select w-full px-3 py-2 border rounded-lg text-sm"
                  style={{
                    backgroundColor: theme.semantic.background.accent,
                    borderColor: theme.semantic.border.light,
                    color: theme.semantic.text.primary
                  }}
                >
                  <option value="all">All Ratings</option>
                  <option value="4+">4+ Stars</option>
                  <option value="4.5+">4.5+ Stars</option>
                </select>
              </div>

              {/* Availability Filter */}
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: theme.semantic.text.secondary }}>
                  Availability
                </label>
                <select
                  value={filters.availability}
                  onChange={(e) => handleFilterChange('availability', e.target.value)}
                  className="vendor-filter-select w-full px-3 py-2 border rounded-lg text-sm"
                  style={{
                    backgroundColor: theme.semantic.background.accent,
                    borderColor: theme.semantic.border.light,
                    color: theme.semantic.text.primary
                  }}
                >
                  <option value="all">All Vendors</option>
                  <option value="available">Available Only</option>
                </select>
              </div>

              {/* Sort By */}
              <div>
                <label className="block text-xs font-medium mb-2" style={{ color: theme.semantic.text.secondary }}>
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="vendor-filter-select w-full px-3 py-2 border rounded-lg text-sm"
                  style={{
                    backgroundColor: theme.semantic.background.accent,
                    borderColor: theme.semantic.border.light,
                    color: theme.semantic.text.primary
                  }}
                >
                  <option value="rating">Top Rated</option>
                  <option value="reviews">Most Reviews</option>
                  <option value="name">Name A-Z</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
              </div>
            </div>
          </Card>
        )}
        {/* Results Count */}
        <div 
          className="flex flex-col xs:flex-row xs:items-center xs:justify-between gap-3 xs:gap-0 mb-4 p-3 sm:p-4 rounded-lg"
          style={{
            backgroundColor: theme.semantic.card.background,
            borderColor: theme.semantic.card.border,
            borderWidth: '1px',
            borderStyle: 'solid'
          }}
        >
          <div className="flex items-center justify-between xs:justify-start">
            <span 
              className="text-sm font-medium"
              style={{ color: theme.semantic.text.primary }}
            >
              {sortedVendors.length} vendor{sortedVendors.length !== 1 ? 's' : ''} found
              {searchQuery && (
                <span className="text-xs ml-2" style={{ color: theme.semantic.text.secondary }}>
                  for "{searchQuery}"
                </span>
              )}
            </span>
            <span 
              className="text-xs xs:hidden ml-2"
              style={{ color: theme.semantic.text.secondary }}
            >
              in {categoryTitle}
            </span>
          </div>
          
          {getActiveFiltersCount() > 0 && (
            <div className="flex items-center gap-2">
              <span className="text-xs" style={{ color: theme.semantic.text.secondary }}>
                {getActiveFiltersCount()} filter{getActiveFiltersCount() !== 1 ? 's' : ''} applied
              </span>
              <button
                onClick={clearAllFilters}
                className="text-xs px-2 py-1 rounded"
                style={{ 
                  color: theme.colors.primary[600],
                  backgroundColor: theme.colors.primary[50]
                }}
              >
                Clear
              </button>
            </div>
          )}
        </div>

        {/* Responsive Vendors Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 pb-24">
          {sortedVendors.map((vendor) => {
            console.log('Rendering vendor:', vendor.id, vendor.name, vendor.category);
            return (
              <div key={vendor.id} className="vendor-list-card">
                <VendorCard vendor={vendor} layout="responsive" />
              </div>
            );
          })}
        </div>

        {/* Enhanced Empty State */}
        {sortedVendors.length === 0 && (
          <div 
            className="text-center py-12 sm:py-16 mb-24 rounded-lg mx-auto max-w-md"
            style={{
              backgroundColor: theme.semantic.card.background,
              borderColor: theme.semantic.card.border,
              borderWidth: '1px',
              borderStyle: 'solid'
            }}
          >
            <div className="mb-6 flex justify-center">
              <div 
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                style={{ backgroundColor: theme.colors.primary[50] }}
              >
                <Icon name="noResults" size="2xl" color="muted" />
              </div>
            </div>
            <h3 
              className="text-lg sm:text-xl font-semibold mb-2"
              style={{ color: theme.semantic.text.primary }}
            >
              No vendors found
            </h3>
            <p 
              className="text-sm sm:text-base mb-6 px-4"
              style={{ color: theme.semantic.text.secondary }}
            >
              We couldn't find any {categoryTitle.toLowerCase()} in your area. Try browsing other categories.
            </p>
            <Button 
              onClick={() => navigate('/user/vendors')}
              variant="primary"
              className="px-6 py-2"
            >
              Browse All Categories
            </Button>
          </div>
        )}
      </div>
      
      {/* Toast Component */}
      <ToastComponent />
    </div>
  );
};

export default VendorsList;