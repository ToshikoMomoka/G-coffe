const API_URL = "https://api.sampleapis.com/coffee/iced";

document.getElementById("search-btn").addEventListener("click", async () => {
  const query = document.getElementById("coffee-input").value.trim().toLowerCase();
  if (!query) return;

  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch coffee data");

    const data = await response.json();
    displayResults(data.filter(coffee => coffee.title.toLowerCase().includes(query)));
  } catch (error) {
    displayMessage("danger", `Error: ${error.message}`);
  }
});

function displayResults(results) {
  const container = document.getElementById("results-container");
  if (results.length === 0) {
    displayMessage("warning", "No coffee types found for your search.");
  } else {
    container.innerHTML = results
      .map(coffee => `
        <div class="card mb-3">
          <div class="card-body">
            <h5 class="card-title">${coffee.title}</h5>
            <p class="card-text"><strong>Description:</strong> ${coffee.description}</p>
            <p class="card-text"><strong>Ingredients:</strong> ${coffee.ingredients.join(', ')}</p>
          </div>
        </div>
      `)
  }
}

function displayMessage(type, message) {
  document.getElementById("results-container").innerHTML = `
    <div class="alert alert-${type}">${message}</div>
  `;
}
