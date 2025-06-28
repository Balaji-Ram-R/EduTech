import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Brain, BookOpen, TrendingUp, User, Bell, Settings, LogOut, Play, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { getDashboardData } from "@/lib/database";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState<any>(null);
  
  const quickActions = [
    {
      title: "Take Learning Style Quiz",
      description: "Discover how you learn best",
      icon: Brain,
      color: "from-purple-500 to-purple-600",
      href: "/learning-quiz",
      isCompleted: false
    },
    {
      title: "Start Personalized Quiz",
      description: "Custom questions for your style",
      icon: BookOpen,
      color: "from-blue-500 to-blue-600",
      href: "/personalized-quiz",
      isCompleted: false
    },
    {
      title: "View My Progress",
      description: "Track your learning journey",
      icon: TrendingUp,
      color: "from-emerald-500 to-emerald-600",
      href: "/progress",
      isCompleted: false
    }
  ];

  const recentActivity = [
    { action: "Completed Visual Learning Quiz", time: "2 hours ago", icon: Award },
    { action: "Started Math Fundamentals", time: "1 day ago", icon: Play },
    { action: "Updated learning goals", time: "3 days ago", icon: Settings }
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      if (user) {
        try {
          const data = await getDashboardData(user.id);
          setDashboardData(data);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
          toast({
            title: "Error loading dashboard",
            description: "Failed to load your data. Please try again.",
            variant: "destructive",
          });
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDashboardData();
  }, [user, toast]);

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/');
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  const userName = dashboardData?.profile?.full_name || user?.user_metadata?.full_name || "User";
  const learningStreak = dashboardData?.progress?.learning_streak || 0;
  const totalQuizzes = dashboardData?.quizStats?.totalQuizzes || 0;
  const averageScore = dashboardData?.quizStats?.averageScore || 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="flex items-center">
                <Brain className="w-8 h-8 text-purple-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">LearnNexus</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" onClick={handleSignOut}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold mb-2">
                  Welcome back, {userName}! 👋
                </h1>
                <p className="text-purple-100 text-lg">
                  Ready to continue your learning journey? Let's make today productive!
                </p>
              </div>
              <div className="hidden md:block">
                <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center">
                  <User className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Learning Streak</p>
                  <p className="text-2xl font-bold text-gray-900">{learningStreak} days</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Quizzes Completed</p>
                  <p className="text-2xl font-bold text-gray-900">{totalQuizzes}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                  <Award className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Average Score</p>
                  <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="lg:col-span-2"
          >
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Quick Actions</CardTitle>
                <CardDescription>
                  Choose what you'd like to do next
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-4">
                  {quickActions.map((action, index) => (
                    <motion.div
                      key={action.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
                      onClick={() => navigate(action.href)}
                      className="group p-6 rounded-xl border border-gray-200 hover:border-transparent hover:shadow-xl bg-gradient-to-r hover:from-gray-50 hover:to-white cursor-pointer transition-all duration-300 transform hover:-translate-y-1"
                    >
                      <div className="flex items-center">
                        <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${action.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                          <action.icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-700">
                            {action.title}
                          </h3>
                          <p className="text-gray-600 text-sm">{action.description}</p>
                        </div>
                        <div className="ml-4">
                          <Button
                            size="sm"
                            className="bg-gray-100 text-gray-700 hover:bg-gray-200 border-0"
                          >
                            Start
                          </Button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Activity */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="text-xl">Recent Activity</CardTitle>
                <CardDescription>
                  Your latest learning activities
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-4">
                  {recentActivity.map((activity, index) => (
                    <motion.div
                      key={activity.action}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.4 }}
                      className="flex items-center space-x-3"
                    >
                      <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                        <activity.icon className="w-4 h-4 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
