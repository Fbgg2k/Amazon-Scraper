const express = require('express');  
const axios = require('axios');  
const { JSDOM } = require('jsdom');  
const cors = require('cors');

const app = express();  
const PORT = process.env.PORT || 3000;  

// Endpoint /api/scrape que recebe o parâmetro ?keyword=  
// Servir arquivos estáticos da pasta 'public'
app.use(express.static('public'));

app.use(cors());


app.get('/api/scrape', async (req, res) => {  
    const keyword = req.query.keyword;  
    if (!keyword) {  
        return res.status(400).json({ error: 'Keyword is required' });  
    }  

    try {  
        // Fazer a requisição à página de resultados da Amazon  
        const response = await axios.get(`https://www.amazon.com/s?k=${encodeURIComponent(keyword)}`, {  
            headers: {  
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'  
            }  
        });  

        const html = response.data;  
        const dom = new JSDOM(html);  
        const document = dom.window.document;  

        // Extrair detalhes do produto  
        const products = Array.from(document.querySelectorAll('.s-main-slot .s-result-item')).map(item => {  
            const title = item.querySelector('h2')?.textContent.trim() || 'No Title';  
            const rating = item.querySelector('.a-icon-alt')?.textContent.trim() || 'No Rating';  
            const reviews = item.querySelector('.a-size-base')?.textContent.trim() || 'No Reviews';  
            const imageUrl = item.querySelector('.s-image')?.src || 'No Image';  

            return { title, rating, reviews, imageUrl };  
        }).filter(product => product.title !== 'No Title');  

        // Se nenhum produto for encontrado  
        if (products.length === 0) {  
            return res.status(404).json({ error: 'No products found' });  
        }  

        // Retornar a lista de produtos no formato JSON  
        res.json(products);  
    } catch (error) {  
        console.error('Error during scraping:', error.message);  
        res.status(500).json({ error: 'Failed to scrape data' });  
    }  
});  

// Iniciando o servidor  
app.listen(PORT, () => {  
    console.log(`Server running on http://localhost:${PORT}`);  
});