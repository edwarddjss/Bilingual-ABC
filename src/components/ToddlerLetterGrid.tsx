import { SimpleGrid, Box } from '@mantine/core';
import { ToddlerLetterCard } from './ToddlerLetterCard';
import { alphabetData } from '../data/alphabet';

interface ToddlerLetterGridProps {
  onLetterClick: (letter: string) => void;
}

export const ToddlerLetterGrid = ({ onLetterClick }: ToddlerLetterGridProps) => {
  return (
    <Box mt="var(--spacing-lg)">
      <SimpleGrid
        cols={{ 
          base: 3,    // Mobile: 3 columns for large touch targets
          xs: 4,      // Small tablets: 4 columns  
          sm: 5,      // Medium tablets: 5 columns
          md: 6,      // Large tablets: 6 columns
          lg: 6,      // Desktop: 6 columns (not too many for toddlers)
        }}
        spacing="var(--spacing-md)"
        style={{
          maxWidth: '100%',
          margin: '0 auto',
        }}
      >
        {alphabetData.map((item, index) => (
          <ToddlerLetterCard
            key={item.letter}
            item={item}
            onClick={() => onLetterClick(item.letter)}
            animationDelay={index * 0.05} // Staggered entrance animation
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};