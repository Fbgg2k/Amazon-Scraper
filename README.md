# Raspador de Produtos da Amazon  

## Objetivo  
Criar um script simples para raspar listagens de produtos da Amazon a partir da primeira página de resultados de busca para uma palavra-chave fornecida.  

## Requisitos da Tarefa  

### Backend/API (Bun)  
- **Configuração do Projeto**: Configure um projeto Bun com as dependências necessárias (`express`, `axios` e `JSDOM`).  
- **Raspagem de Dados**: Escreva um script utilizando o `axios` para buscar o conteúdo da página de resultados da Amazon para uma palavra-chave fornecida.  
- **Análise de HTML**: Use `JSDOM` para analisar o conteúdo HTML e extrair os seguintes detalhes para cada listagem de produto na primeira página:  
  - Título do Produto  
  - Avaliação (em estrelas, de um a cinco)  
  - Número de Avaliações  
  - URL da Imagem do Produto  
- **Endpoint**: Crie um endpoint `/api/scrape` onde uma requisição GET com um parâmetro de consulta `?keyword=suaPalavraChave` inicia o processo de raspagem e retorna os dados extraídos em formato JSON.  

### Frontend (HTML, CSS, JavaScript Vanilla com Vite)  
- **Desenvolvimento da Página**: Desenvolva uma página web simples com:  
  - Um campo de entrada para digitar a palavra-chave de busca.  
  - Um botão para iniciar o processo de raspagem.  
  - Estilização da página para ser amigável e apresentável.  
- **Chamadas AJAX**: Implemente JavaScript para fazer uma chamada AJAX ao endpoint backend quando o botão for clicado e exiba os resultados formatados de maneira clara na página.  

## Documentação  
- **Comentários no Código**: Forneça comentários dentro do seu código para oferecer clareza sobre sua lógica e processo.  
- **Instruções no README.md**: Inclua um arquivo `README.md` com as instruções de configuração e execução.  

## Considerações  
- **Tratamento de Erros**: Garanta que você trate os erros de maneira adequada tanto no backend quanto no frontend.  
- **Instruções Claras**: Forneça instruções claras sobre como executar a aplicação.  
- **Código Limpo**: Quanto mais limpo e funcional o código for, melhor.  

## Como Rodar a Aplicação  
1. **Clone o Repositório**:   
   ```bash  
   git clone https://github.com/seu-usuario/seu-repositorio.git  
   cd seu-repositorio  
# Amazon Product Scraper  

A simple web application to scrape Amazon product listings based on a search keyword.  

## Requirements  
- Bun (JavaScript runtime)  

## Setup  
1. Clone the repository.  
2. Install Bun and dependencies: `bun install`  
3. Run the server: `bun run index.js`  
4. Open your browser and go to `http://localhost:3000`.  

## Usage  
- Enter a keyword in the input field and click the "Scrape Products" button to fetch product listings.  
