<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>تحميل ألعاب وتطبيقات</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>

  <header>
    <h1>موقع التحميلات السريع</h1>
    <input type="text" id="search" placeholder="ابحث عن لعبة أو تطبيق..." />
  </header>

  <main id="apps-container"></main>

  <script>
    fetch('apps.json')
      .then(res => res.json())
      .then(apps => {
        const container = document.getElementById('apps-container');
        const search = document.getElementById('search');

        function renderApps(filteredApps) {
          container.innerHTML = '';
          filteredApps.forEach(app => {
            const card = document.createElement('div');
            card.className = 'app-card';
            card.innerHTML = `
              <img src="${app.image}" alt="${app.title}" />
              <h3>${app.title}</h3>
              <p>${app.description}</p>
              <p><strong>الإصدار:</strong> ${app.version} | ${app.size}</p>
              <a href="${app.file}" class="download-btn" download>تحميل الآن</a>
            `;
            container.appendChild(card);
          });
        }

        // عرض الكل أول مرة
        renderApps(apps);

        // البحث
        search.addEventListener('input', e => {
          const term = e.target.value.toLowerCase();
          const filtered = apps.filter(app => 
            app.title.toLowerCase().includes(term) || 
            app.description.toLowerCase().includes(term)
          );
          renderApps(filtered);
        });
      })
      .catch(err => console.error('خطأ في تحميل البيانات:', err));
  </script>
</body>
</html>
