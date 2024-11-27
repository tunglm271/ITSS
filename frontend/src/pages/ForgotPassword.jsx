function ForgotPassword() {
    return (
      <div>
          <h1 style={{textAlign: "center"}}>パスワードをリセットする</h1>
          <form id="forgot-password">
              <div>
                  <label>メールアドレス</label>
                  <input type="email" className="auth-input" style={{width: "100%"}}/>
              </div>
              <div>
                <label>OTPの確認</label>
                <div style={{display: 'flex', gap: '10px'}}>
                  <input type="text"  className="auth-input" style={{width: "100%"}}/>
                  <button style={{width: "60px"}}>送信</button>
                </div>
              </div>
              <button type="submit">確認</button>
          </form>
      </div>
    );
}
  
export default ForgotPassword;