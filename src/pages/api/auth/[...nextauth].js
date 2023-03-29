import NextAuth from "next-auth"
import jwt_decode from "jwt-decode";

export default NextAuth({
    providers: [
      {
        id: "asgardeo",
        name: "Asgardeo",
        type: "oauth",
        clientId: process.env.ASGARDEO_CLIENT_ID,
        clientSecret: process.env.ASGARDEO_CLIENT_SECRET,
        wellKnown: "https://api.asgardeo.io/t/" + process.env.ASGARDEO_ORGANIZATION_NAME + "/oauth2/token/.well-known/openid-configuration",
        authorization: {
          params: { scope: process.env.ASGARDEO_SCOPES || "openid email profile groups" } 
        },
        idToken: true,
        checks: ["pkce", "state"],
        profile(profile) {
          return {
            id: profile?.sub,
            name: profile?.given_name,
            email: profile?.email
          }
        },
        httpOptions: {
          timeout: 40000,
        },
      },
    ],
    secret: process.env.SECRET,
  
    session: {
      strategy: "jwt",
    },
    callbacks: {
      async session({ session, token, user }) {
        // add jwt decode for access token
        const decodedAccessToken = jwt_decode(token.accessToken)

        session.accessToken = token.accessToken
        session.idToken = token.idToken
        session.user.sub = decodedAccessToken.sub
        return session
      },
      async jwt({ token, user, account, profile, isNewUser }) {
        if (account) {
          token.accessToken = account.access_token
          token.idToken = account.id_token
        }
        return token
      }
    },
  })