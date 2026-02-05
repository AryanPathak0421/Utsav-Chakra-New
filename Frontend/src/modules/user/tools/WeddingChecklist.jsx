import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../../../components/ui/Icon';

const WeddingChecklist = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const [checklistData, setChecklistData] = useState(null);

  // Simulate loading and fetch checklist data
  useEffect(() => {
    const timer = setTimeout(() => {
      // Mock checklist data
      const mockData = {
        totalTasks: 24,
        completedTasks: 8,
        pendingTasks: 16,
        weeklyProgress: [
          { week: 'Week 1', completed: 2 },
          { week: 'Week 2', completed: 3 },
          { week: 'Week 3', completed: 2 },
          { week: 'Week 4', completed: 1 },
          { week: 'Current', completed: 0 }
        ],
        categories: [
          { name: 'Venue & Catering', total: 6, completed: 3, color: '#ec4899' },
          { name: 'Photography', total: 4, completed: 2, color: '#f59e0b' },
          { name: 'Attire & Beauty', total: 5, completed: 2, color: '#10b981' },
          { name: 'Invitations', total: 3, completed: 1, color: '#8b5cf6' },
          { name: 'Decorations', total: 4, completed: 0, color: '#06b6d4' },
          { name: 'Miscellaneous', total: 2, completed: 0, color: '#ef4444' }
        ],
        recentTasks: [
          { task: 'Book wedding venue', completed: true, dueDate: '2 weeks ago' },
          { task: 'Send save the dates', completed: true, dueDate: '1 week ago' },
          { task: 'Book photographer', completed: false, dueDate: 'Due in 3 days' },
          { task: 'Order wedding cake', completed: false, dueDate: 'Due in 1 week' }
        ]
      };
      setChecklistData(mockData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBack = () => {
    navigate('/user/planning-dashboard');
  };

  const getPercentage = (completed, total) => ((completed / total) * 100).toFixed(1);

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

  if (!checklistData) {
    return (
      <div className="min-h-screen pb-24 flex items-center justify-center" style={{ backgroundColor: theme.semantic.background.primary }}>
        <div className="text-center px-4">
          <Icon name="checkList" size="xl" style={{ color: theme.colors.secondary[300] }} className="mx-auto mb-4" />
          <h2 className="text-xl font-bold mb-2" style={{ color: theme.semantic.text.primary }}>
            No Checklist Data
          </h2>
          <p className="text-sm mb-6" style={{ color: theme.semantic.text.secondary }}>
            Start planning to see your wedding checklist progress
          </p>
          <button
            onClick={() => navigate('/user/wedding-form')}
            className="px-6 py-3 rounded-lg font-medium"
            style={{ backgroundColor: theme.colors.secondary[500], color: 'white' }}
          >
            Start Planning
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
              Wedding Checklist
            </h1>
            <p className="text-sm mt-1" style={{ color: theme.semantic.text.secondary }}>
              Track your wedding planning progress
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
            <p className="text-xs font-medium mb-1" style={{ color: theme.semantic.text.secondary }}>Total Tasks</p>
            <p className="text-lg font-bold" style={{ color: theme.colors.secondary[600] }}>
              {checklistData.totalTasks}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
            <p className="text-xs font-medium mb-1" style={{ color: theme.semantic.text.secondary }}>Completed</p>
            <p className="text-lg font-bold" style={{ color: theme.colors.accent[600] }}>
              {checklistData.completedTasks}
            </p>
          </div>
          <div className="bg-white rounded-xl p-4 text-center" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
            <p className="text-xs font-medium mb-1" style={{ color: theme.semantic.text.secondary }}>Pending</p>
            <p className="text-lg font-bold" style={{ color: theme.colors.primary[600] }}>
              {checklistData.pendingTasks}
            </p>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="px-4 space-y-6">
        {/* Task Completion Progress Chart */}
        <div className="bg-white rounded-xl p-4" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: theme.semantic.text.primary }}>
            Overall Progress
          </h3>
          <div className="relative mb-4">
            <div className="w-full bg-gray-200 rounded-full h-4">
              <div 
                className="h-4 rounded-full transition-all duration-1000 ease-out"
                style={{ 
                  width: `${getPercentage(checklistData.completedTasks, checklistData.totalTasks)}%`,
                  background: `linear-gradient(135deg, ${theme.colors.secondary[400]} 0%, ${theme.colors.secondary[600]} 100%)`
                }}
              />
            </div>
            <div className="flex justify-between text-sm mt-2">
              <span style={{ color: theme.semantic.text.secondary }}>
                {getPercentage(checklistData.completedTasks, checklistData.totalTasks)}% Complete
              </span>
              <span style={{ color: theme.semantic.text.secondary }}>
                {checklistData.completedTasks} of {checklistData.totalTasks} tasks
              </span>
            </div>
          </div>
          
          {/* Donut Chart Visual */}
          <div className="flex items-center justify-center space-x-8 mt-6">
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2"
                style={{ 
                  background: `conic-gradient(${theme.colors.accent[500]} ${getPercentage(checklistData.completedTasks, checklistData.totalTasks)}%, ${theme.colors.neutral[200]} 0)`
                }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.semantic.background.primary }}
                >
                  <span className="text-xs font-bold" style={{ color: theme.colors.accent[600] }}>
                    {getPercentage(checklistData.completedTasks, checklistData.totalTasks)}%
                  </span>
                </div>
              </div>
              <p className="text-xs font-medium" style={{ color: theme.semantic.text.secondary }}>
                Completed
              </p>
            </div>
            <div className="text-center">
              <div 
                className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-2"
                style={{ 
                  background: `conic-gradient(${theme.colors.primary[500]} ${getPercentage(checklistData.pendingTasks, checklistData.totalTasks)}%, ${theme.colors.neutral[200]} 0)`
                }}
              >
                <div 
                  className="w-10 h-10 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: theme.semantic.background.primary }}
                >
                  <span className="text-xs font-bold" style={{ color: theme.colors.primary[600] }}>
                    {getPercentage(checklistData.pendingTasks, checklistData.totalTasks)}%
                  </span>
                </div>
              </div>
              <p className="text-xs font-medium" style={{ color: theme.semantic.text.secondary }}>
                Pending
              </p>
            </div>
          </div>
        </div>

        {/* Weekly Progress Line Graph */}
        <div className="bg-white rounded-xl p-4" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: theme.semantic.text.primary }}>
            Weekly Progress
          </h3>
          <div className="space-y-3">
            {checklistData.weeklyProgress.map((week, index) => (
              <div key={week.week} className="flex items-center space-x-4">
                <div className="w-16 text-xs font-medium" style={{ color: theme.semantic.text.secondary }}>
                  {week.week}
                </div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${(week.completed / 5) * 100}%`,
                        backgroundColor: theme.colors.secondary[500],
                        animationDelay: `${index * 200}ms`
                      }}
                    />
                  </div>
                </div>
                <div className="w-8 text-xs font-bold text-right" style={{ color: theme.semantic.text.primary }}>
                  {week.completed}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl p-4" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: theme.semantic.text.primary }}>
            Category Progress
          </h3>
          <div className="space-y-4">
            {checklistData.categories.map((category, index) => (
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
                    {category.completed}/{category.total}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full transition-all duration-1000 ease-out"
                    style={{ 
                      width: `${getPercentage(category.completed, category.total)}%`,
                      backgroundColor: category.color,
                      animationDelay: `${index * 200}ms`
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tasks */}
        <div className="bg-white rounded-xl p-4" style={{ boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40` }}>
          <h3 className="font-bold text-lg mb-4" style={{ color: theme.semantic.text.primary }}>
            Recent Tasks
          </h3>
          <div className="space-y-3">
            {checklistData.recentTasks.map((task, index) => (
              <div key={index} className="flex items-center space-x-3 p-3 rounded-lg" style={{ backgroundColor: theme.semantic.background.secondary }}>
                <div 
                  className={`w-5 h-5 rounded-full flex items-center justify-center ${
                    task.completed ? 'bg-green-500' : 'bg-gray-300'
                  }`}
                >
                  {task.completed && (
                    <Icon name="check" size="xs" style={{ color: 'white' }} />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className={`text-sm font-medium ${task.completed ? 'line-through' : ''}`} style={{ color: theme.semantic.text.primary }}>
                    {task.task}
                  </p>
                  <p className="text-xs" style={{ color: theme.semantic.text.secondary }}>
                    {task.dueDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  );
};

export default WeddingChecklist;