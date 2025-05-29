class SavePresenter {
  constructor({ apiUrl, getToken }) {
    this.apiUrl = apiUrl || 'https://story-api.dicoding.dev/v1/stories';
    this.getToken = getToken;
  }

  async getStory(id) {
    if (!id) throw new Error('ID story wajib diisi');
    const token = await this.getToken();
    if (!token) throw new Error('Token tidak ditemukan, silakan login ulang');
    const response = await fetch(`${this.apiUrl}/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Gagal mengambil story');
    }
    return data.story;
  }
}

export default SavePresenter;
