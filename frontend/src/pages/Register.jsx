function Register() {
    return (
      <div style={{width: '70%'}}>
          <h1 style={{textAlign: 'center', marginBottom: '30px'}}>アカウント作成</h1>
          <form id="register-form">
              <div>
                  <label>メールアドレス</label>
                  <input type="text" className="auth-input"/>
              </div>
              <div>
                  <label>氏名</label>
                  <input type="email" className="auth-input"/>
              </div>
              <div>
                  <label>パスワード</label>
                  <input type="password" className="auth-input"/>
              </div>
              <div>
                  <label>パスワッドの確認</label>
                  <input type="password" className="auth-input"/>
              </div>
              <button type="submit">アカウント作成</button>
          </form>
      </div>
    );
}


  
export default Register;