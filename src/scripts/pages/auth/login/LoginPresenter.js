class LoginPresenter {
  constructor({ apiUrl } = {}) {
    this.apiUrl = apiUrl || 'https://story-api.dicoding.dev/v1/login';
  }

  async login({ email, password }) {
    if (!email || !password) throw new Error('Email dan password wajib diisi');
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Login gagal');
    }
    return data;
  }
}

export default LoginPresenter;
