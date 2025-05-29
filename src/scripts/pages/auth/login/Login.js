import LoginPresenter from './LoginPresenter';

const presenter = new LoginPresenter();

const Login = {
  async render() {
    return `
      <div style="display:flex;justify-content:center;align-items:center;height:90vh;">
        <div style="border:2px solid #ccc;padding:2em 3em;border-radius:12px;min-width:350px;background:#fff;box-shadow:0 2px 8px #0001;">
          <h2 style="text-align:center;font-size:2.5rem;font-weight:bold;margin-bottom:1.5em;">Log In</h2>
          <form id="loginForm" autocomplete="off">
            <div style="margin-bottom:1em;">
              <label for="email" style="display:block;font-size:1.1em;margin-bottom:0.3em;">Email</label>
              <input type="email" id="email" placeholder="email" required style="width:100%;padding:0.6em;border:1.5px solid #aaa;border-radius:6px;font-size:1.1em;" />
            </div>
            <div style="margin-bottom:1.5em;">
              <label for="password" style="display:block;font-size:1.1em;margin-bottom:0.3em;">Password</label>
              <input type="password" id="password" placeholder="Password" required style="width:100%;padding:0.6em;border:1.5px solid #aaa;border-radius:6px;font-size:1.1em;" />
            </div>
            <button type="submit" style="width:100%;padding:0.7em 0;font-size:1.2em;background:#0099ff;color:#fff;border:none;border-radius:8px;margin-bottom:1em;cursor:pointer;box-shadow:0 2px 4px #0001;">Log in</button>
          </form>
          <div id="loginMsg" style="min-height:1.5em;text-align:center;color:#d00;margin-bottom:1em;"></div>
          <div style="text-align:center;font-size:1.1em;">
            Don't have an account? <a href="#/register" style="color:#0099ff;text-decoration:none;font-weight:bold;">Sign Up</a>
          </div>
        </div>
      </div>
    `;
  },

  async afterRender() {
    const form = document.getElementById('loginForm');
    const msg = document.getElementById('loginMsg');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.textContent = '';
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      try {
        const data = await presenter.login({ email, password });
        localStorage.setItem('token', data.loginResult.token);
        msg.textContent = 'Login sukses!';
        window.location.hash = '/'; // Redirect ke beranda setelah login
      } catch (error) {
        msg.textContent = error.message || 'Login gagal.';
      }
    });
  }
};

export default Login;
