import { useState, useEffect } from 'react';
import { Box, Container } from '@mantine/core';
import { LanguageProvider } from './contexts/LanguageContext';
import { ToddlerHeader } from './components/ToddlerHeader';
import { ToddlerLetterGrid } from './components/ToddlerLetterGrid';
import { ToddlerLetterDetail } from './components/ToddlerLetterDetail';
import { alphabetData } from './data/alphabet';
import type { AlphabetItem } from './data/alphabet';

function App() {
  const [selectedLetter, setSelectedLetter] = useState<AlphabetItem | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleLetterClick = (letter: string) => {
    const letterData = alphabetData.find(item => item.letter === letter);
    if (letterData) {
      setSelectedLetter(letterData);
      // Auto-play audio for toddlers
      setTimeout(() => {
        setIsPlaying(true);
      }, 200);
    }
  };

  const handleBack = () => {
    setSelectedLetter(null);
    setIsPlaying(false);
  };

  // Prevent zoom on double tap for toddlers
  useEffect(() => {
    let lastTouchEnd = 0;
    const preventZoom = (e: TouchEvent) => {
      const now = new Date().getTime();
      if (now - lastTouchEnd <= 300) {
        e.preventDefault();
      }
      lastTouchEnd = now;
    };
    
    document.addEventListener('touchend', preventZoom, false);
    
    return () => {
      document.removeEventListener('touchend', preventZoom, false);
    };
  }, []);

  return (
    <LanguageProvider>
      <Box
        style={{
          minHeight: '100vh',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--gradient-sky)',
        }}
      >
        {/* Floating background elements for visual delight */}
        <Box
          style={{
            position: 'absolute',
            top: '10%',
            left: '5%',
            width: '100px',
            height: '100px',
            background: 'var(--primary-yellow)',
            borderRadius: '50%',
            opacity: 0.1,
            animation: 'gentle-float 4s ease-in-out infinite',
          }}
        />
        <Box
          style={{
            position: 'absolute',
            top: '60%',
            right: '8%',
            width: '80px',
            height: '80px',
            background: 'var(--primary-pink)',
            borderRadius: '50%',
            opacity: 0.1,
            animation: 'gentle-float 5s ease-in-out infinite reverse',
          }}
        />
        <Box
          style={{
            position: 'absolute',
            bottom: '20%',
            left: '15%',
            width: '60px',
            height: '60px',
            background: 'var(--primary-green)',
            borderRadius: '50%',
            opacity: 0.1,
            animation: 'gentle-float 6s ease-in-out infinite',
          }}
        />

        <Container 
          size="xl" 
          p="var(--spacing-md)"
          style={{ 
            position: 'relative', 
            zIndex: 1,
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {selectedLetter ? (
            <ToddlerLetterDetail
              item={selectedLetter}
              onBack={handleBack}
              autoPlay={isPlaying}
              onPlayComplete={() => setIsPlaying(false)}
            />
          ) : (
            <>
              <ToddlerHeader />
              <ToddlerLetterGrid onLetterClick={handleLetterClick} />
            </>
          )}
        </Container>
      </Box>
    </LanguageProvider>
  );
}

export default App;