import * as React from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";

const authContext = React.createContext();

function useAuth() {
  const [authed, setAuthed] = React.useState(false);

  return {
    authed,
    login() {
        // if(code = 'AQDqkvbWDQGERvghT8Tacjrw7hV5WxPszndOGTZp4vgKA73f1rNhU1RQN2ya-NFNoJaAYIGd3R2SNx5I-mD4UO5hJqt3gIT0x_XX6lkwSURk1HjmHLM05V3K3lG-ajir-CjwSV4-SNT8jTEPl4FgRfkJX_k5r2dYZLdRVOEJMzjF2Rshml59A-y6_qxyasGPmcqSRde57P7kIwxYEjip_DERAACcXPwieb0')
        axios({
            method: "GET",
            url:"/",
            baseURL:"http://localhost:5000"
          })
          .then((response) => {
            const responseLink =response.data.url
            window.open(responseLink, "_self");
            return new Promise((res) => {
                setAuthed(true);
                res();
            });
          }).catch((error) => {
            console.log("LOGINERROR")
        });
    },
    logout() {
        axios({
            method: "GET",
            url:"/logout",
            baseURL:"http://localhost:5000"
          })
          .then((response) => {
            return new Promise((res) => {
                setAuthed(false);
                res();
            });
          }).catch((error) => {
            console.log("LOGOUTERROR")
        });
    },
  };
}

export function AuthProvider({ children }) {
  const auth = useAuth();

  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
}

export default function AuthConsumer() {
  return React.useContext(authContext);
}