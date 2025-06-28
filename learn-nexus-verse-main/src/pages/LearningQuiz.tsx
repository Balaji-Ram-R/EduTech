import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, ChevronLeft, Brain, CheckCircle, XCircle, ArrowRight, ArrowLeft, Timer, Target, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const LearningQuiz = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const styleMap = ['Visual', 'Auditory', 'Kinesthetic', 'Reading/Writing'];
  const [showResult, setShowResult] = useState(false);
  const [dominantStyle, setDominantStyle] = useState<string | null>(null);
  const [styleCounts, setStyleCounts] = useState<{ [key: string]: number }>({});

  const questions = [
    {
      question: "When learning something new, I prefer to:",
      options: [
        "See diagrams, charts, or visual demonstrations",
        "Listen to explanations or discussions", 
        "Practice hands-on activities or experiments",
        "Read detailed written instructions"
      ]
    },
    {
      question: "In a classroom setting, I learn best when:",
      options: [
        "The teacher uses colorful presentations and visual aids",
        "There are group discussions and verbal explanations",
        "I can participate in interactive activities",
        "I have detailed notes and written materials"
      ]
    },
    {
      question: "When I need to remember directions, I:",
      options: [
        "Visualize the route in my mind",
        "Repeat the directions out loud",
        "Walk through the route once",
        "Write down the step-by-step directions"
      ]
    },
    {
      question: "My ideal study environment includes:",
      options: [
        "Bright colors, charts, and visual organizers",
        "Background music or the ability to discuss topics",
        "Space to move around and use manipulatives",
        "Quiet space with organized written materials"
      ]
    },
    {
      question: "When solving problems, I tend to:",
      options: [
        "Draw diagrams or create visual representations",
        "Talk through the problem with others",
        "Use trial and error with hands-on approaches",
        "Make detailed lists and written plans"
      ]
    }
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    setSelectedAnswer(answerIndex);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const newAnswers = [...answers];
      newAnswers[currentQuestion] = selectedAnswer;
      setAnswers(newAnswers);
      setSelectedAnswer(null);

      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        // Quiz completed: tally results
        const counts: { [key: string]: number } = { Visual: 0, Auditory: 0, Kinesthetic: 0, 'Reading/Writing': 0 };
        newAnswers.forEach((ans) => {
          const style = styleMap[ans];
          counts[style]++;
        });
        setStyleCounts(counts);
        // Find dominant style
        let max = 0;
        let domStyle = '';
        for (const style in counts) {
          if (counts[style] > max) {
            max = counts[style];
            domStyle = style;
          }
        }
        setDominantStyle(domStyle);
        setShowResult(true);
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswer(answers[currentQuestion - 1] || null);
    }
  };

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-blue-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Brain className="w-8 h-8 text-purple-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Learning Style Quiz</span>
            </div>
            <Button 
              variant="ghost" 
              onClick={() => navigate('/dashboard')}
            >
              <X className="w-4 h-4 mr-2" />
              Exit Quiz
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="text-center mb-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              Question {currentQuestion + 1} of {questions.length}
            </h1>
            <p className="text-gray-600">
              Discover your unique learning style
            </p>
          </div>
          <Progress value={progress} className="h-3 bg-gray-200" />
        </motion.div>

        {showResult ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center bg-white rounded-2xl shadow-xl p-8 border border-gray-100 max-w-xl mx-auto"
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-700">Your Dominant Learning Style:</h2>
            <div className="text-3xl font-extrabold mb-2 text-blue-700">{dominantStyle}</div>
            <div className="mb-4 text-gray-700">(AI-powered description coming soon!)</div>
            <div className="mt-6">
              <Button onClick={() => navigate('/dashboard')} className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">Go to Dashboard</Button>
            </div>
          </motion.div>
        ) : (
          <>
            {/* Question Card */}
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-white border-0 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl text-center text-gray-900">
                    {questions[currentQuestion].question}
                  </CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-8">
                  <div className="space-y-4">
                    {questions[currentQuestion].options.map((option, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1, duration: 0.3 }}
                        onClick={() => handleAnswerSelect(index)}
                        className={`p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ${
                          selectedAnswer === index
                            ? 'border-purple-500 bg-purple-50 shadow-lg'
                            : 'border-gray-200 bg-white hover:border-purple-300 hover:bg-purple-25'
                        }`}
                      >
                        <div className="flex items-center">
                          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-4 ${
                            selectedAnswer === index
                              ? 'border-purple-500 bg-purple-500'
                              : 'border-gray-300'
                          }`}>
                            {selectedAnswer === index && (
                              <CheckCircle className="w-4 h-4 text-white" />
                            )}
                          </div>
                          <p className="text-gray-900 font-medium flex-1">{option}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="flex justify-between items-center mt-8"
            >
              <Button
                variant="outline"
                onClick={handlePrevious}
                disabled={currentQuestion === 0}
                className="flex items-center"
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Previous
              </Button>

              <div className="text-sm text-gray-500">
                {currentQuestion + 1} / {questions.length}
              </div>

              <Button
                onClick={handleNext}
                disabled={selectedAnswer === null}
                className="flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next'}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
};

export default LearningQuiz;
