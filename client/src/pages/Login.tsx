import React, { useEffect, useState} from 'react';
import colors from '../colors';
import TextInput from '../components/TextInput';
import { IonIcon } from '@ionic/react';
import { logoApple, logoGoogle, logoLinkedin } from 'ionicons/icons';
import '../App.css';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState('Login');
  const navigate = useNavigate();
  async function handleGoogleAuth() {
    const response = await fetch('http://localhost:3000/requestOauth', {
      method: 'POST',
    });
    const data = await response.json();
    console.log(data);
    window.location.href = data.url;
  }

  async function handleLinkedInAuth() {
    const response = await fetch('http://localhost:3000/linkedInOauthRequest', {
      method: 'POST',
    });
    const data = await response.json();
    console.log(data);
    window.location.href = data.url;
  }

  function handleAuth0Auth() {
    window.location.href = 'http://localhost:3000/login';
    
  }

  const handleLogin = () => {
      console.log(email, password);
  }

  const handleSignup = () => {
      console.log(email, password);
  }

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch('http://localhost:3000/profile', {
          method: 'GET',
          credentials: 'include',
        });

        if (!response.ok) {
          console.log('No user profile found or not authenticated.');
          return; // Just exit, don't throw
        }

        const text = await response.text();
        if (!text) {
          console.log('No user profile data returned.');
          return;
        }

        const data = JSON.parse(text);
        navigate('/dashboard');
        console.log(data);
      } catch (error) {
        console.log('Error fetching profile:', error);
      }
    };
    fetchProfile();
  }, []);

  return (
    <div style={styles.contentContainer}>
        <div style={styles.loginContainer}>
          <h1 style={styles.title}>{view}</h1>

            <div style={styles.buttonContainer}>
            <IonIcon icon={logoGoogle} className='buttonIcon' onClick={handleGoogleAuth}/>
           
            <IonIcon icon={logoLinkedin} className='buttonIcon' onClick={handleLinkedInAuth}/>

            <button style={styles.button} onClick={handleAuth0Auth}>Login with Okta</button>

            </div>

        </div>      
    </div>
  );
}

const styles = {
    contentContainer: {
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginContainer: {
      backgroundColor: colors.surfaceRaised,
      display: 'flex',
      flexDirection: 'column' as 'column',
      width: '500px',
      height: 'auto',
      borderRadius: 24,
      padding: '24px 16px 32px 16px',
      gap: 24,
      shadowColor: colors.border,
      alignItems: 'center',   
    },
    title: {
        color: colors.textPrimary,
    },
    button: {
      borderColor: colors.accent,
      backgroundColor: "transparent",
      color: colors.accent,
      width: '200px',
      height: '48px',
      borderRadius: 24,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: '18px',
      border: `1px solid ${colors.accent}`,
    }, 

    buttonSmall: {
      borderColor: colors.accent,
      backgroundColor: "transparent",
      color: colors.surface,
      width: '100px',
      height: '24px',
      borderRadius: 24,
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 600,
      fontSize: '14px',
      border: `1px solid ${colors.accent}`,
    }, 
    buttonContainer: {
      display: 'flex',
      flexDirection: 'row' as 'row',
      gap: 48,
    },
    text: {
      color: colors.textPrimary,
    },

}

export default LoginPage;
