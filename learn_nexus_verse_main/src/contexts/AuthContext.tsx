import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/lib/supabase'
import { useToast } from '@/hooks/use-toast'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signUp: (email: string, password: string, fullName: string) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signUp = async (email: string, password: string, fullName: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      })

      if (error) throw error

      if (data.user) {
        // Create user profile
        const { error: profileError } = await supabase
          .from('user_profiles')
          .insert([
            {
              user_id: data.user.id,
              full_name: fullName,
              email: email,
              preferences: {
                theme: 'system',
                notifications: true,
              },
            },
          ])

        if (profileError) {
          console.error('Error creating user profile:', profileError)
        }

        toast({
          title: "Account created successfully!",
          description: "Please check your email to verify your account.",
        })
      }
    } catch (error: any) {
      toast({
        title: "Error creating account",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) throw error

      toast({
        title: "Welcome back!",
        description: "You have been successfully signed in.",
      })
    } catch (error: any) {
      toast({
        title: "Error signing in",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      toast({
        title: "Signed out successfully",
        description: "You have been signed out of your account.",
      })
    } catch (error: any) {
      toast({
        title: "Error signing out",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  const resetPassword = async (email: string) => {
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/reset-password`,
      })

      if (error) throw error

      toast({
        title: "Password reset email sent",
        description: "Check your email for password reset instructions.",
      })
    } catch (error: any) {
      toast({
        title: "Error sending reset email",
        description: error.message,
        variant: "destructive",
      })
      throw error
    }
  }

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
} 