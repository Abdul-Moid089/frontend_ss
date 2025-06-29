async function searchHadiths() {
  const query = document.getElementById('searchInput').value.trim();
  const resultsContainer = document.getElementById('results');
  resultsContainer.innerHTML = '';

  if (!query) {
    resultsContainer.innerHTML = '<p>Please enter a search term.</p>';
    return;
  }

  try {
    const res = await fetch(`http://localhost:5000/api/search?q=${encodeURIComponent(query)}`);
    const data = await res.json();

    if (data.results.length === 0) {
      resultsContainer.innerHTML = '<p>No hadith found for this topic.</p>';
      return;
    }

    data.results.forEach(hadith => {
      const card = document.createElement('div');
      card.className = 'hadith-card';

      card.innerHTML = `
        <p class="english">${hadith.english}</p>
        <p class="arabic">${hadith.arabic}</p>
        <p class="reference">${hadith.reference} - <strong>${hadith.book}</strong></p>
        <p>Grade: <strong>${hadith.grade}</strong></p>
      `;

      resultsContainer.appendChild(card);
    });
  } catch (err) {
    resultsContainer.innerHTML = '<p>Error fetching results. Please try again.</p>';
    console.error(err);
  }
}