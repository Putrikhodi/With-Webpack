import DetailPresenter from './DetailPresenter';

// Dummy getToken, ganti jika sudah ada implementasi auth
async function getToken() {
  return localStorage.getItem('token');
}

const presenter = new DetailPresenter({ getToken });

const Detail = {
  async render() {
    return `
      <section class="detail">
        <h2>Detail Story</h2>
        <div id="detailContent">Loading...</div>
      </section>
    `;
  },

  async afterRender(props = {}) {
    const container = document.getElementById('detailContent');
    const id = props.id || (window.location.hash.split('/')[2]);
    try {
      const story = await presenter.getDetail(id);
      container.innerHTML = `
        <img src="${story.photoUrl}" alt="${story.name}" style="max-width:300px;display:block;margin-bottom:1em;" />
        <h3>${story.name}</h3>
        <p><strong>Description:</strong><br>${story.description}</p>
        <p><strong>Created At:</strong> ${new Date(story.createdAt).toLocaleString()}</p>
        <p><strong>ID:</strong> ${story.id}</p>
        ${(story.lat && story.lon) ? `<p><strong>Location:</strong> ${story.lat}, ${story.lon}</p>` : ''}
      `;
    } catch (error) {
      container.innerHTML = `<span style="color:red">${error.message || 'Gagal mengambil detail.'}</span>`;
    }
  }
};

export default Detail;
