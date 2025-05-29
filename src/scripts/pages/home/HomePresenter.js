class HomePresenter {
  constructor({ apiUrl, getToken }) {
    this.apiUrl = apiUrl || 'https://story-api.dicoding.dev/v1/stories';
    this.getToken = getToken;
  }

  async getStories({ page, size, location } = {}) {
    const token = await this.getToken();
    if (!token) throw new Error('Token tidak ditemukan, silakan login ulang');
    const params = new URLSearchParams();
    if (page) params.append('page', page);
    if (size) params.append('size', size);
    if (location !== undefined) params.append('location', location);
    const url = params.toString() ? `${this.apiUrl}?${params}` : this.apiUrl;
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Gagal mengambil daftar story');
    }
    return data.stories;
  }
}

export default HomePresenter;
