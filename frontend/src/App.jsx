import React, { useState } from 'react';
import Auth from './components/Auth/Auth';
import FileManager from './components/FileManager/FileManager';
// import './App.css';


const App = () => {
    const [token, setToken] = useState(localStorage.getItem('token'));
    // const [user, setUser] = useState(null);

    return (
        <div className="container">
            {token ? (
                <FileManager token={token} setToken={setToken} />
            ) : (
                <Auth setToken={setToken} />
            )}
        </div>
    );
};

export default App;