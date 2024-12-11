import { registerRequest } from '../services/api';
import { useState } from 'react';

function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async (e) => {
        e.preventDefault();
        const registerData = new FormData();
        registerData.append('name', name);
        registerData.append('email', email);
        registerData.append('password', password);
        try {
            const response = await registerRequest(registerData);
            console.log(response);
        } catch (error) {
            console.error('Error registering:', error);
        }
    }


    return (
      <div style={{width: '70%'}}>
          <h1 style={{textAlign: 'center', marginBottom: '30px'}}>アカウント作成</h1>
          <form id="register-form">
              <div>
                  <label>メールアドレス</label>
                  <input type="text" className="auth-input" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                  <label>氏名</label>
                  <input type="email" className="auth-input" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div>
                  <label>パスワード</label>
                  <input type="password" className="auth-input" value={password} onChange={(e) => setPassword(e.target.value)}/>
              </div>
              <div>
                  <label>パスワッドの確認</label>
                  <input type="password" className="auth-input"/>
              </div>
              <button onClick={(e) => handleRegister(e)}>アカウント作成</button>
          </form>
      </div>
    );
}


  
export default Register;