import { UnstyledButton, Text, Stack, Box } from '@mantine/core';
import { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import type { AlphabetItem } from '../data/alphabet';

interface ToddlerLetterCardProps {
  item: AlphabetItem;
  onClick: () => void;
  animationDelay?: number;
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

export const ToddlerLetterCard = ({ item, onClick, animationDelay = 0 }: ToddlerLetterCardProps) => {
  const { isEnglish } = useLanguage();
  const [isPressed, setIsPressed] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  
  const colorIndex = (item.letter.charCodeAt(0) - 65) % toddlerColors.length;
  const colors = toddlerColors[colorIndex];
  const currentWord = isEnglish ? item.english : item.portuguese;

  const handleClick = () => {
    setShowCelebration(true);
    setTimeout(() => {
      onClick();
      setShowCelebration(false);
    }, 300);
  };

  const handleTouchStart = () => setIsPressed(true);
  const handleTouchEnd = () => setIsPressed(false);

  return (
    <UnstyledButton
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleTouchStart}
      onMouseUp={handleTouchEnd}
      onMouseLeave={handleTouchEnd}
      style={{
        background: colors.bg,
        borderRadius: '1.5rem',
        border: `4px solid ${colors.border}`,
        padding: 'var(--spacing-md)',
        minHeight: 'var(--touch-target-xl)',
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
        transform: isPressed 
          ? 'scale(0.95)' 
          : showCelebration 
            ? 'scale(1.1)' 
            : 'scale(1)',
        boxShadow: isPressed 
          ? 'var(--shadow-soft)' 
          : 'var(--shadow-medium)',
        animation: `gentle-bounce 3s ease-in-out infinite ${animationDelay}s`,
        cursor: 'pointer',
      }}
    >
      {/* Celebration sparkles */}
      {showCelebration && (
        <>
          <Box
            style={{
              position: 'absolute',
              top: '10%',
              right: '15%',
              fontSize: '1.5rem',
              animation: 'sparkle 0.8s ease-out',
              pointerEvents: 'none',
            }}
          >
            ✨
          </Box>
          <Box
            style={{
              position: 'absolute',
              bottom: '15%',
              left: '20%',
              fontSize: '1.2rem',
              animation: 'sparkle 0.6s ease-out 0.2s',
              pointerEvents: 'none',
            }}
          >
            🌟
          </Box>
        </>
      )}

      <Stack gap="var(--spacing-sm)" align="center" justify="center" style={{ height: '100%' }}>
        {/* Large Letter */}
        <Text
          style={{
            fontSize: 'clamp(3rem, 10vw, 5rem)',
            fontFamily: 'var(--font-playful)',
            fontWeight: 800,
            color: colors.letter,
            lineHeight: 1,
            textShadow: `3px 3px 0px ${colors.border}40`,
            transform: showCelebration ? 'scale(1.2) rotate(5deg)' : 'scale(1)',
          }}
        >
          {item.letter}
        </Text>

        {/* Word */}
        <Text
          style={{
            fontSize: 'clamp(0.9rem, 3vw, 1.3rem)',
            fontFamily: 'var(--font-toddler)',
            fontWeight: 700,
            color: colors.letter,
            textAlign: 'center',
            lineHeight: 1.2,
            maxWidth: '100%',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {currentWord}
        </Text>
      </Stack>

      {/* Gentle glow effect */}
      <Box
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '1.5rem',
          background: `radial-gradient(circle at center, ${colors.border}15 0%, transparent 70%)`,
          opacity: isPressed ? 0.8 : 0.3,
          pointerEvents: 'none',
        }}
      />
    </UnstyledButton>
  );
};