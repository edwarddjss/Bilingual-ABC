import { Stack, Box, Text } from '@mantine/core';
import { ToddlerLanguageToggle } from './ToddlerLanguageToggle';
import { useLanguage } from '../contexts/LanguageContext';

export const ToddlerHeader = () => {
  const { isEnglish } = useLanguage();

  return (
    <Stack gap="var(--spacing-md)" align="center" mb="var(--spacing-lg)">
      {/* Main Title */}
      <Box
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(20px)',
          borderRadius: '2rem',
          padding: 'var(--spacing-lg)',
          boxShadow: 'var(--shadow-soft)',
          border: '3px solid rgba(255, 255, 255, 0.5)',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Sparkle decorations */}
        <Box
          style={{
            position: 'absolute',
            top: '15px',
            right: '20px',
            fontSize: '1.5rem',
            animation: 'sparkle 2s ease-in-out infinite',
          }}
        >
          ✨
        </Box>
        <Box
          style={{
            position: 'absolute',
            bottom: '15px',
            left: '20px',
            fontSize: '1.2rem',
            animation: 'sparkle 2.5s ease-in-out infinite',
          }}
        >
          🌟
        </Box>
        
        <Stack gap="var(--spacing-sm)" align="center">
          <Text
            style={{
              fontSize: 'clamp(2.5rem, 8vw, 4rem)',
              fontFamily: 'var(--font-playful)',
              fontWeight: 800,
              background: 'var(--gradient-rainbow)',
              backgroundSize: '300% 300%',
              backgroundClip: 'text',
              WebkitBackgroundClip: 'text',
              color: 'transparent',
              animation: 'rainbow-flow 4s ease infinite',
              textAlign: 'center',
              lineHeight: 1.1,
              letterSpacing: '-0.02em',
            }}
          >
            {isEnglish ? 'ABC Learning' : 'Aprendendo ABC'}
          </Text>
          
          <Text
            style={{
              fontSize: 'clamp(1rem, 3vw, 1.5rem)',
              fontFamily: 'var(--font-toddler)',
              fontWeight: 600,
              color: '#64748B',
              textAlign: 'center',
              marginTop: '-0.5rem',
            }}
          >
            {isEnglish ? 'Touch the letters!' : 'Toque nas letras!'}
          </Text>
        </Stack>
      </Box>

      {/* Language Toggle */}
      <ToddlerLanguageToggle />
    </Stack>
  );
};