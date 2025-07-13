import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import { motion } from 'framer-motion';

const QuizContainer = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.3;
  z-index: -1;
`;

const QuizContent = styled(motion.div)`
  background: rgba(0, 0, 0, 0.8);
  padding: 2rem;
  border-radius: 10px;
  border: 1px solid var(--mission-green);
  width: 90%;
  max-width: 600px;
  position: relative;
  z-index: 1;
`;

const QuizTitle = styled.h2`
  font-family: 'Orbitron', sans-serif;
  color: var(--mission-green);
  text-align: center;
  margin-bottom: 2rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  text-shadow: 0 0 10px var(--mission-glow);
`;

const Question = styled.div`
  color: var(--mission-green);
  font-family: 'Share Tech Mono', monospace;
  margin-bottom: 1.5rem;
  font-size: 1.1rem;
`;

const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Option = styled(motion.button)`
  background: rgba(0, 0, 0, 0.5);
  border: 1px solid var(--mission-green);
  color: var(--mission-green);
  padding: 1rem;
  font-family: 'Share Tech Mono', monospace;
  cursor: pointer;
  border-radius: 5px;
  text-align: left;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(0, 255, 0, 0.1);
    box-shadow: 0 0 20px var(--mission-glow);
  }
`;

const Timer = styled.div`
  color: var(--mission-green);
  font-family: 'Share Tech Mono', monospace;
  text-align: center;
  margin-bottom: 1rem;
  font-size: 1.2rem;
`;

const Result = styled(motion.div)`
  color: var(--mission-green);
  font-family: 'Share Tech Mono', monospace;
  text-align: center;
  margin-top: 1rem;
  font-size: 1.2rem;
`;

interface MissionQuizProps {
  onComplete: () => void;
  onClose: () => void;
}

const MissionQuiz: React.FC<MissionQuizProps> = ({ onComplete, onClose }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showResult, setShowResult] = useState(false);
  const [audio] = useState(new Audio('/mission-impossible-theme.mp3'));

  const questions = [
    {
      question: "What is the name of the IMF's mission impossible theme?",
      options: ["Mission: Impossible Theme", "The Impossible Mission", "Mission Accomplished", "Impossible Mission Force"],
      correct: 0
    },
    {
      question: "Who composed the original Mission Impossible theme?",
      options: ["Hans Zimmer", "Lalo Schifrin", "John Williams", "James Horner"],
      correct: 1
    },
    {
      question: "What year was the first Mission Impossible movie released?",
      options: ["1994", "1996", "1998", "2000"],
      correct: 1
    }
  ];

  useEffect(() => {
    audio.loop = true;
    audio.volume = 0.3;
    audio.play().catch(error => console.log("Audio play failed:", error));

    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleQuizComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      audio.pause();
      audio.currentTime = 0;
    };
  }, []);

  const handleAnswer = (selectedOption: number) => {
    if (selectedOption === questions[currentQuestion].correct) {
      setScore(prev => prev + 1);
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      handleQuizComplete();
    }
  };

  const handleQuizComplete = () => {
    setShowResult(true);
    audio.pause();
    if (score >= 2) {
      setTimeout(onComplete, 2000);
    } else {
      setTimeout(onClose, 2000);
    }
  };

  return (
    <QuizContainer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <VideoBackground autoPlay muted loop playsInline>
        <source src="/mission-impossible-bg.mp4" type="video/mp4" />
      </VideoBackground>
      
      <QuizContent
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
      >
        <QuizTitle>Mission: Impossible Quiz</QuizTitle>
        <Timer>Time Remaining: {timeLeft}s</Timer>
        
        {!showResult ? (
          <>
            <Question>{questions[currentQuestion].question}</Question>
            <Options>
              {questions[currentQuestion].options.map((option, index) => (
                <Option
                  key={index}
                  onClick={() => handleAnswer(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {option}
                </Option>
              ))}
            </Options>
          </>
        ) : (
          <Result
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {score >= 2 ? (
              "Mission Accomplished! Access Granted."
            ) : (
              "Mission Failed! Access Denied."
            )}
          </Result>
        )}
      </QuizContent>
    </QuizContainer>
  );
};

export default MissionQuiz; 