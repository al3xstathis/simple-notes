import './styles.scss'
import React, {useEffect, useState} from "react";
import {Route, Routes, useNavigate} from 'react-router-dom';
import {getAuth, onAuthStateChanged} from "firebase/auth"
import Login from "./pages/auth/login";
import Nav from "./pages";
import {Header, Menu} from "@mantine/core";
import styled from "styled-components";


function App() {
    const navigate = useNavigate()
    const auth = getAuth();
    const [loggedIn, setLoggedIn] = useState(null);

    useEffect(() => {

        onAuthStateChanged(auth, (user) => {
            if (user !== null) {
                setLoggedIn(true)
                navigate('/notes')
            } else {
                navigate('/login')
                setLoggedIn(false)
            }
        })
    }, []);

    if (loggedIn === false) {
        return (
            <Routes>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        )
    }

    const signOut = () => {
        auth.signOut()
    }


    return (
        <>
            <Header style={{width: '100vw'}} height={50}>
                <div style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    height: '100%',
                    justifyContent: 'flex-start',
                    paddingLeft: 16
                }}>
                    <h3>Simple Notes</h3>
                    <CMenu shadow='lg' size='lg'>
                        <Menu.Label>{auth.currentUser?.displayName}</Menu.Label>
                        <Menu.Item onClick={signOut}>
                            Sign Out
                        </Menu.Item>
                    </CMenu>
                </div>
            </Header>
            <Nav/>
        </>
    );
}

export default App;

const CMenu = styled(Menu)`
  position: absolute;
  right: 1em;
`
