import { useNavigate } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { useTheme } from '../../hooks/useTheme';
import Icon from '../ui/Icon';

const CartIcon = ({ className = '' }) => {
  const { cartState } = useCart();
  const { theme } = useTheme();
  const navigate = useNavigate();

  const handleCartClick = () => {
    navigate('/user/cart');
  };

  return (
    <button
      onClick={handleCartClick}
      className={`relative p-2 rounded-full transition-colors ${className}`}
      style={{
        backgroundColor: cartState.totalItems > 0 ? theme.colors.primary[50] : 'transparent'
      }}
      aria-label={`Cart with ${cartState.totalItems} items`}
    >
      <Icon 
        name="cart" 
        size="md" 
        style={{ 
          color: cartState.totalItems > 0 ? theme.colors.primary[600] : theme.semantic.text.secondary 
        }} 
      />
      
      {/* Cart Badge */}
      {cartState.totalItems > 0 && (
        <div
          className="absolute -top-1 -right-1 min-w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white"
          style={{
            backgroundColor: theme.colors.primary[500],
            minWidth: '20px'
          }}
        >
          {cartState.totalItems > 99 ? '99+' : cartState.totalItems}
        </div>
      )}
    </button>
  );
};

export default CartIcon;