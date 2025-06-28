import { motion } from "framer-motion";
import { TrendingUp, Brain, BookOpen, Award, Calendar, Target, ArrowRight, Home, ArrowLeft, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const ProgressPage = () => {
  const navigate = useNavigate();
  const learningStyle = "Visual Learner"; // Hardcoded for now
  const totalQuizzes = 15;
  const averageScore = 87;
  const currentStreak = 7;

  const achievements = [
    { name: "First Quiz", description: "Completed your first quiz", earned: true, icon: "🎯" },
    { name: "Week Warrior", description: "7-day learning streak", earned: true, icon: "🔥" },
    { name: "Quiz Master", description: "Completed 10 quizzes", earned: true, icon: "🏆" },
    { name: "Perfect Score", description: "Got 100% on a quiz", earned: false, icon: "⭐" },
    { name: "Study Buddy", description: "Complete 50 quizzes", earned: false, icon: "👥" }
  ];

  const recentScores = [
    { quiz: "Math Fundamentals", score: 92, date: "Today" },
    { quiz: "Science Basics", score: 85, date: "Yesterday" },  
    { quiz: "History Quiz", score: 88, date: "2 days ago" },
    { quiz: "Geography", score: 91, date: "3 days ago" },
    { quiz: "Literature", score: 79, date: "4 days ago" }
  ];

  const weeklyGoal = 5;
  const completedThisWeek = 3;
  const goalProgress = (completedThisWeek / weeklyGoal) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <TrendingUp className="w-8 h-8 text-emerald-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">My Progress</span>
            </div>
            <Button 
              variant="ghost"
              onClick={() => navigate('/dashboard')}
              className="flex items-center"
            >
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
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
          <div className="bg-gradient-to-r from-emerald-600 to-blue-600 rounded-2xl p-8 text-white">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Great Progress! 🚀
            </h1>
            <p className="text-emerald-100 text-lg">
              You're on track to achieve your learning goals. Keep it up!
            </p>
          </div>
        </motion.div>

        {/* Main Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8"
        >
          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Learning Style</h3>
              <p className="text-2xl font-bold text-purple-600">{learningStyle}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Quizzes Taken</h3>
              <p className="text-2xl font-bold text-blue-600">{totalQuizzes}</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-6 h-6 text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Average Score</h3>
              <p className="text-2xl font-bold text-emerald-600">{averageScore}%</p>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                <Calendar className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-1">Current Streak</h3>
              <p className="text-2xl font-bold text-orange-600">{currentStreak} days</p>
            </CardContent>
          </Card>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Weekly Goal */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Target className="w-5 h-5 mr-2 text-purple-600" />
                  Weekly Goal
                </CardTitle>
                <CardDescription>
                  Complete {weeklyGoal} quizzes this week
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold text-gray-900">
                      {completedThisWeek} / {weeklyGoal}
                    </span>
                    <span className="text-lg text-gray-500">
                      {Math.round(goalProgress)}%
                    </span>
                  </div>
                  <Progress value={goalProgress} className="h-3" />
                  <p className="text-sm text-gray-600">
                    {weeklyGoal - completedThisWeek} more to reach your goal!
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Recent Scores */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle>Recent Scores</CardTitle>
                <CardDescription>
                  Your latest quiz performances
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentScores.map((score, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                      className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <p className="font-medium text-gray-900">{score.quiz}</p>
                        <p className="text-sm text-gray-500">{score.date}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        score.score >= 90 
                          ? 'bg-emerald-100 text-emerald-700'
                          : score.score >= 80
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-amber-100 text-amber-700'
                      }`}>
                        {score.score}%
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Achievements */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <Card className="bg-white border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-600" />
                  Achievements
                </CardTitle>
                <CardDescription>
                  Unlock badges as you learn
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.map((achievement, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                      className={`flex items-center p-3 rounded-lg transition-all ${
                        achievement.earned 
                          ? 'bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200' 
                          : 'bg-gray-50 opacity-60'
                      }`}
                    >
                      <div className="text-2xl mr-3">{achievement.icon}</div>
                      <div className="flex-1">
                        <p className={`font-medium ${achievement.earned ? 'text-gray-900' : 'text-gray-500'}`}>
                          {achievement.name}
                        </p>
                        <p className={`text-sm ${achievement.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                          {achievement.description}
                        </p>
                      </div>
                      {achievement.earned && (
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-xs">✓</span>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Continue Learning CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="mt-8 text-center"
        >
          <Card className="bg-gradient-to-r from-purple-600 to-blue-600 border-0 text-white">
            <CardContent className="p-8">
              <h2 className="text-2xl font-bold mb-4">Ready for Your Next Challenge?</h2>
              <p className="text-purple-100 mb-6">
                Keep building your knowledge with personalized quizzes tailored to your learning style.
              </p>
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                onClick={() => navigate('/personalized-quiz')}
              >
                <Play className="w-4 h-4 mr-2" />
                Take Another Quiz
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProgressPage;
