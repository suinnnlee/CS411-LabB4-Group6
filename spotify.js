export const authEndpoint = "https://accounts.spotify.com/authorize";
const redirectURI = "";
const clientId = "";

const scopes = [
    "user-read-recently-played"
]

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope = ${scopes.join("%20")}&response_type=token&show_dialog=true`
import{loginUrl} from '../spotify';
<a href={loginUrl} id = "signInButton">Sign in with Spotify!</a>
