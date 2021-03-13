import { passportAuth } from 'blitz'
import db from 'db'
import { Strategy as GoogleStrategy } from 'passport-google-oauth20'
import { Strategy as FacebookStrategy } from 'passport-facebook'
import { Strategy as GithubStrategy } from 'passport-github2'

export default passportAuth({
  successRedirectUrl: '/',
  errorRedirectUrl: '/',
  strategies: [
    {
      authenticateOptions: { scope: 'openid email profile' },
      strategy: new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID as string,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
          callbackURL: `${process.env.WEBSITE_URL}/api/auth/google/callback`,
        },
        async function (_accessToken, _refreshToken, profile, done) {
          const email = profile.emails?.[0]?.value
          const avatar = profile.photos?.[0]?.value

          if (!email) {
            // This can happen if you haven't enabled email access in your twitter app permissions
            return done(new Error("Google OAuth response doesn't have email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              avatar,
              name: profile.displayName,
            },
            update: {},
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: 'google',
          }
          done(undefined, { publicData })
        }
      ),
    },
    {
      authenticateOptions: {},
      strategy: new GithubStrategy(
        {
          clientID: process.env.GITHUB_CLIENT_ID as string,
          clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
          callbackURL: `${process.env.WEBSITE_URL}/api/auth/github/callback`,
          scope: ['user:email'],
        },
        // @ts-expect-error types are wrong
        async function (_accessToken, _refreshToken, profile, done) {
          console.log({ profile })
          const email = profile.emails?.[0]?.value
          const avatar = profile.photos?.[0]?.value

          if (!email) {
            // This can happen if you haven't enabled email access in your twitter app permissions
            return done(new Error("Github OAuth response doesn't have email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              avatar,
              name: profile.displayName,
            },
            update: {},
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: 'github',
          }
          done(undefined, { publicData })
        }
      ),
    },
    {
      authenticateOptions: {
        scope: ['email'],
      },
      strategy: new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_CLIENT_ID as string,
          clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
          callbackURL: `${process.env.WEBSITE_URL}/api/auth/facebook/callback`,
          profileFields: ['id', 'emails', 'photos', 'name'],
        },
        async function (_accessToken, _refreshToken, profile, done) {
          console.log(profile)
          const email = profile.emails?.[0]?.value
          const avatar = profile.photos?.[0]?.value

          if (!email) {
            // This can happen if you haven't enabled email access in your twitter app permissions
            return done(new Error("Facebook OAuth response doesn't have email."))
          }

          const user = await db.user.upsert({
            where: { email },
            create: {
              email,
              avatar,
              name: profile.displayName,
            },
            update: {},
          })

          const publicData = {
            userId: user.id,
            roles: [user.role],
            source: 'facebook',
          }
          done(undefined, { publicData })
        }
      ),
    },
  ],
})
