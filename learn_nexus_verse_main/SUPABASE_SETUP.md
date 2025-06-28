# Supabase Setup Guide for EduTech

This guide will help you set up Supabase for your EduTech project.

## Step 1: Create a Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization
4. Enter project details:
   - **Name**: `edutech-app` (or your preferred name)
   - **Database Password**: Create a strong password
   - **Region**: Choose the closest region to your users
5. Click "Create new project"
6. Wait for the project to be created (this may take a few minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

## Step 3: Set Up Environment Variables

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add your Supabase credentials:

```env
VITE_SUPABASE_URL=your_project_url_here
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

**Example:**
```env
VITE_SUPABASE_URL=https://abcdefghijklmnop.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

## Step 4: Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Click "New query"
3. Copy the entire content from `supabase-schema.sql` file
4. Paste it into the SQL editor
5. Click "Run" to execute the schema

This will create:
- `user_profiles` table
- `learning_styles` table
- `quizzes` table
- `quiz_questions` table
- `progress` table
- All necessary indexes and Row Level Security policies

## Step 5: Configure Authentication

1. Go to **Authentication** → **Settings**
2. Configure your site URL:
   - **Site URL**: `http://localhost:5173` (for development)
   - **Redirect URLs**: Add `http://localhost:5173/**`
3. Go to **Authentication** → **Providers**
4. Enable Email provider (should be enabled by default)
5. Optionally enable Google OAuth if you want Google sign-in

## Step 6: Test the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Try to sign up with a new account
3. Check your Supabase dashboard → **Authentication** → **Users** to see if the user was created
4. Check **Table Editor** to see if the user profile and progress records were created

## Step 7: Production Deployment

When deploying to production:

1. Update your environment variables with production URLs
2. Update Supabase site URL to your production domain
3. Add your production domain to redirect URLs
4. Consider enabling additional security features like:
   - Email confirmations
   - Phone number verification
   - Two-factor authentication

## Troubleshooting

### Common Issues:

1. **"Missing Supabase environment variables" error**
   - Make sure your `.env` file exists and has the correct variable names
   - Restart your development server after adding environment variables

2. **"Invalid API key" error**
   - Double-check your anon key in the `.env` file
   - Make sure you're using the anon key, not the service role key

3. **"Row Level Security" errors**
   - Make sure you ran the complete SQL schema
   - Check that RLS policies are properly set up

4. **User profile not created**
   - Check the database triggers in the SQL schema
   - Verify the `handle_new_user()` function exists

### Useful Supabase Dashboard Sections:

- **Authentication** → **Users**: View all registered users
- **Table Editor**: Browse and edit your data
- **Logs**: View real-time logs for debugging
- **API**: Access your project credentials
- **Settings**: Configure project settings

## Security Best Practices

1. **Never commit your `.env` file** to version control
2. **Use Row Level Security** (already configured in the schema)
3. **Regularly rotate your API keys**
4. **Monitor your database usage** in the Supabase dashboard
5. **Set up proper backup strategies** for production data

## Next Steps

After setting up Supabase:

1. Test all authentication flows (sign up, sign in, sign out)
2. Test quiz functionality and data persistence
3. Implement additional features like:
   - Email notifications
   - File uploads for avatars
   - Real-time updates
   - Analytics and reporting

## Support

If you encounter issues:

1. Check the [Supabase documentation](https://supabase.com/docs)
2. Visit the [Supabase community](https://github.com/supabase/supabase/discussions)
3. Review the [Supabase troubleshooting guide](https://supabase.com/docs/guides/troubleshooting) 