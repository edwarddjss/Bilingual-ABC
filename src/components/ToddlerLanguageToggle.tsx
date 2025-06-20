import { Group, UnstyledButton, Text, Box } from '@mantine/core';
import { useLanguage } from '../contexts/LanguageContext';

export const ToddlerLanguageToggle = () => {
  const { language, toggleLanguage } = useLanguage();

  return (
    <Box
      style={{
        background: 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(15px)',
        borderRadius: '2rem',
        padding: '0.5rem',
        border: '2px solid rgba(255, 255, 255, 0.6)',
        boxShadow: 'var(--shadow-soft)',
      }}
    >
      <Group gap="0.25rem">
        <UnstyledButton
          onClick={toggleLanguage}
          style={{
            borderRadius: '1.5rem',
            padding: '1rem 2rem',
            background: language === 'english' 
              ? 'linear-gradient(135deg, var(--primary-blue), var(--primary-green))' 
              : 'transparent',
            color: language === 'english' ? 'white' : '#64748B',
            fontWeight: 700,
            fontSize: '1.1rem',
            fontFamily: 'var(--font-toddler)',
            transform: language === 'english' ? 'scale(1.05)' : 'scale(1)',
            boxShadow: language === 'english' ? 'var(--shadow-medium)' : 'none',
            minWidth: 'var(--touch-target-large)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <Text span style={{ fontSize: '1.5rem' }}>🇺🇸</Text>
          <Text span>English</Text>
        </UnstyledButton>

        <UnstyledButton
          onClick={toggleLanguage}
          style={{
            borderRadius: '1.5rem',
            padding: '1rem 2rem',
            background: language === 'portuguese' 
              ? 'linear-gradient(135deg, var(--primary-yellow), var(--primary-orange))' 
              : 'transparent',
            color: language === 'portuguese' ? 'white' : '#64748B',
            fontWeight: 700,
            fontSize: '1.1rem',
            fontFamily: 'var(--font-toddler)',
            transform: language === 'portuguese' ? 'scale(1.05)' : 'scale(1)',
            boxShadow: language === 'portuguese' ? 'var(--shadow-medium)' : 'none',
            minWidth: 'var(--touch-target-large)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.5rem',
          }}
        >
          <Text span style={{ fontSize: '1.5rem' }}>🇧🇷</Text>
          <Text span>Português</Text>
        </UnstyledButton>
      </Group>
    </Box>
  );
};