import React from 'react';
import ReactDOM from 'react-dom';
import {initializeApp} from "firebase/app";
import { getFirestore } from "firebase/firestore"
import App from './App';
import {config} from './config/index';
import {BrowserRouter} from 'react-router-dom';
import { MantineProvider } from '@mantine/core';
import {QueryClient, QueryClientProvider} from "react-query";
import {NotificationsProvider} from "@mantine/notifications";

initializeApp(config.firebaseConfig)
export const db = getFirestore()

const queryClient = new QueryClient()

ReactDOM.render(
    <QueryClientProvider client={queryClient} contextSharing={true}>
        <MantineProvider>
            <BrowserRouter>
                <NotificationsProvider>
                    <App />
                </NotificationsProvider>
            </BrowserRouter>
        </MantineProvider>
    </QueryClientProvider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
