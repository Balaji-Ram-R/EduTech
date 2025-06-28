import { supabase } from './supabase'
import type { UserProfile, LearningStyle, Quiz, Progress } from './supabase'

// User Profile Functions
export const getUserProfile = async (userId: string) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error) throw error
  return data
}

export const updateUserProfile = async (userId: string, updates: Partial<UserProfile>) => {
  const { data, error } = await supabase
    .from('user_profiles')
    .update(updates)
    .eq('user_id', userId)
    .select()
    .single()

  if (error) throw error
  return data
}

// Learning Style Functions
export const saveLearningStyle = async (userId: string, styleType: string, confidenceScore: number) => {
  const { data, error } = await supabase
    .from('learning_styles')
    .insert([
      {
        user_id: userId,
        style_type: styleType,
        confidence_score: confidenceScore,
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export const getUserLearningStyle = async (userId: string) => {
  const { data, error } = await supabase
    .from('learning_styles')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(1)
    .single()

  if (error && error.code !== 'PGRST116') throw error // PGRST116 is "not found"
  return data
}

// Quiz Functions
export const saveQuiz = async (userId: string, quizType: string, score: number, totalQuestions: number) => {
  const { data, error } = await supabase
    .from('quizzes')
    .insert([
      {
        user_id: userId,
        quiz_type: quizType,
        score: score,
        total_questions: totalQuestions,
        completed_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export const getUserQuizzes = async (userId: string) => {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) throw error
  return data
}

export const getQuizStats = async (userId: string) => {
  const { data, error } = await supabase
    .from('quizzes')
    .select('*')
    .eq('user_id', userId)

  if (error) throw error

  const totalQuizzes = data.length
  const averageScore = totalQuizzes > 0 
    ? data.reduce((sum, quiz) => sum + (quiz.score / quiz.total_questions), 0) / totalQuizzes * 100
    : 0

  return {
    totalQuizzes,
    averageScore: Math.round(averageScore),
    recentQuizzes: data.slice(0, 5),
  }
}

// Progress Functions
export const getUserProgress = async (userId: string) => {
  const { data, error } = await supabase
    .from('progress')
    .select('*')
    .eq('user_id', userId)
    .single()

  if (error && error.code !== 'PGRST116') throw error
  return data
}

export const updateUserProgress = async (userId: string, updates: Partial<Progress>) => {
  const { data, error } = await supabase
    .from('progress')
    .upsert([
      {
        user_id: userId,
        ...updates,
        updated_at: new Date().toISOString(),
      },
    ])
    .select()
    .single()

  if (error) throw error
  return data
}

export const incrementLearningStreak = async (userId: string) => {
  const currentProgress = await getUserProgress(userId)
  const currentStreak = currentProgress?.learning_streak || 0
  
  return updateUserProgress(userId, {
    learning_streak: currentStreak + 1,
    last_activity: new Date().toISOString(),
  })
}

// Dashboard Data Functions
export const getDashboardData = async (userId: string) => {
  try {
    const [profile, learningStyle, quizStats, progress] = await Promise.all([
      getUserProfile(userId),
      getUserLearningStyle(userId),
      getQuizStats(userId),
      getUserProgress(userId),
    ])

    return {
      profile,
      learningStyle,
      quizStats,
      progress,
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error)
    throw error
  }
} 