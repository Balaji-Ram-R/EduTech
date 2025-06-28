import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronRight, ChevronLeft, BookOpen, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

const PersonalizedQuiz = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const navigate = useNavigate();

  const questions = [
    {
      question: "What is the result of 2 + 3 × 4?",
      options: ["14", "20", "11", "17"],
      correct: 0,
      explanation: "Following order of operations, multiply first: 3 × 4 = 12, then add: 2 + 12 = 14"
    },
    {
      question: "Which of the following is a renewable energy source?",
      options: ["Coal", "Solar power", "Natural gas", "Nuclear power"],
      correct: 1,
      explanation: "Solar power is renewable because it comes from the sun, which provides continuous energy."
    },
    {
      question: "What is the capital of Australia?",
      options: ["Sydney", "Melbourne", "Canberra", "Perth"],
      correct: 2,
      explanation: "Canberra is the capital city of Australia, located between Sydney and Melbourne."
    },
    {
      question: "In which year did World War II end?",
      options: ["1944", "1945", "1946", "1943"],
      correct: 1,
      explanation: "World War II ended in 1945 with the surrender of Japan in September."
    },
    {
      question: "What is the chemical symbol for water?",
      options: ["H2O", "CO2", "NaCl", "O2"],
      correct: 0,
      explanation: "H2O represents water, with two hydrogen atoms and one oxygen atom."
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
        // Quiz completed - calculate score
        const score = newAnswers.reduce((acc, answer, index) => {
          return acc + (answer === questions[index].correct ? 1 : 0);
        }, 0);
        console.log('Quiz completed. Score:', score, '/', questions.length);
        setTimeout(() => {
          navigate('/progress');
        }, 2000);
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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">Personalized Quiz</span>
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
              Custom quiz tailored to your learning style
            </p>
          </div>
          <Progress value={progress} className="h-3 bg-gray-200" />
        </motion.div>

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
                        ? 'border-blue-500 bg-blue-50 shadow-lg'
                        : 'border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-25'
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center mr-4 font-semibold ${
                        selectedAnswer === index
                          ? 'border-blue-500 bg-blue-500 text-white'
                          : 'border-gray-300 text-gray-400'
                      }`}>
                        {String.fromCharCode(65 + index)}
                      </div>
                      <p className="text-gray-900 font-medium flex-1">{option}</p>
                      {selectedAnswer === index && (
                        <CheckCircle className="w-5 h-5 text-blue-500" />
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Hint Section */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="mt-6 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl border border-amber-200"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 bg-amber-100 rounded-full flex items-center justify-center mr-3">
                    💡
                  </div>
                  <div>
                    <p className="text-sm font-medium text-amber-800">Hint</p>
                    <p className="text-sm text-amber-700">
                      Take your time and think through each option carefully.
                    </p>
                  </div>
                </div>
              </motion.div>
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

          <div className="flex items-center space-x-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < currentQuestion
                    ? 'bg-emerald-500'
                    : index === currentQuestion
                    ? 'bg-blue-500'
                    : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          <Button
            onClick={handleNext}
            disabled={selectedAnswer === null}
            className="flex items-center bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700"
          >
            {currentQuestion === questions.length - 1 ? 'Complete Quiz' : 'Next'}
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default PersonalizedQuiz;
