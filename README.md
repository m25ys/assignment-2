# Mohammed Portfolio – SWE363 Assignment 2

## Project Description
This is an advanced, interactive personal portfolio website for Mohammed, showcasing modern web development techniques and AI integration. The site features dynamic content, real-time API integration, intelligent features, and comprehensive user experience enhancements.

### Key Features
- **Dynamic Content**: Time-aware greetings with automatic updates and contextual emojis
- **AI Integration**: Intelligent quote generator and contextual suggestion system
- **API Integration**: Real-time inspirational quotes with loading/error states
- **Advanced Animations**: Viewport-based animations using IntersectionObserver API
- **Enhanced UX**: Smooth section transitions, real-time form validation, and animated feedback
- **Responsive Design**: Fully responsive layout with light/dark theme support
- **Accessibility**: Comprehensive keyboard navigation and screen reader support

### Sections
- **Hero**: Dynamic greeting, AI quotes, and call-to-action buttons
- **About**: Personal information with animated content
- **Experience**: Professional timeline with smooth animations
- **Projects**: Portfolio showcase with API-powered inspiration section
- **Contact**: Enhanced form with real-time validation and export functionality

## Technical Stack
- **Frontend**: HTML5, CSS3, Vanilla JavaScript (ES6+)
- **Styling**: CSS Custom Properties, Grid, Flexbox, Animations
- **APIs**: External quote API integration
- **Storage**: localStorage for theme and contact data persistence
- **Animations**: CSS Transitions + IntersectionObserver API

## Setup Instructions

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- VS Code (recommended) with Live Server extension
- Internet connection (for API features)

### Running Locally
1. **Clone/Download** the project folder
2. **Open VS Code** and navigate to the project directory
3. **Install Live Server Extension** (by Ritwick Dey) if not already installed
4. **Right-click** `index.html` in the Explorer panel
5. **Select** "Open with Live Server"
6. **Browser** will open automatically at `http://127.0.0.1:5500`

### Alternative Setup
- **Direct Browser**: Open `index.html` directly (some API features may not work due to CORS)
- **Other Servers**: Use any local server (Python's `http.server`, Node.js `http-server`, etc.)

## Features Overview

### 🕒 Dynamic Content
- **Smart Greeting**: Updates automatically every minute with time-appropriate emojis
- **Section Navigation**: Smooth transitions between sections with active state management
- **Real-time Updates**: Content adapts based on user interaction and time

### 🤖 AI Features
- **Quote Generator**: Time-aware motivational quotes that refresh every 30 seconds
- **Smart Suggestions**: Context-aware tips about website features and usage
- **Intelligent Feedback**: AI-inspired user guidance and recommendations

### 🌐 API Integration
- **External Quotes**: Fetches inspirational quotes from quotable.io API
- **Loading States**: Animated spinners and progress indicators
- **Error Handling**: Comprehensive error states with retry functionality
- **Fallback Content**: Graceful degradation when API is unavailable

### 🎨 Enhanced UX
- **Smooth Animations**: Viewport-based animations for engaging interactions
- **Real-time Validation**: Instant form feedback with color-coded borders
- **Theme Persistence**: Remembers user's theme preference across sessions
- **Responsive Design**: Optimized for all device sizes

### ♿ Accessibility
- **Keyboard Navigation**: Full keyboard support for all interactive elements
- **Screen Reader Support**: Proper ARIA labels and semantic markup
- **High Contrast**: Accessible color schemes for both light and dark themes
- **Focus Management**: Clear focus indicators and logical tab order

## File Structure
```
├── index.html              # Main HTML structure
├── css/
│   └── style.css          # Enhanced styling with animations
├── js/
│   └── script.js          # Advanced JavaScript functionality
├── assets/
│   └── images/            # Profile and project images
├── docs/
│   ├── technical-documentation.md
│   └── ai-usage-report.md
└── README.md
```

## Browser Compatibility
- **Chrome**: 60+ (Full support)
- **Firefox**: 55+ (Full support)
- **Safari**: 12+ (Full support)
- **Edge**: 79+ (Full support)

**Required Features**: ES6+, CSS Custom Properties, IntersectionObserver, Fetch API

## Performance
- **No External Frameworks**: Pure vanilla JavaScript for optimal performance
- **Efficient Animations**: Hardware-accelerated CSS transitions
- **Lazy Loading**: Images load only when needed
- **Optimized API Calls**: Efficient error handling and caching

## AI Usage Summary
AI tools were extensively used to enhance the portfolio with advanced features including:
- **Dynamic Content**: Time-aware greetings and automatic updates
- **API Integration**: External quote fetching with comprehensive error handling
- **Animation System**: Viewport-based animations using modern web APIs
- **AI Features**: Simulated intelligent quote generation and contextual suggestions
- **Enhanced UX**: Real-time validation, smooth transitions, and improved accessibility

For detailed information about AI tool usage, prompts, benefits, challenges, and responsible implementation, see `docs/ai-usage-report.md`.

## License
For academic use as part of SWE363 coursework.

## Contact
- **GitHub**: [m25ys](https://github.com/m25ys)
- **LinkedIn**: [Mohammed Alsuhaibani](https://www.linkedin.com/in/mohammed-alsuhaibani-338418279/)