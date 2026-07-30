function scrollToSection() {
    document.getElementById('contact').scrollIntoView({
      behavior: 'smooth'
    });
  }
event.preventDefault(); 
const suggestions = [
  { keyword: "menu", link: "page/menu.html" },
  { keyword: "recipe", link: "recipe/search/search.html" },
  { keyword: "about", link: "page/about.html" },
  { keyword: "blog", link: "recipe/recipe.html" },
  { keyword: "contact us", link: "#contact" },
  { keyword: "home", link: "index.html" },
];

function updateAutocomplete(input) {
  const list = document.getElementById("autocompleteList");
  list.innerHTML = ""; // Clear the current list

  if (input.trim() === "") {
      list.classList.remove("show");
      return;
  }

  const matches = suggestions.filter(item =>
      item.keyword.toLowerCase().startsWith(input.toLowerCase())
  );

  if (matches.length > 0) {
      matches.forEach(item => {
          const listItem = document.createElement("li");
          listItem.className = "dropdown-item";
          listItem.textContent = item.keyword;
          listItem.style.cursor = "pointer";
          listItem.onclick = () => {
              window.location.href = item.link;
          };
          list.appendChild(listItem);
      });
      list.classList.add("show");
  } else {
      list.classList.remove("show");
  }
}
// Reserve
function toggleTableSelection(box) {
  const selectedBox = document.querySelector('.table-box.selected');
  if (selectedBox) {
      selectedBox.classList.remove('selected');
  }
  box.classList.add('selected');
}

function showThankYouModal(event) {
  event.preventDefault(); // Prevent actual form submission
  const modal = new bootstrap.Modal(document.getElementById('thankYouModal'));
  modal.show();
}
