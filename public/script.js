document.getElementById('scrape-button').addEventListener('click', async () => {  
    const keyword = document.getElementById('keyword').value;  
    const response = await fetch(`/api/scrape?keyword=${encodeURIComponent(keyword)}`);  

    const resultsDiv = document.getElementById('results');  
    resultsDiv.innerHTML = ''; // Clear previous results  

    if (!response.ok) { //handle HTTP errors  
        resultsDiv.innerHTML = `<p>HTTP Error: ${response.status}</p>`;  
        return;  
    }  

    const results = await response.json();  

    if (results.error) { //handle backend errors  
        resultsDiv.innerHTML = `<p>${results.error}</p>`;  
        return;  
    }  

    if (Array.isArray(results)) {  
        results.forEach(product => {  
            const productDiv = document.createElement('div');  
            productDiv.innerHTML = `  
                <h2>${product.title}</h2>  
                <p>Rating: ${product.rating}</p>  
                <p>Reviews: ${product.reviews}</p>  
                <img src="${product.imageUrl}" alt="Product Image" width="100" />  
            `;  
            resultsDiv.appendChild(productDiv);  
        });  
    } else {  
        resultsDiv.innerHTML = `<p>Unexpected data format.</p>`;  
    }  
});  