import AddStoryPresenter from './AddStoryPresenter';

async function getToken() {
  return localStorage.getItem('token');
}

const presenter = new AddStoryPresenter({ getToken });

const AddStory = {
  async render() {
    return `
      <section class="add-story">
        <h2>Add Story</h2>
        <form id="addStoryForm" enctype="multipart/form-data">
          <div>
            <label>Description:</label><br>
            <textarea id="description" required></textarea>
          </div>
          <div>
            <label>Photo:</label><br>
            <input type="file" id="photo" accept="image/*" required />
          </div>
          <div>
            <label>Latitude (optional):</label><br>
            <input type="number" id="lat" step="any" />
          </div>
          <div>
            <label>Longitude (optional):</label><br>
            <input type="number" id="lon" step="any" />
          </div>
          <button type="submit">Add Story</button>
        </form>
        <div id="addStoryMsg"></div>
      </section>
    `;
  },

  async afterRender() {
    const form = document.getElementById('addStoryForm');
    const msg = document.getElementById('addStoryMsg');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      msg.textContent = '';
      const description = document.getElementById('description').value;
      const photoInput = document.getElementById('photo');
      const lat = document.getElementById('lat').value;
      const lon = document.getElementById('lon').value;
      const photo = photoInput.files[0];
      try {
        await presenter.addStory({
          description,
          photo,
          lat: lat ? parseFloat(lat) : undefined,
          lon: lon ? parseFloat(lon) : undefined,
        });
        msg.textContent = 'Story added successfully!';
        form.reset();
      } catch (error) {
        msg.textContent = error.message || 'Failed to add story.';
      }
    });
  }
};

export default AddStory;
