"use client";

import { useState, useEffect } from "react";
import { Brain, Check, X, Star, Zap } from "lucide-react";

export default function FinancialLiteracyQuiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answered, setAnswered] = useState(false);

  const quizzes = [
    {
      title: "Economics 101",
      questions: [
        {
          question: "What is the 50/30/20 budgeting rule?",
          options: [
            "50% savings, 30% expenses, 20% needs",
            "50% needs, 30% wants, 20% savings",
            "50% income, 30% taxes, 20% spending",
            "50% investments, 30% emergency fund, 20% bills"
          ],
          correct: 1
        },
        {
          question: "What is compound interest?",
          options: [
            "Interest charged multiple times per year",
            "Interest earned on interest over time",
            "The total amount of money saved",
            "Interest paid back to the bank"
          ],
          correct: 1
        },
        {
          question: "What is an emergency fund?",
          options: [
            "Money for vacations and entertainment",
            "Savings for unexpected expenses (3-6 months of expenses)",
            "Money invested in stocks",
            "A loan from the bank"
          ],
          correct: 1
        }
      ]
    }
  ];

  const quiz = quizzes[0];

  const handleAnswerClick = (index) => {
    if (answered) return;
    setSelectedAnswer(index);
    setAnswered(true);

    if (index === quiz.questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quiz.questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedAnswer(null);
      setAnswered(false);
    } else {
      setShowScore(true);
    }
  };

  const handleReset = () => {
    setCurrentQuestion(0);
    setScore(0);
    setShowScore(false);
    setSelectedAnswer(null);
    setAnswered(false);
  };

  return (
    <section className="py-12 px-6 lg:px-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 animate-slideInDown">
          <div className="flex items-center gap-3 mb-4">
            <Brain className="text-cyan-400" size={32} />
            <h2 className="text-3xl font-bold text-white">Financial Literacy Quiz</h2>
          </div>
          <p className="text-slate-300">Test your financial knowledge and learn valuable concepts</p>
        </div>

        {!showScore ? (
          <div className="bg-slate-800/40 border border-slate-700 rounded-2xl p-8 animate-slideInUp">
            {/* Progress Bar */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-2">
                <span className="text-slate-300 text-sm">Question {currentQuestion + 1}/{quiz.questions.length}</span>
                <span className="text-cyan-400 font-semibold">{Math.round(((currentQuestion + 1) / quiz.questions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>

            {/* Question */}
            <h3 className="text-2xl font-bold text-white mb-8">
              {quiz.questions[currentQuestion].question}
            </h3>

            {/* Options */}
            <div className="space-y-4 mb-8">
              {quiz.questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerClick(index)}
                  disabled={answered}
                  className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                    selectedAnswer === index
                      ? index === quiz.questions[currentQuestion].correct
                        ? "border-green-500 bg-green-500/20 text-green-300"
                        : "border-red-500 bg-red-500/20 text-red-300"
                      : "border-slate-600 bg-slate-700/40 text-slate-300 hover:border-cyan-500/50 hover:bg-slate-700/60"
                  } ${answered && index === quiz.questions[currentQuestion].correct ? "border-green-500 bg-green-500/20" : ""} ${
                    answered ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{option}</span>
                    {answered && (
                      <>
                        {index === quiz.questions[currentQuestion].correct ? (
                          <Check className="text-green-400" size={24} />
                        ) : selectedAnswer === index ? (
                          <X className="text-red-400" size={24} />
                        ) : null}
                      </>
                    )}
                  </div>
                </button>
              ))}
            </div>

            {/* Next Button */}
            {answered && (
              <button
                onClick={handleNext}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50 animate-slideInUp"
              >
                {currentQuestion === quiz.questions.length - 1 ? "See Results" : "Next Question"}
              </button>
            )}
          </div>
        ) : (
          <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-8 text-center animate-scaleIn">
            <div className="flex justify-center mb-6">
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full blur-lg opacity-50"></div>
                <div className="relative bg-slate-900 rounded-full w-24 h-24 flex items-center justify-center">
                  <Star className="text-yellow-400" size={48} />
                </div>
              </div>
            </div>

            <h3 className="text-3xl font-bold text-white mb-4">Quiz Complete!</h3>
            <p className="text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent mb-2">
              {score}/{quiz.questions.length}
            </p>
            <p className="text-slate-300 mb-8 text-lg">
              {score === quiz.questions.length
                ? "Perfect score! You're a financial expert! 🎉"
                : score >= Math.ceil(quiz.questions.length * 0.7)
                ? "Great job! You have solid financial knowledge 👏"
                : "Good effort! Keep learning to improve your financial literacy 📚"}
            </p>

            <button
              onClick={handleReset}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
            >
              <Zap className="inline mr-2" size={20} />
              Take Quiz Again
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
