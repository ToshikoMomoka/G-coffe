fetch("https://thecocktaildb.com/api/json/v1/1/search.php?s=coffee")
  .then((res) => res.json())
  .then((data) => console.log(data));