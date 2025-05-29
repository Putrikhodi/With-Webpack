class AddStoryPresenter {
  constructor({ apiUrl, getToken }) {
    this.apiUrl = apiUrl || 'https://story-api.dicoding.dev/v1/stories';
    this.getToken = getToken;
  }

  async addStory({ description, photo, lat, lon }) {
    const token = await this.getToken();
    if (!token) throw new Error('No token found. Please login.');
    if (!description || !photo) throw new Error('Description and photo are required.');

    const formData = new FormData();
    formData.append('description', description);
    formData.append('photo', photo);
    if (lat !== undefined && lat !== null) formData.append('lat', lat);
    if (lon !== undefined && lon !== null) formData.append('lon', lon);

    const response = await fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
        // 'Content-Type' is omitted for FormData
      },
      body: formData,
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || 'Failed to add story');
    }
    return response.json();
  }
}

export default AddStoryPresenter;
