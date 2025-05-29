import HomePresenter from './HomePresenter';

// Dummy getToken, ganti jika sudah ada implementasi auth
async function getToken() {
  return localStorage.getItem('token');
}

const presenter = new HomePresenter({ getToken });

const Home = {
  async render() {
    return `
      <section class="container" style="padding:2em 0;">
        <h1 style="font-size:2.2em;font-weight:bold;margin-bottom:1em;">Daftar Story</h1>
        <div id="homeMsg"></div>
        <div id="storiesList" style="display:flex;flex-wrap:wrap;gap:2em;">Loading...</div>
      </section>
    `;
  },

  async afterRender() {
    const msg = document.getElementById('homeMsg');
    const list = document.getElementById('storiesList');
    try {
      const stories = await presenter.getStories();
      if (!Array.isArray(stories) || !stories.length) {
        list.innerHTML = '<em>Tidak ada story.</em>';
        return;
      }
      list.innerHTML = stories.map(story => `
        <div class="story-card" style="flex:1 1 320px;max-width:340px;min-width:280px;background:#fff;border-radius:14px;box-shadow:0 2px 12px #0002;border:1px solid #eee;padding:0;margin-bottom:0.5em;display:flex;flex-direction:column;justify-content:space-between;">
          <div style="padding:1em 1.3em 0.5em 1.3em;">
            <div style="display:flex;align-items:center;margin-bottom:0.7em;">
              <div style="width:38px;height:38px;background:#f3f3f3;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:1.2em;font-weight:bold;margin-right:0.8em;">
                <span style="color:#555;">${story.name ? story.name[0].toUpperCase() : '?'}</span>
              </div>
              <div>
                <b style="font-size:1.08em;">${story.name || '-'}</b><br>
                <span style="font-size:0.95em;color:#888;">${story.city || story.country || ''}</span>
              </div>
            </div>
            <img src="${story.photoUrl}" alt="${story.name}" style="width:100%;height:180px;object-fit:cover;border-radius:8px;margin-bottom:0.8em;background:#eee;" />
            <div style="min-height:2.5em;">
              <b style="font-size:1.07em;">${story.name || '-'}</b>
              <p style="margin:0.2em 0 0.7em 0;color:#444;font-size:0.97em;">${story.description && story.description.length > 100 ? story.description.slice(0,100)+'...' : story.description || ''}</p>
            </div>
            <div style="font-size:0.93em;color:#888;margin-bottom:0.7em;">${story.createdAt ? new Date(story.createdAt).toLocaleDateString('id-ID', { day:'2-digit', month:'long', year:'numeric' }) : ''}</div>
          </div>
          <div style="padding:0 1.3em 1.2em 1.3em;">
            <a href="#/detail/${story.id}" style="display:inline-block;width:100%;padding:0.65em 0;font-size:1.08em;background:#0099ff;color:#fff;text-align:center;border:none;border-radius:8px;text-decoration:none;font-weight:500;box-shadow:0 2px 4px #0001;transition:background 0.2s;">More <span style="font-size:1.1em;">→</span></a>
          </div>
        </div>
      `).join('');
    } catch (error) {
      msg.textContent = error.message || 'Gagal mengambil data.';
      list.innerHTML = '';
    }
  }
};

export default Home;
