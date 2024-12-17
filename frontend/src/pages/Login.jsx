import { Link } from 'react-router-dom'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import { loginRequest } from '../services/api';
import { useNavigate } from 'react-router-dom';
function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => { 
    e.preventDefault();
    const loginData = new FormData();
    loginData.append('email', email);
    loginData.append('password', password);
    try {
      const response = await loginRequest(loginData);
      console.log(response);
      localStorage.setItem('token', response.token);
      setTimeout(() => {
        localStorage.removeItem('token');
      }, 3600000); // 1 hour in milliseconds
      navigate('/');
    } catch (error) {
      console.error('Error logging in:', error);
    }
  }
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>サインイン</h1>
      <form id="login-form">
        <div className="">
          <label>メールアドレス</label>
          <input type="email"  className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>
        <div>
          <label>パスワード</label>
          <input type={showPassword?"text":"password"} className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <FormControlLabel control={<Switch color="secondary" onChange={() => handleTogglePassword()}/>} label="パスワードを表示します" />
        <Link to="/forgot-password">パスワードを忘れですか</Link>
        <Link to="/register">まだアカウントをお持ちでないですか？サインアップします</Link>

        <button onClick={(e) => handleLogin(e)}>次へ</button>
      </form>
    </div>
  )
}

export default Login