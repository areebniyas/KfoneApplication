import { getSession } from 'next-auth/react'

export default async function federatedSignOut(req, res) {
	// Get the site base url
	const baseUrl = "http://localhost:3000";

	try {
		// We need to grab the session to get at the id token
		// PS: You can use the «getToken()» method here instead of «unstable_getServerSession».
        const session = await getSession({ req });
		if (!session) {
			// If the user isn't logged in, just redirect to root
			return res.redirect(baseUrl);
		}

		// Create the provider endsession url
		const endSessionURL = `https://api.asgardeo.io/t/areeb/oidc/logout`;
		// And the redirect url
		// At this url (/logout) the local next-auth session will be removed
		const redirectURL = `http://localhost:3000/`;
		// Construct the query params and redirect the browser to
		// the provider auth server
		const endSessionParams = new URLSearchParams({
		  // Pass the original id tok the to the provider
			id_token_hint: session.idToken,
			// Pass the redirect url
			post_logout_redirect_uri: redirectURL,
		});
		const fullUrl = `${endSessionURL}?${endSessionParams.toString()}`;
		return res.redirect(fullUrl);
	} catch (error) {
		res.redirect(baseUrl);
	}
}
