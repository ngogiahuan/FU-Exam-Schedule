import React, { useState, useEffect } from "react";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import "./Login.css";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Popover,
} from "@mui/material";

export default function Login() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  // Check for user in Session Storage on component initialization
  useEffect(() => {
    const storedUserProfile = sessionStorage.getItem("userProfile");
    if (storedUserProfile) {
      setProfile(JSON.parse(storedUserProfile));
    }
  }, []);

  const login = useGoogleLogin({
    onSuccess: (codeResponse) => {
      setUser(codeResponse);
    },
    onError: (error) => console.log("Login failed" + error),
  });

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          setProfile(res.data);
          sessionStorage.setItem("userProfile", JSON.stringify(res.data));
          console.log(res.data);
          navigate("/student");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [user]);

  const displayProfileInfo = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const closeProfileInfo = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    closeProfileInfo();
    setUser(null);
    sessionStorage.removeItem("userProfile");
    navigate("/");
  };

  return (
    <>
      {profile ? (
        <div>
          <IconButton onClick={displayProfileInfo}>
            <Avatar alt="User Avatar" src={profile.picture} />
          </IconButton>

          <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            onClose={closeProfileInfo}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "right",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
          >
            <List>
              <ListItem>
                <Avatar alt="User Avatar" src={profile.picture} />
                <ListItemText primary={profile.name} />
              </ListItem>
              <ListItem>
                <Button variant="outlined" color="error" onClick={logOut}>
                  Log Out
                </Button>
              </ListItem>
            </List>
          </Popover>
        </div>
      ) : (
        <div className="login-w-google" onClick={login}>
          <div className="google-icon">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
              <script xmlns="" />
            </svg>
          </div>
          <div className="google-title">
            <p>Login with Google</p>
          </div>
        </div>
      )}
    </>
  );
}
