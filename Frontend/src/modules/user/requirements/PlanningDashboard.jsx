import { useNavigate } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import Icon from '../../../components/ui/Icon';
import Button from '../../../components/ui/Button';

const PlanningDashboard = () => {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const planningTools = [
    {
      id: 'budget',
      title: 'Budget Planner',
      description: 'Track expenses and manage your wedding budget',
      icon: 'money',
      route: '/user/tools/budget',
      color: '#10b981'
    },
    {
      id: 'checklist',
      title: 'Wedding Checklist',
      description: 'Never miss important wedding tasks',
      icon: 'checkList',
      route: '/user/tools/checklist',
      color: '#f59e0b'
    },
    {
      id: 'timeline',
      title: 'Wedding Timeline',
      description: 'Plan your wedding day schedule',
      icon: 'clock',
      route: '/user/tools/timeline',
      color: '#8b5cf6'
    },
    {
      id: 'guests',
      title: 'Guest List',
      description: 'Manage invitations and RSVPs',
      icon: 'users',
      route: '/user/tools/guests',
      color: '#06b6d4'
    },
    {
      id: 'vendors',
      title: 'Vendor Management',
      description: 'Track and compare wedding vendors',
      icon: 'compare',
      route: '/user/tools/vendors',
      color: '#ec4899'
    },
    {
      id: 'inspiration',
      title: 'Inspiration Board',
      description: 'Save ideas and wedding inspiration',
      icon: 'heart',
      route: '/user/tools/inspiration',
      color: '#ef4444'
    }
  ];

  const upcomingTasks = [
    { task: 'Book wedding venue', dueDate: '2 weeks left', priority: 'high' },
    { task: 'Send save the dates', dueDate: '1 month left', priority: 'medium' },
    { task: 'Book photographer', dueDate: '3 weeks left', priority: 'high' },
    { task: 'Order wedding invitations', dueDate: '6 weeks left', priority: 'low' }
  ];

  const handleBack = () => {
    navigate('/user/wedding-form');
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
              Wedding Planning Dashboard
            </h1>
            <p 
              className="text-sm mt-1"
              style={{ color: theme.semantic.text.secondary }}
            >
              Your complete wedding planning toolkit
            </p>
          </div>
        </div>

        {/* Progress Overview */}
        <div 
          className="p-4 rounded-xl mb-6"
          style={{ 
            background: 'linear-gradient(135deg, #fdf2f8 0%, #fffbeb 100%)',
            border: `1px solid ${theme.semantic.border.accent}`
          }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 
              className="font-bold text-lg"
              style={{ color: theme.semantic.text.primary }}
            >
              Planning Progress
            </h3>
            <span 
              className="text-2xl font-bold"
              style={{ color: theme.colors.primary[500] }}
            >
              25%
            </span>
          </div>
          
          <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
            <div 
              className="progress-bar h-2 rounded-full"
              style={{ 
                width: '25%',
                background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)'
              }}
            />
          </div>
          
          <p 
            className="text-sm"
            style={{ color: theme.semantic.text.secondary }}
          >
            Great start! You've completed the initial planning steps.
          </p>
        </div>
      </div>

      {/* Planning Tools Grid */}
      <div className="px-4 mb-8">
        <h2 
          className="text-xl font-bold mb-4"
          style={{ color: theme.semantic.text.primary }}
        >
          Planning Tools
        </h2>
        
        <div className="grid grid-cols-2 gap-4">
          {planningTools.map((tool) => (
            <div
              key={tool.id}
              onClick={() => navigate(tool.route)}
              className="planning-tool-card cursor-pointer"
            >
              <div 
                className="p-4 rounded-xl"
                style={{ 
                  backgroundColor: theme.semantic.card.background,
                  boxShadow: `0 4px 15px -3px ${theme.semantic.card.shadow}40`,
                  border: `1px solid ${theme.semantic.card.border}`
                }}
              >
                <div 
                  className="w-12 h-12 rounded-full flex items-center justify-center mb-3"
                  style={{ backgroundColor: `${tool.color}20` }}
                >
                  <Icon 
                    name={tool.icon} 
                    size="md" 
                    style={{ color: tool.color }} 
                  />
                </div>
                
                <h3 
                  className="font-bold text-sm mb-1"
                  style={{ color: theme.semantic.text.primary }}
                >
                  {tool.title}
                </h3>
                
                <p 
                  className="text-xs leading-tight"
                  style={{ color: theme.semantic.text.secondary }}
                >
                  {tool.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Tasks */}
      <div className="px-4 mb-8">
        <h2 
          className="text-xl font-bold mb-4"
          style={{ color: theme.semantic.text.primary }}
        >
          Upcoming Tasks
        </h2>
        
        <div className="space-y-3">
          {upcomingTasks.map((item, index) => (
            <div
              key={index}
              className="p-4 rounded-xl flex items-center justify-between"
              style={{ 
                backgroundColor: theme.semantic.card.background,
                border: `1px solid ${theme.semantic.card.border}`
              }}
            >
              <div className="flex items-center space-x-3">
                <div 
                  className={`w-3 h-3 rounded-full ${
                    item.priority === 'high' ? 'task-priority-high' :
                    item.priority === 'medium' ? 'task-priority-medium' : 'task-priority-low'
                  }`}
                />
                <div>
                  <p 
                    className="font-medium text-sm"
                    style={{ color: theme.semantic.text.primary }}
                  >
                    {item.task}
                  </p>
                  <p 
                    className="text-xs"
                    style={{ color: theme.semantic.text.secondary }}
                  >
                    {item.dueDate}
                  </p>
                </div>
              </div>
              
              <Icon 
                name="chevronDown" 
                size="sm" 
                className="-rotate-90"
                style={{ color: theme.semantic.text.tertiary }} 
              />
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => navigate('/user/vendors')}
            className="py-3 text-sm font-bold"
            style={{
              backgroundColor: theme.semantic.button.outline.background,
              color: theme.colors.primary[500],
              border: `2px solid ${theme.colors.primary[200]}`
            }}
          >
            Browse Vendors
          </Button>
          
          <Button
            onClick={() => navigate('/user/inspirations')}
            className="py-3 text-sm font-bold"
            style={{
              background: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
              color: 'white'
            }}
          >
            Get Inspired
          </Button>
        </div>
      </div>

      {/* Bottom spacing */}
      <div className="h-8"></div>
    </div>
  );
};

export default PlanningDashboard;