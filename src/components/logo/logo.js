import React, { useState, useEffect } from 'react';
import axios from 'axios';
function Logo() {
    const [logoUrl, setLogoUrl] = useState('');

    useEffect(() => {
        const cachedLogo = localStorage.getItem('logo');
        if (cachedLogo) {
            setLogoUrl(cachedLogo);
        } else {

            axios.get('http://api.taoboyang.fun/v1/globalConfig/get?name=' + 'website_logo')
                .then(function (response) {
                    const code = response.data.code;
                    if (code === 200) {

                        return response.data.data.value;
                    }
                }).then(blob => {
                    console.log(blob);
                    localStorage.setItem('logo', blob);
                    setLogoUrl(blob);
                })
                .catch(error => {
                    console.error('Error fetching logo:', error);
                });
        }
    }, []);

    return <img src={logoUrl} alt="logo" className="header-logo"></img>
}

export default Logo;
