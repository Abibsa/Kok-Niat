'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProgressIndicator from './components/ProgressIndicator';
import PageContainer from './components/PageContainer';
import HeartAnimation from './components/HeartAnimation';
import ConfettiEffect from './components/ConfettiEffect';
import ThemeToggle, { themes } from './components/ThemeToggle';
import MusicPlayer from './components/MusicPlayer';
import JourneyRecap from './components/JourneyRecap';
import MessageBox from './components/MessageBox';
import ShareButton from './components/ShareButton';
import EasterEgg from './components/EasterEgg';
import SoundEffects from './components/SoundEffects';
import TypingText from './components/TypingText';
import Envelope from './components/Envelope';
import FallingElements from './components/FallingElements';
import MoodBooster from './components/MoodBooster';
import StarryNight from './components/StarryNight';

import { getRandomQuestions, saveProgress, loadProgress, clearProgress, allQuestions } from './data';
import type { Question } from './types';

export default function Home() {
  const [step, setStep] = useState(-1);
  const [userName, setUserName] = useState('');

  const [tempName, setTempName] = useState('');
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [feedback, setFeedback] = useState('');
  const [showHearts, setShowHearts] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [theme, setTheme] = useState<'pink' | 'purple' | 'blue'>('pink');
  const [musicEnabled, setMusicEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [showRecap, setShowRecap] = useState(false);
  const [showMessageBox, setShowMessageBox] = useState(false);
  const [userMessage, setUserMessage] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [typingComplete, setTypingComplete] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize questions only on client-side to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    setQuestions(getRandomQuestions(3));
  }, []);

  // Apply theme colors
  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    const colors = themes[theme].colors;
    root.style.setProperty('--color-primary', colors.primary);
    root.style.setProperty('--color-secondary', colors.secondary);
    root.style.setProperty('--color-accent', colors.accent);
  }, [theme]);

  // Load progress on mount
  useEffect(() => {
    const saved = loadProgress();
    if (saved && !saved.completed) {
      const shouldResume = confirm('Eh, kita belum selesai 😄\nMau lanjut dari tadi?');
      if (shouldResume) {
        setStep(saved.currentStep);
        setUserName(saved.userName);
        setAnswers(saved.answers || {});
        if (saved.questions) setQuestions(saved.questions);
      } else {
        clearProgress();
        setQuestions(getRandomQuestions(3));
      }
    }
  }, []);

  // Save progress whenever it changes
  useEffect(() => {
    if (userName) {
      saveProgress({
        currentStep: step,
        userName,
        answers,
        questions,
        completed: step === 8,
      });
    }
  }, [step, userName, answers, questions]);

  const playClick = () => {
    if (soundEnabled && typeof window !== 'undefined' && (window as any).playClickSound) {
      (window as any).playClickSound();
    }
  };

  const playSuccess = () => {
    if (soundEnabled && typeof window !== 'undefined' && (window as any).playSuccessSound) {
      (window as any).playSuccessSound();
    }
  };

  const handleNameSubmit = () => {
    if (tempName.trim()) {
      setUserName(tempName.trim());
      playSuccess();
      setStep(1);
    }
  };

  const handleAnswer = (questionId: number, answerIndex: number) => {
    const question = questions[questionId - 1];
    const response = question.responses[answerIndex];

    playClick();
    setAnswers({ ...answers, [questionId]: question.options[answerIndex] });
    setFeedback(response.replace('{nama}', userName));
    setShowFeedback(true);

    setTimeout(() => {
      setShowFeedback(false);
      setTimeout(() => {
        setFeedback('');
        setStep(step + 1);
      }, 500); // Sedikit lebih lambat untuk fade out
    }, 4000); // Beri waktu 4 detik untuk membaca teks romantis
  };

  const handleAbsurdAnswer = (answer: string) => {
    playClick();
    setAnswers({ ...answers, [99]: answer });
    setTimeout(() => setStep(5.1), 1500); // Langsung ke Mood Booster
  };



  const handleEndingChoice = () => {
    playSuccess();
    setShowHearts(true);
    setShowConfetti(true);
    setTimeout(() => {
      setStep(step + 1);
    }, 2000);
  };

  const handleRestart = () => {
    clearProgress();
    setStep(0);
    setUserName('');
    setTempName('');
    setAnswers({});
    setFeedback('');
    setShowHearts(false);
    setShowFeedback(false);
    setShowConfetti(false);
    setShowRecap(false);
    setShowMessageBox(false);
    setUserMessage('');
    setQuestions(getRandomQuestions(3));
    playClick();
  };

  const handleMessageSubmit = (message: string) => {
    setUserMessage(message);
    playSuccess();
    // Save to localStorage
    if (typeof window !== 'undefined') {
      const messages = JSON.parse(localStorage.getItem('user_messages') || '[]');
      messages.push({
        from: userName,
        message,
        timestamp: new Date().toISOString(),
      });
      localStorage.setItem('user_messages', JSON.stringify(messages));
    }
  };

  const totalSteps = 6;

  // Prevent hydration mismatch by returning null until mounted
  if (!mounted || questions.length === 0) {
    return (
      <div style={{
        height: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFFBFC 0%, #FFE4E9 100%)'
      }}>
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ repeat: Infinity, duration: 2 }}
          style={{ fontSize: '3rem' }}
        >
          🌸
        </motion.div>
      </div>
    );
  }

  return (
    <>
      <SoundEffects enabled={soundEnabled} />
      <FallingElements />
      <MusicPlayer isPlaying={musicEnabled} onToggle={() => setMusicEnabled(!musicEnabled)} />

      {userName && step > 0 && (
        <>
          <ThemeToggle theme={theme} onThemeChange={setTheme} />
          <EasterEgg userName={userName} />
        </>
      )}

      <AnimatePresence mode="wait">
        {/* Step -1: Envelope */}
        {step === -1 && (
          <motion.div
            key="envelope"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Envelope onOpen={() => setStep(0)} />
          </motion.div>
        )}

        {/* Step 0: Name Input */}
        {step === 0 && (

          <PageContainer key="step-0">
            <motion.div
              className="card text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className="emoji animate-float"
                style={{ fontSize: '4rem', marginBottom: '1.5rem' }}
              >
                😊
              </motion.div>
              <h2 className="mb-3" style={{ fontWeight: 600 }}>Halo, selamat datang...</h2>
              <p className="mb-4" style={{ color: '#666' }}>Boleh aku tau nama panggilan kesayanganmu? 😊</p>

              <input
                type="text"
                className="input mb-3"
                placeholder="Nama kamu..."
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleNameSubmit()}
                autoFocus
              />
              <button
                className="btn btn-primary"
                onClick={handleNameSubmit}
                disabled={!tempName.trim()}
              >
                Lanjut ✨
              </button>
            </motion.div>
          </PageContainer>
        )}

        {/* Step 1: Opening */}
        {step === 1 && (
          <PageContainer key="step-1">
            <ProgressIndicator currentStep={0} totalSteps={totalSteps} />
            <motion.div
              className="card text-center"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <motion.div
                className="emoji animate-pulse"
                style={{ fontSize: '4rem', marginBottom: '1.5rem' }}
              >
                😌
              </motion.div>
              <h2 className="mb-3">Hai, {userName}</h2>
              <p className="mb-4">
                Aku bikin website kecil ini.
                <br />
                Jawab jujur ya 💭
              </p>
              <button
                className="btn btn-primary"
                onClick={() => { playClick(); setStep(2); }}
              >
                Mulai 🚀
              </button>
            </motion.div>
          </PageContainer>
        )}

        {/* Steps 2-4: Questions */}
        {step >= 2 && step <= 4 && (
          <PageContainer key={`step-${step}`}>
            <ProgressIndicator currentStep={step - 1} totalSteps={totalSteps} />
            <motion.div
              className="card"
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
            >
              <h3 className="text-center mb-4">
                {questions[step - 2].question.replace('{nama}', userName)}
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {questions[step - 2].options.map((option, index) => (
                  <motion.button
                    key={index}
                    className="choice-btn"
                    onClick={() => handleAnswer(step - 1, index)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
              <AnimatePresence>
                {showFeedback && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="text-center mt-4"
                    style={{
                      color: 'var(--color-accent)',
                      fontWeight: 500,
                      fontSize: '1.125rem'
                    }}
                  >
                    {feedback}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </PageContainer>
        )}

        {/* Step 5: Absurd Question */}
        {step === 5 && (
          <PageContainer key="step-5">
            <ProgressIndicator currentStep={4} totalSteps={totalSteps} />
            <motion.div
              className="card"
              initial={{ rotate: -5, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
            >
              <h3 className="text-center mb-4">Menurut kamu, website ini:</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {['Biasa aja', 'Lumayan niat', 'Kok niat banget sih 😭'].map((option, index) => (
                  <motion.button
                    key={index}
                    className="choice-btn"
                    onClick={() => handleAbsurdAnswer(option)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {option}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </PageContainer>
        )}



        {/* Step 5.1: Mood Booster */}
        {step === 5.1 && (
          <PageContainer key="step-5.1">
            <motion.div
              className="card"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <MoodBooster onComplete={() => setStep(5.2)} />
            </motion.div>
          </PageContainer>
        )}




        {/* Step 7: Ending */}
        {step === 7 && !showHearts && (
          <PageContainer key="step-7">
            <ProgressIndicator currentStep={6} totalSteps={totalSteps} />
            <motion.div
              className="card text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <motion.div
                className="emoji animate-heartbeat"
                style={{ fontSize: '4rem', marginBottom: '1.5rem' }}
              >
                💭
              </motion.div>
              <h3 className="mb-4">
                Kamu nyaman nggak baca website yang aku buat khusus buat kamu?
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <motion.button
                  className="choice-btn"
                  onClick={handleEndingChoice}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Iya 😊
                </motion.button>
                <motion.button
                  className="choice-btn"
                  onClick={handleEndingChoice}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Iya banget 😆
                </motion.button>
              </div>
            </motion.div>
          </PageContainer>
        )}

        {/* Step 8: After-Ending */}
        {step === 8 && (
          <PageContainer key="step-8">
            <motion.div
              className="card text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
            >
              <motion.div
                className="emoji"
                style={{ fontSize: '5rem', marginBottom: '1.5rem' }}
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: 2 }}
              >
                🌸
              </motion.div>
              <h2 className="mb-3">Oke… makasih ya udah sampai sini 😊</h2>
              <p className="mb-4" style={{ fontSize: '1.125rem' }}>
                Seneng banget {userName} nyaman sama yang aku buat 💖
              </p>
              <motion.p
                className="mb-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                style={{
                  fontSize: '1rem',
                  color: 'var(--color-text-light)',
                  fontStyle: 'italic'
                }}
              >
                Semoga hari-hari {userName} selalu menyenangkan ya ✨
              </motion.p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '2rem' }}>
                <ShareButton userName={userName} />

                <motion.button
                  className="btn btn-primary"
                  onClick={() => { playClick(); setShowRecap(true); }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  📖 Lihat Perjalanan Kita
                </motion.button>

                <motion.button
                  className="btn btn-primary"
                  onClick={() => { playClick(); setShowMessageBox(true); }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.7 }}
                >
                  💌 Balas Pesan
                </motion.button>

                <motion.button
                  className="btn btn-secondary mt-2"
                  onClick={handleRestart}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2 }}
                >
                  Mulai lagi? 🔄
                </motion.button>
              </div>
            </motion.div>
          </PageContainer>
        )}
      </AnimatePresence>

      {showHearts && <HeartAnimation />}
      {showConfetti && <ConfettiEffect />}

      <AnimatePresence>
        {showRecap && (
          <JourneyRecap
            userName={userName}
            answers={answers}
            onClose={() => { playClick(); setShowRecap(false); }}
          />
        )}
        {showMessageBox && (
          <MessageBox
            userName={userName}
            onSubmit={handleMessageSubmit}
            onClose={() => { playClick(); setShowMessageBox(false); }}
          />
        )}
      </AnimatePresence>

      {/* Step 5.2: Starry Night (Outside AnimatePresence for Fullscreen Portal Effect) */}
      {step === 5.2 && (
        <StarryNight onComplete={() => setStep(6)} />
      )}

      {/* Step 6: Plot Twist - Emotional Reveal */}
      {step === 6 && (
        <PageContainer key="step-6">
          <motion.div className="card text-center">
            <TypingText
              text="Sebenernya… dari tadi aku perhatiin jawabanmu…"
              speed={50}
              className="mb-4"
              onComplete={() => setTimeout(() => setTypingComplete(true), 1000)}
            />
            {typingComplete && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <TypingText
                  text="Dan aku cuma pengen bilang satu hal…"
                  speed={50}
                  className="mb-4"
                />
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3, duration: 0.5 }}
                  style={{
                    fontSize: '1.5rem',
                    fontWeight: 'bold',
                    color: 'var(--color-accent)',
                    marginTop: '2rem',
                    marginBottom: '2rem'
                  }}
                >
                  Kamu itu spesial banget 💖
                </motion.div>
                <motion.button
                  className="btn btn-primary mt-4"
                  onClick={() => { playClick(); setStep(7); setTypingComplete(false); }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 4 }}
                >
                  🥹
                </motion.button>
              </motion.div>
            )}
          </motion.div>
        </PageContainer>
      )}

      {/* Signature Footer */}
      {/* Signature Footer - Only on Last Step */}
      {step === 8 && (
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            position: 'absolute', // Absolute relative to card/container usually better for end page
            bottom: '2rem',
            left: 0,
            right: 0,
            textAlign: 'center',
            fontSize: '0.85rem',
            color: 'var(--color-text-light)',
            fontFamily: 'Poppins, sans-serif',
            pointerEvents: 'none',
            letterSpacing: '0.05em',
            zIndex: 10,
          }}
        >
          dibuat sama <span style={{ fontWeight: 600, color: 'var(--color-accent)' }}>abib</span> by love ❤️
        </motion.footer>
      )}

    </>
  );
}
