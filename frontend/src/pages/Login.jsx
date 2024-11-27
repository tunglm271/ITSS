import { Link } from 'react-router-dom'
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';

function Login() {

  const [showPassword, setShowPassword] = useState(false);

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div>
      <h1 style={{textAlign: 'center'}}>サインイン</h1>
      <form id="login-form">
        <div className="">
          <label>メールアドレス</label>
          <input type="email"  className="auth-input"/>
        </div>
        <div>
          <label>パスワード</label>
          <input type={showPassword?"text":"password"} className="auth-input" />
        </div>
        <FormControlLabel control={<Switch color="secondary" onChange={() => handleTogglePassword()}/>} label="パスワードを表示します" />
        <Link to="/forgot-password">パスワードを忘れですか</Link>
        <Link to="/register">まだアカウントをお持ちでないですか？サインアップします</Link>

        <button type="submit">次へ</button>
      </form>
    </div>
  )
}

export default Login