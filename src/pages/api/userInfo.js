import { getSession, useSession } from 'next-auth/react';

export default async function handler(req, res) {
  const session = await getSession({ req });

  if (session) {
    const response = await fetch("https://api.asgardeo.io/t/areeb/oauth2/userinfo", {
      method: 'GET',
      headers: new Headers({
        "Authorization": `Bearer ${session.accessToken}`
      })
    });

    const data = await response.json();

    res.status(200).json({ data });
  } else {
    res.status(401).json({ error: 'You need to sign in to view this page.' });
  }
}
