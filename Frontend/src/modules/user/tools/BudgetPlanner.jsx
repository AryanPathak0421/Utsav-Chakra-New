import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../../../components/ui/Icon';

const BudgetPlanner = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [budgetData, setBudgetData] = useState(null);

  // Simulate loading and fetch budget data
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock budget data - in real app, this would come from API/localStorage
      const mockData = {
        totalBudget: 500000,
        spentAmount: 125000,
        remainingAmount: 375000,
        categories: [
          { name: 'Venue', allocated: 150000, spent: 50000, color: '#ec4899' },
          { name: 'Photography', allocated: 75000, spent: 25000, color: '#f59e0b' },
          { name: 'Catering', allocated: 100000, spent: 30000, color: '#10b981' },
          { name: 'Decoration', allocated: 80000, spent: 20000, color: '#8b5cf6' },
          { name: 'Makeup', allocated: 40000, spent: 0, color: '#06b6d4' },
          { name: 'Others', allocated: 55000, spent: 0, color: '#ef4444' }
        ]
      };
      setBudgetData(mockData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate('/user/planning-dashboard');
  };

  // Calculate percentages for charts
  const getPercentage = (value, total) => ((value / total) * 100).toFixed(1);

  if (isLoading) {
    return (
      <div className="min-h-screen pb-24" style={{ backgroundColor: theme.semantic.background.primary }}>
        <div className="px-4 py-6">
          <div className="flex items-center mb-6">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse mr-3"></div>
            <div>
              <div className="w-32 h-6 bg-gray-200 rounded animate-pulse mb-2"></div>
              <div className="w-48 h-4 bg-gray-200 rounded animate-pulse"></div>
            </div>
          </div>
          
          {/* Loading skeleton for charts */}
          <div className="space-y-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-xl p-4 animate-pulse">
                <div className="w-24 h-4 bg-gray-200 rounded mb-4"></div>
                <div className="w-full h-48 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!budgetData) {
    return (
      <div className="min-h-screen pb-24 flex items-center justify-center" style={{ backgroundColor: theme.semantic.background.primary }}>
        <div className="text-center px-4">
          <Icon name="money" size="xl" style={{ color: theme.colors.primary[300] }} className="mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2" style={{ color: theme.semantic.text.primary }}>
            No Budget Data
          </h2>
          <p className="text-sm mb-6" style={{ color: theme.semantic.text.secondary }}>
            Complete your wedding form to see budget analytics
          </p>
          <button
            onClick={() => navigate('/user/wedding-form')}
            className="px-6 py-3 rounded-lg font-medium"
            style={{ backgroundColor: theme.colors.primary[500], color: 'white' }}
          >
            Set Up Budget
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pb-24" style={{ backgroundColor: theme.semantic.background.primary }}>
      {/* Header */}
      <div className="px-4 py-6">
        <div className="flex items-center mb-6">
          <button
            onClick={handleBack}
            className="mr-3 p-2 rounded-full"
            style={{ backgroundColor: theme.semantic.background.accent }}
          >
            <Icon name="chevronDown" size="sm" className="rotate-90" style={{ color: theme.semantic.text.primary }} />
          </button>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: theme.semantic.text.primary }}>
              Budget Planner
            </h1>
            <p className="text-sm mt-1" style={{ color: theme.semantic.text.secondary }}>
              Track your wedding expenses and budget
            </p>
          </div>
        </div>

        {/* Budget Overview Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
            <p className="text-xs font-medium mb-1" style={{ color: theme.semantic.text.secondary }}>Total Budget</p>
            <p className="text-lg font-bold" style={{ color: theme.colors.primary[600] }}>
              ₹{(budgetData.totalBudget / 1000).toFixed(0)}K
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
            <p className="text-xs font-medium mb-1" style={{ color: theme.semantic.text.secondary }}>Spent</p>
            <p className="text-lg font-bold" style={{ color: theme.colors.secondary[600] }}>
              ₹{(budgetData.spentAmount / 1000).toFixed(0)}K
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
            <p className="text-xs font-medium mb-1" style={{ color: theme.semantic.text.secondary }}>Remaining</p>
            <p className="text-lg font-bold" style={{ color: theme.colors.accent[600] }}>
              ₹{(budgetData.remainingAmount / 1000).toFixed(0)}K
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="px-4 space-y-6">
        {/* Budget Utilization Progress Chart */}
        <div className="bg-white rounded-xl p-4" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: theme.semantic.text.primary }}>
            Budget Utilization
          </h3>
          <div className="relative">
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div 
                className="h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${getPercentage(budgetData.spentAmount, budgetData.totalBudget)}%`,
                  background: `linear-gradient(135deg, ${theme.colors.primary[400]} 0%, ${theme.colors.primary[600]} 100%)`
                }}
              />
            </div>
            <div className="flex justify-between text-sm">
              <span style={{ color: theme.semantic.text.secondary }}>
                {getPercentage(budgetData.spentAmount, budgetData.totalBudget)}% Used
              </span>
              <span style={{ color: theme.semantic.text.secondary }}>
                ₹{budgetData.spentAmount.toLocaleString()} / ₹{budgetData.totalBudget.toLocaleString()}
              </span>
            </div>
          </div>
        </div>

        {/* Category Spending Bar Graph */}
        <div className="bg-white rounded-xl p-4" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: theme.semantic.text.primary }}>
            Category Spending
          </h3>
          <div className="space-y-4">
            {budgetData.categories.map((category, index) => (
              <div key={category.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <span className="text-sm font-medium" style={{ color: theme.semantic.text.primary }}>
                      {category.name}
                    </span>
                  </div>
                  <span className="text-sm" style={{ color: theme.semantic.text.secondary }}>
                    ₹{category.spent.toLocaleString()} / ₹{category.allocated.toLocaleString()}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${getPercentage(category.spent, category.allocated)}%`,
                      backgroundColor: category.color,
                      animationDelay: `${index * 200}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expense Distribution Pie Chart (Visual representation) */}
        <div className="bg-white rounded-xl p-4" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: theme.semantic.text.primary }}>
            Expense Distribution
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {budgetData.categories.map((category) => (
              <div key={category.name} className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: `${category.color}10` }}>
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{ backgroundColor: category.color }}
                />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium truncate" style={{ color: theme.semantic.text.primary }}>
                    {category.name}
                  </p>
                  <p className="text-xs" style={{ color: theme.semantic.text.secondary }}>
                    {getPercentage(category.allocated, budgetData.totalBudget)}%
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Budget Recommendations */}
        <div className="bg-white rounded-xl p-4" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: theme.semantic.text.primary }}>
            Budget Insights
          </h3>
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 rounded-lg" style={{ backgroundColor: theme.colors.accent[50] }}>
              <Icon name="checkList" size="sm" style={{ color: theme.colors.accent[500] }} className="mt-0.5" />
              <div>
                <p className="text-sm font-medium" style={{ color: theme.semantic.text.primary }}>
                  Great Progress!
                </p>
                <p className="text-xs" style={{ color: theme.semantic.text.secondary }}>
                  You've spent {getPercentage(budgetData.spentAmount, budgetData.totalBudget)}% of your budget so far.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 p-3 rounded-lg" style={{ backgroundColor: theme.colors.secondary[50] }}>
              <Icon name="star" size="sm" style={{ color: theme.colors.secondary[500] }} className="mt-0.5" />
              <div>
                <p className="text-sm font-medium" style={{ color: theme.semantic.text.primary }}>
                  Budget Tip
                </p>
                <p className="text-xs" style={{ color: theme.semantic.text.secondary }}>
                  Consider allocating 10-15% extra for unexpected expenses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  );
};

export default BudgetPlanner;