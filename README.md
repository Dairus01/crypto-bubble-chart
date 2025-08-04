# Crypto Bubble Chart

A real-time cryptocurrency bubble chart visualization built with D3.js and the CoinGecko API. Features interactive bubbles, market data, and an AI assistant.

## Features

- **Real-time Data**: Live cryptocurrency data from CoinGecko API
- **Interactive Bubbles**: Draggable, zoomable bubble chart with 200+ tokens
- **Market Overview**: Global market statistics and top movers
- **AI Assistant**: Built-in chatbot for market insights and analysis
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Dark Theme**: Modern glass morphism UI design
- **Multiple Timeframes**: 1h, 4h, 24h, 7d, 30d, 1y, All Time
- **Auto-refresh**: Configurable data refresh intervals

## Tech Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+)
- **Visualization**: D3.js v7
- **Data Source**: CoinGecko API
- **Styling**: Custom CSS with glass morphism effects
- **AI**: Custom JavaScript-based conversational AI

## Quick Start

1. **Clone the repository:**
   ```bash
   git clone <your-repo-url>
   cd crypto-bubble-chart
   ```

2. **Start the development server:**
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

3. **Open your browser:**
   Navigate to `http://localhost:8000`

## Deployment Options

### Option 1: GitHub Pages (Recommended - Free)

1. **Create a GitHub repository:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/yourusername/crypto-bubble-chart.git
   git push -u origin main
   ```

2. **Enable GitHub Pages:**
   - Go to your repository on GitHub
   - Click "Settings" → "Pages"
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click "Save"

3. **Your site will be live at:**
   `https://yourusername.github.io/crypto-bubble-chart`

### Option 2: Netlify (Free)

1. **Drag & Drop Method:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/Login
   - Drag your project folder to the deploy area
   - Your site is instantly live!

2. **Git Integration:**
   - Connect your GitHub repository
   - Netlify will auto-deploy on every push

### Option 3: Vercel (Free)

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   vercel
   ```

3. **Follow the prompts** and your site will be live!

### Option 4: Firebase Hosting (Free)

1. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase:**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Deploy:**
   ```bash
   firebase deploy
   ```

## Configuration

### API Key (Optional)
The app works without an API key using CoinGecko's public API. For higher rate limits:
1. Get a free API key from [CoinGecko Pro](https://www.coingecko.com/en/api/pricing)
2. Add it to the API Key field in the app

### Customization
- **Token Limit**: Adjust the "Max Tokens" slider (currently 200)
- **Time Periods**: Change the time period dropdown options
- **Auto-refresh**: Set refresh intervals in the Auto Refresh dropdown
- **View Options**: Toggle labels, icons, and draggable bubbles

## File Structure

```
crypto-bubble-chart/
├── index.html          # Main HTML file
├── styles.css          # All styling and responsive design
├── script.js           # Main application logic and D3.js
├── demo-data.js        # Sample data for fallback
├── package.json        # Project metadata
├── README.md           # This file
└── DEPLOYMENT.md       # Detailed deployment guide
```

## Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## API Rate Limits

- **Free API**: 50 calls/minute
- **Pro API**: 1000 calls/minute (with API key)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Support

If you encounter any issues:
1. Check the browser console for errors
2. Verify your internet connection
3. Try refreshing the page
4. Check if CoinGecko API is accessible

---

**Live Demo**: [Your deployed URL here]
**GitHub**: [Your repository URL here] 