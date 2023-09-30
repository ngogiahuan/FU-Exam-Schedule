import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';


export default function Login() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => setUser(codeResponse),
        onError: (error) => console.log("Login failed" + error),
    });

    useEffect(
        () => {
            if (user) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json'
                    }
                }).then((res) => {
                    setProfile(res.data);
                    console.log(res.data);
                }).catch((err) => {
                    console.log(err);
                });
            }
        },
        [user]
    );

    const logOut = () => {
        googleLogout();
        setProfile(null);
    };
    return (
        <>
            {profile ? (
                <div className="">
                    <img src={profile.picture} alt="user image" />
                    <p>Name: <span>{profile.name}</span></p>
                    <p>Email: <span>{profile.email}</span></p>
                    <button onClick={logOut}>Log Out</button>
                </div>
            ) : (
                <button onClick={() => login()}>Login with google</button>
            )
            }
        </>
    )
}
