import React, { useState} from 'react';
import colors from '../colors';
import TextInput from '../components/TextInput';


function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [view, setView] = useState('Login');

  const handleLogin = () => {
      console.log(email, password);
  }

  const handleSignup = () => {
      console.log(email, password);
  }

  return (
    <div style={styles.contentContainer}>
        <div style={styles.loginContainer}>
          <h1 style={styles.title}>{view}</h1>
            {/* <TextInput type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <TextInput type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/> */}

            <div style={styles.buttonContainer}>
            <button style={styles.button} onClick={() => {}}>
              <p style={styles.text}>Google</p>
            </button>
            <button style={styles.button} onClick={() => {}}>
              <p style={styles.text}>LinkedIn</p>
            </button>
            </div>
            {/* <button style={styles.button} onClick={() => view === "Login" ? handleSignup() : handleLogin()}>
              <p style={styles.text}>{view}</p>
            </button> */}

            {/* <button style={{backgroundColor: 'transparent', border: 'none', cursor: 'pointer'}} onClick={() => view === "Login" ? setView("Signup") : setView("Login")}>
              <p style={{...styles.text, color: colors.accent}}>{view === "Login" ? "Don't have an account? Sign up" : "Already have an account? Login"}</p>
            </button> */}

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
      color: colors.surface,
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
      gap: 16,
    },
    text: {
      color: colors.textPrimary,
    }
}

export default LoginPage;
