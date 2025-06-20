# Bilingual ABC

An interactive alphabet learning app for toddlers featuring English and Brazilian Portuguese.

## Features

- **26 Interactive Letters** with touch-friendly design
- **Bilingual Audio** in English and Portuguese
- **Toddler-Optimized UI** with large buttons and simple navigation
- **Celebration Animations** to keep children engaged
- **Auto-play Audio** for immediate feedback
- **Responsive Design** works on tablets and phones

## Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Tech Stack

- React 18 + TypeScript
- Vite
- Mantine UI
- ElevenLabs AI voices

## Project Structure

```
src/
├── components/     # React components
├── contexts/       # Language context
├── data/          # Alphabet data
└── index.css      # Global styles

public/
└── audio/         # Audio files (52 total)
```

## Development

The app uses a simple language context to switch between English and Portuguese. Audio files are pre-generated and stored locally for offline use.

### Adding New Words

Update `src/data/alphabet.ts` with new word pairs and add corresponding audio files to `public/audio/`.

### Customizing Colors

Edit CSS custom properties in `src/index.css` to change the color scheme.

## Browser Support

Works on all modern browsers. Optimized for touch devices and tablets.

## License

MIT License - see [LICENSE](LICENSE) for details.