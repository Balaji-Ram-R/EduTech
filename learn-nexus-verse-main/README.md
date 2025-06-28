# LearnNexus - AI-Powered Personalized Learning Platform

A modern, responsive web application that provides personalized learning experiences through AI-powered assessments and adaptive quizzes.

## 🚀 Features

- **User Authentication**: Secure sign-up and sign-in with Supabase Auth
- **Learning Style Assessment**: AI-powered quiz to determine your learning style
- **Personalized Quizzes**: Custom quizzes tailored to your learning preferences
- **Progress Tracking**: Monitor your learning journey with detailed analytics
- **Responsive Design**: Beautiful UI that works on all devices
- **Real-time Data**: All data is stored and synced with Supabase

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **UI Framework**: Tailwind CSS + shadcn/ui
- **Animations**: Framer Motion
- **Backend**: Supabase (PostgreSQL + Auth + Real-time)
- **Routing**: React Router DOM
- **State Management**: React Context + TanStack Query
- **Icons**: Lucide React

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd learn-nexus-verse-main
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Supabase**
   - Follow the [Supabase Setup Guide](./SUPABASE_SETUP.md)
   - Create a `.env` file with your Supabase credentials

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 🔧 Environment Variables

Create a `.env` file in the project root:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## 📊 Database Schema

The application uses the following Supabase tables:

- **user_profiles**: User information and preferences
- **learning_styles**: Learning style assessment results
- **quizzes**: Quiz attempts and scores
- **quiz_questions**: Individual quiz questions and answers
- **progress**: User learning progress and statistics

## 🏗️ Project Structure

```
src/
├── components/          # Reusable UI components
│   └── ui/             # shadcn/ui components
├── contexts/           # React contexts (Auth, etc.)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configurations
│   ├── supabase.ts     # Supabase client configuration
│   └── database.ts     # Database service functions
├── pages/              # Application pages
│   ├── Dashboard.tsx   # Main dashboard
│   ├── Login.tsx       # Authentication
│   ├── SignUp.tsx      # User registration
│   ├── LearningQuiz.tsx # Learning style assessment
│   ├── PersonalizedQuiz.tsx # Custom quizzes
│   └── Progress.tsx    # Progress tracking
└── App.tsx             # Main application component
```

## 🔐 Authentication

The application uses Supabase Auth with the following features:

- Email/password authentication
- Protected routes
- Automatic user profile creation
- Password reset functionality
- Session management

## 📱 Pages

1. **Home Page** (`/`): Landing page with features and call-to-action
2. **Login** (`/login`): User authentication
3. **Sign Up** (`/signup`): User registration
4. **Dashboard** (`/dashboard`): Main user interface with stats and quick actions
5. **Learning Quiz** (`/learning-quiz`): Assessment to determine learning style
6. **Personalized Quiz** (`/personalized-quiz`): Custom quizzes based on learning style
7. **Progress** (`/progress`): Detailed progress tracking and analytics

## 🎨 UI Components

Built with shadcn/ui components:
- Buttons, Inputs, Cards
- Modals, Dropdowns, Navigation
- Progress bars, Charts
- Toast notifications
- Responsive layouts

## 🚀 Deployment

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

### Environment Setup for Production
1. Update Supabase project settings with production URLs
2. Set environment variables in your hosting platform
3. Configure CORS settings in Supabase

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 📝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 🐛 Troubleshooting

### Common Issues

1. **Supabase connection errors**
   - Check your environment variables
   - Verify your Supabase project is active
   - Ensure RLS policies are properly configured

2. **Build errors**
   - Clear node_modules and reinstall dependencies
   - Check TypeScript errors
   - Verify all imports are correct

3. **Authentication issues**
   - Check Supabase Auth settings
   - Verify redirect URLs are configured
   - Ensure email confirmations are set up correctly

## 📄 License

This project is licensed under the MIT License.

## 🤝 Support

For support and questions:
- Check the [Supabase Setup Guide](./SUPABASE_SETUP.md)
- Review the [Supabase documentation](https://supabase.com/docs)
- Open an issue in the repository

## 🎯 Roadmap

- [ ] Google OAuth integration
- [ ] Real-time collaborative features
- [ ] Advanced analytics dashboard
- [ ] Mobile app development
- [ ] AI-powered content recommendations
- [ ] Gamification features
- [ ] Export/import functionality
- [ ] Multi-language support
