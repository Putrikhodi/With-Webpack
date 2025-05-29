class RegisterPresenter {
  constructor({ apiUrl } = {}) {
    this.apiUrl = apiUrl || 'https://story-api.dicoding.dev/v1/register';
  }

  async register({ name, email, password }) {
    if (!name || !email || !password) throw new Error('Nama, email, dan password wajib diisi');
    if (password.length < 8) throw new Error('Password minimal 8 karakter');
    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Registrasi gagal');
    }
    return data;
  }
}

export default RegisterPresenter;
