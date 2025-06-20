import { useState, useEffect } from 'react';
import { Stack, Text, Box, UnstyledButton } from '@mantine/core';
import { useLanguage } from '../contexts/LanguageContext';
import type { AlphabetItem } from '../data/alphabet';

interface ToddlerLetterDetailProps {
  item: AlphabetItem;
  onBack: () => void;
  autoPlay: boolean;
  onPlayComplete: () => void;
}

const toddlerColors = [
  { bg: '#FFF1F2', border: '#FB7185', letter: '#F43F5E' }, // Soft Pink
  { bg: '#FEF3C7', border: '#FBBF24', letter: '#F59E0B' }, // Soft Yellow
  { bg: '#DBEAFE', border: '#60A5FA', letter: '#3B82F6' }, // Soft Blue
  { bg: '#D1FAE5', border: '#34D399', letter: '#10B981' }, // Soft Green
  { bg: '#E0E7FF', border: '#818CF8', letter: '#6366F1' }, // Soft Purple
  { bg: '#FECACA', border: '#F87171', letter: '#EF4444' }, // Soft Red
  { bg: '#FED7AA', border: '#FB923C', letter: '#F97316' }, // Soft Orange
  { bg: '#F3E8FF', border: '#C084FC', letter: '#A855F7' }, // Soft Lavender
];

export const ToddlerLetterDetail = ({ 
  item, 
  onBack, 
  autoPlay, 
  onPlayComplete 
}: ToddlerLetterDetailProps) => {
  const { isEnglish } = useLanguage();
  const [isAnimating, setIsAnimating] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const colorIndex = (item.letter.charCodeAt(0) - 65) % toddlerColors.length;
  const colors = toddlerColors[colorIndex];
  const currentWord = isEnglish ? item.english : item.portuguese;
  const otherWord = isEnglish ? item.portuguese : item.english;

  // Auto-play audio when entering detail view
  useEffect(() => {
    if (autoPlay) {
      playAudio();
      onPlayComplete();
    }
  }, [autoPlay, onPlayComplete]);

  // Entrance animation
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 800);
    return () => clearTimeout(timer);
  }, [item]);

  const playAudio = () => {
    setShowCelebration(true);
    
    // Use ElevenLabs audio files
    const lang = isEnglish ? 'en' : 'pt';
    const audioFile = `/audio/${item.letter.toLowerCase()}-${lang}.mp3`;
    const audio = new Audio(audioFile);
    audio.play().catch(err => console.error('Failed to play audio:', err));
    
    setTimeout(() => setShowCelebration(false), 1000);
  };

  return (
    <Stack gap="var(--spacing-lg)" align="center" style={{ minHeight: '100vh', justifyContent: 'center' }}>
      {/* Back Button */}
      <UnstyledButton
        onClick={onBack}
        style={{
          position: 'fixed',
          top: 'var(--spacing-md)',
          left: 'var(--spacing-md)',
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: '50%',
          width: 'var(--touch-target-medium)',
          height: 'var(--touch-target-medium)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: 'var(--shadow-medium)',
          border: '3px solid rgba(255, 255, 255, 0.8)',
          fontSize: '2rem',
          zIndex: 100,
        }}
      >
        ←
      </UnstyledButton>

      {/* Main Letter Display */}
      <Box
        style={{
          background: colors.bg,
          borderRadius: '3rem',
          border: `6px solid ${colors.border}`,
          padding: 'var(--spacing-xl)',
          width: 'min(90vw, 500px)',
          height: 'min(90vw, 500px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          transform: isAnimating 
            ? 'scale(0.8) rotate(-10deg)' 
            : showCelebration 
              ? 'scale(1.1) rotate(3deg)' 
              : 'scale(1) rotate(0deg)',
          boxShadow: 'var(--shadow-strong)',
          animation: showCelebration ? 'celebration 0.8s ease-out' : 'gentle-bounce 4s ease-in-out infinite',
        }}
        onClick={playAudio}
      >
        {/* Celebration effects */}
        {showCelebration && (
          <>
            {[...Array(8)].map((_, i) => (
              <Box
                key={i}
                style={{
                  position: 'absolute',
                  top: `${20 + Math.random() * 60}%`,
                  left: `${20 + Math.random() * 60}%`,
                  fontSize: `${1.5 + Math.random()}rem`,
                  animation: `sparkle ${0.8 + Math.random() * 0.4}s ease-out ${Math.random() * 0.2}s`,
                  pointerEvents: 'none',
                }}
              >
                {['✨', '🌟', '⭐', '💫'][Math.floor(Math.random() * 4)]}
              </Box>
            ))}
          </>
        )}

        {/* Giant Letter */}
        <Text
          style={{
            fontSize: 'clamp(8rem, 25vw, 15rem)',
            fontFamily: 'var(--font-playful)',
            fontWeight: 900,
            color: colors.letter,
            lineHeight: 1,
            textShadow: `6px 6px 0px ${colors.border}60`,
            transform: showCelebration ? 'scale(1.2)' : 'scale(1)',
          }}
        >
          {item.letter}
        </Text>

        {/* Gentle glow */}
        <Box
          style={{
            position: 'absolute',
            inset: 0,
            background: `radial-gradient(circle at center, ${colors.border}20 0%, transparent 70%)`,
            borderRadius: '3rem',
            pointerEvents: 'none',
          }}
        />
      </Box>

      {/* Word Display */}
      <Stack gap="var(--spacing-md)" align="center">
        <Box
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(15px)',
            borderRadius: '2rem',
            padding: 'var(--spacing-lg)',
            border: '3px solid rgba(255, 255, 255, 0.8)',
            boxShadow: 'var(--shadow-medium)',
            textAlign: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 'clamp(2rem, 8vw, 3.5rem)',
              fontFamily: 'var(--font-toddler)',
              fontWeight: 800,
              color: colors.letter,
              lineHeight: 1.1,
              marginBottom: 'var(--spacing-sm)',
            }}
          >
            {currentWord}
          </Text>
          
          <Text
            style={{
              fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
              fontFamily: 'var(--font-toddler)',
              fontWeight: 600,
              color: '#64748B',
              opacity: 0.8,
            }}
          >
            {otherWord}
          </Text>
        </Box>

        {/* Big Play Button */}
        <UnstyledButton
          onClick={playAudio}
          style={{
            background: `linear-gradient(135deg, ${colors.border}, ${colors.letter})`,
            borderRadius: '50%',
            width: 'var(--touch-target-xl)',
            height: 'var(--touch-target-xl)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: 'var(--shadow-strong)',
            border: '4px solid white',
            fontSize: '3rem',
            transform: showCelebration ? 'scale(1.2)' : 'scale(1)',
            animation: 'gentle-bounce 2s ease-in-out infinite',
          }}
        >
          🔊
        </UnstyledButton>
      </Stack>

      {/* Fun fact for parents/caregivers */}
      <Box
        style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(10px)',
          borderRadius: '1.5rem',
          padding: 'var(--spacing-md)',
          border: '2px solid rgba(255, 255, 255, 0.6)',
          maxWidth: '400px',
          textAlign: 'center',
          marginTop: 'var(--spacing-md)',
        }}
      >
        <Text
          style={{
            fontSize: '1rem',
            fontFamily: 'var(--font-toddler)',
            fontWeight: 600,
            color: '#64748B',
            lineHeight: 1.4,
          }}
        >
          {isEnglish 
            ? `"${item.letter}" is for "${currentWord}" - tap to hear it again!`
            : `"${item.letter}" é de "${currentWord}" - toque para ouvir novamente!`
          }
        </Text>
      </Box>
    </Stack>
  );
};