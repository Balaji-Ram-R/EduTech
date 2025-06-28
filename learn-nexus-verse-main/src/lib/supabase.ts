import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please check your .env file.')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface User {
  id: string
  email: string
  full_name: string
  created_at: string
  updated_at: string
}

export interface LearningStyle {
  id: string
  user_id: string
  style_type: 'visual' | 'auditory' | 'kinesthetic' | 'reading'
  confidence_score: number
  created_at: string
}

export interface Quiz {
  id: string
  user_id: string
  quiz_type: 'learning_style' | 'personalized'
  score: number
  total_questions: number
  completed_at: string
  created_at: string
}

export interface QuizQuestion {
  id: string
  quiz_id: string
  question_text: string
  options: string[]
  correct_answer: number
  user_answer: number
  created_at: string
}

export interface Progress {
  id: string
  user_id: string
  learning_streak: number
  total_quizzes: number
  average_score: number
  last_activity: string
  created_at: string
  updated_at: string
}

export interface UserProfile {
  id: string
  user_id: string
  full_name: string
  email: string
  avatar_url?: string
  preferences: {
    theme: 'light' | 'dark' | 'system'
    notifications: boolean
  }
  created_at: string
  updated_at: string
} 