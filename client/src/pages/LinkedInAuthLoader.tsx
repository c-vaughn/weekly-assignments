import React, { useEffect, useState } from 'react';

function LinkedInAuthLoader() {
    const[code, setCode] = useState<string | null>(null);

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        setCode(urlParams.get('code') || null);
    }, []);

    useEffect(() => {
        handleLinkedInAuth(code);
    }, [code]);

    async function handleLinkedInAuth(code: string | null) {
        if (code) {
            const response = await fetch(`http://localhost:3000/linkedInOauth?code=${code}`, {
                method: 'GET',
            });
            const data = await response.json();
            console.log(data);
        }
    }

    return <div>LinkedInAuthLoader</div>;
};

export default LinkedInAuthLoader;