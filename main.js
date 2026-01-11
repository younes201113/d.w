document.addEventListener('DOMContentLoaded', () => {
  const appsContainer = document.getElementById('apps-grid');
  const searchInput = document.getElementById('search');
  const categorySelect = document.getElementById('category');

  let allApps = [];

  // جلب البيانات
  fetch('apps.json')
    .then(res => res.json())
    .then(apps => {
      allApps = apps;
      renderApps(apps);

      // حدث البحث والفلاتر
      searchInput.addEventListener('input', filterApps);
      categorySelect.addEventListener('change', filterApps);
    });

  function renderApps(appsList) {
    if (!appsContainer) return;

    appsContainer.innerHTML = '';
    appsList.forEach(app => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <img class="icon" src="${app.icon}" alt="${app.title}">
        <h3>${app.title}</h3>
        <div class="meta">
          <span>${app.category === 'games' ? '🎮 ألعاب' : '🛠️ تطبيقات'}</span>
          <span>الإصدار: ${app.version}</span>
          <span>${app.size}</span>
        </div>
        <a href="detail.html?id=${app.id}" class="download-btn">عرض التفاصيل</a>
      `;
      appsContainer.appendChild(card);
    });
  }

  function filterApps() {
    const term = searchInput.value.toLowerCase().trim();
    const cat = categorySelect.value;

    let filtered = allApps;

    if (term) {
      filtered = filtered.filter(app =>
        app.title.toLowerCase().includes(term) ||
        app.description.toLowerCase().includes(term)
      );
    }

    if (cat !== 'all') {
      filtered = filtered.filter(app => app.category === cat);
    }

    renderApps(filtered);
  }

  // صفحة التفاصيل (detail.html)
  if (document.getElementById('app-detail')) {
    const urlParams = new URLSearchParams(window.location.search);
    const id = parseInt(urlParams.get('id'));

    fetch('apps.json')
      .then(res => res.json())
      .then(apps => {
        const app = apps.find(a => a.id === id);
        if (app) {
          document.getElementById('title').textContent = app.title;
          document.getElementById('short-desc').textContent = app.short_desc;
          document.getElementById('description').textContent = app.description;
          document.getElementById('version').textContent = app.version;
          document.getElementById('size').textContent = app.size;
          document.getElementById('downloads').textContent = app.downloads.toLocaleString();
          document.getElementById('rating').textContent = app.rating;
          document.getElementById('icon').src = app.icon;
          document.getElementById('screenshot').src = app.screenshot;
          document.getElementById('download-link').href = app.file;
        } else {
          document.getElementById('app-detail').innerHTML = '<h2>التطبيق غير موجود</h2>';
        }
      });
  }
});
