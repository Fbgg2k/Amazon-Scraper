document.addEventListener("DOMContentLoaded", () => {
  const keywordInput = document.getElementById("keyword");
  const searchBtn = document.getElementById("searchBtn");
  const resultsDiv = document.getElementById("results");

  searchBtn.addEventListener("click", async () => {
    const keyword = keywordInput.value.trim();

    if (!keyword) {
      alert("Por favor, insira um termo de busca.");
      return;
    }

    // Exibe mensagem de carregamento APENAS na área de resultados
    resultsDiv.innerHTML = '<p>🔎 Buscando produtos...</p>';

    try {
      const response = await fetch(
        `http://localhost:3000/api/scrape?keyword=${encodeURIComponent(keyword)}`
      );

      if (!response.ok) throw new Error("Erro ao buscar dados");

      const products = await response.json();

      if (products.length === 0) {
        resultsDiv.innerHTML = "<p>Nenhum produto encontrado.</p>";
        return;
      }

      displayResults(products);
    } catch (error) {
      console.error("Erro:", error);
      resultsDiv.innerHTML = "<p>❌ Erro ao buscar produtos.</p>";
    }
  });

  // Função para renderizar os produtos
  function displayResults(products) {
    resultsDiv.innerHTML = products
      .map(
        (product) => `
      <div class="product">
        <img src="${product.imageUrl}" alt="${product.title}" />
        <h3>${product.title}</h3>
        <p>⭐ ${product.rating}</p>
        <p>🗣️ ${product.reviews} avaliações</p>
      </div>
    `
      )
      .join("");
  }
});
