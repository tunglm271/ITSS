import { Link, useNavigate } from 'react-router-dom';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import { useState } from 'react';
import axios from 'axios';

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = { email, password };
      console.log('Sending data:', data); // Thêm dòng này để kiểm tra dữ liệu
      const response = await axios.post('http://localhost:5000/api/auth/login', data);
      const { token } = response.data;
      localStorage.setItem('token', token); // Lưu token vào localStorage
      console.log('Token saved:', token);
      navigate('/'); // Chuyển hướng đến trang chủ sau khi đăng nhập thành công
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>サインイン</h1>
      <form id="login-form" onSubmit={handleLogin}>
        <div className="">
          <label>メールアドレス</label>
          <input
            type="email"
            className="auth-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>パスワード</label>
          <input
            type={showPassword ? 'text' : 'password'}
            className="auth-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <FormControlLabel
          control={<Switch color="secondary" onChange={handleTogglePassword} />}
          label="パスワードを表示します"
        />
        <button type="submit">次へ</button>
        <Link to="/forgot-password">パスワードを忘れですか</Link>
        <Link to="/register">まだアカウントをお持ちでないですか？サインアップします</Link>
      </form>
    </div>
  );
}

export default Login;