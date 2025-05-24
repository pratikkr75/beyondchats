# Medical Chat UI

A modern, responsive medical chat interface built with React and Vite, designed to simulate healthcare communication interactions. This application provides an intuitive chat experience with predefined medical conversation flows and an AI copilot feature.

## 🚀 Live Demo

**[View Live Application](https://beyondchats-99hl.onrender.com/)**

## 📋 Features

- **Modern Chat Interface**: Clean, user-friendly chat design with message bubbles and timestamps
- **Medical Conversation Simulation**: Predefined responses for common medical queries and symptoms
- **AI Copilot**: Integrated AI assistant for enhanced user experience
- **Responsive Design**: Optimized for desktop and mobile devices
- **Smart Message Matching**: Intelligent keyword recognition for appropriate medical responses
- **Conversation Management**: Multiple conversation threads with organized sidebar
- **Real-time Interaction**: Smooth chat experience with typing indicators

## 🛠️ Technologies Used

- **React 19.1.0** - Frontend framework
- **Vite 6.3.5** - Build tool and development server
- **Material-UI (MUI) 7.1.0** - UI component library
- **Emotion** - CSS-in-JS styling
- **ESLint** - Code linting and formatting

## 🏗️ Project Structure

```
inbox-ui/
├── src/
│   ├── components/
│   │   ├── ChatArea.jsx      # Main chat interface
│   │   ├── Copilot.jsx       # AI copilot component
│   │   └── Sidebar.jsx       # Conversation sidebar
│   ├── hooks/
│   │   ├── useChat.js        # Chat functionality hooks
│   │   ├── useConversation.js # Conversation management
│   │   └── useSidebar.js     # Sidebar state management
│   ├── services/
│   │   ├── aiService.js      # AI service integration
│   │   └── conversationService.js # Conversation logic
│   ├── App.jsx               # Main application component
│   └── main.jsx              # Application entry point
├── public/                   # Static assets
├── package.json              # Dependencies and scripts
└── vite.config.js           # Vite configuration
```

## 🔧 Installation & Setup

### Prerequisites
- Node.js (version 16 or higher)
- npm or yarn package manager

### Local Development

1. **Clone the repository**
   ```bash
   git clone <your-repository-url>
   cd inbox-ui
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file in root directory and add the following:
   ```
   
   **Environment Variables Template (.env):**
   ```env
   # AI Service Configuration
   # Choose your AI provider: 'openai' or 'claude'
   REACT_APP_AI_PROVIDER=openai

   # OpenAI Configuration
   REACT_APP_OPENAI_API_KEY=your_openai_api_key_here

   # Anthropic Claude Configuration (if using Claude)
   REACT_APP_ANTHROPIC_API_KEY=your_anthropic_api_key_here

   # Custom AI Service Configuration (if using custom endpoint)
   REACT_APP_CUSTOM_AI_ENDPOINT=your_custom_endpoint_here
   REACT_APP_CUSTOM_AI_KEY=your_custom_api_key_here
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📝 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🩺 Medical Chat Features

The application includes predefined responses for various medical scenarios:

### Supported Interactions
- **Greetings**: Basic hello/hi interactions
- **Symptoms**: Headache, fever, stomach pain, chest pain discussions
- **Appointments**: Scheduling, canceling, and managing appointments
- **Medications**: Prescription inquiries and side effects
- **Health Conditions**: Diabetes, blood pressure, weight management
- **Emergency Care**: Urgent medical situation guidance
- **Insurance & Billing**: Coverage and cost information


## 🚀 Deployment

This application is deployed on Render and automatically builds from the main branch.

**Live URL**: [https://beyondchats-99hl.onrender.com/](https://beyondchats-99hl.onrender.com/)

### Deploy Your Own
1. Fork this repository
2. Connect to your preferred deployment platform (Vercel, Netlify, Render)
3. Set build command: `npm run build`
4. Set publish directory: `dist`

## 🎨 UI Components

- **Sidebar**: Conversation list with contact management
- **Chat Area**: Main messaging interface with message bubbles
- **Copilot**: AI assistant panel with suggestions and help
- **Material-UI Integration**: Consistent design system with icons and styling
