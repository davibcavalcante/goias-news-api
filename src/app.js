const express = require("express");
const cors = require("cors");
const xml2js = require('xml2js');
const axios = require('axios');

const app = express();
app.use(cors());

app.get('/', (req, res)  => {
  res.send('Hello, World!');
});

app.get("/api/rss", async (req, res) => {
  const fetchRSSFeed = async () => {
    try {
      const response = await axios.get('https://agenciabrasil.ebc.com.br/feed/ultimasnoticias/feed.xml');
      const xmlText = response.data;

      const parser = new xml2js.Parser();
      parser.parseString(xmlText, (err, result) => {
        if (err) {
          console.error('Erro ao parsear XML:', err);
          res.status(500).json({ error: 'Erro ao processar o feed' });
          return;
        }

        const items = result.rss.channel[0].item;
        const formattedItems = items.map((item) => ({
          title: item.title[0],
          link: item.link[0],
          description: item.description ? item.description[0] : 'Sem descrição',
          image: item['imagem-destaque'] ? item['imagem-destaque'][0] : null,
          pubDate: item.pubDate ? item.pubDate[0] : 'Data não disponível',
        }));

        res.json(formattedItems);
      });
    } catch (error) {
      console.error('Erro ao buscar feed:', error);
      res.status(500).json({ error: 'Erro ao buscar o feed' });
    }
  };

  fetchRSSFeed();
});

app.get("/api/sports", async (req, res) => {
  const fetchRSSFeed = async () => {
    try {
      const response = await axios.get('https://agenciabrasil.ebc.com.br/rss/esportes/feed.xml');
      const xmlText = response.data;

      const parser = new xml2js.Parser();
      parser.parseString(xmlText, (err, result) => {
        if (err) {
          console.error('Erro ao parsear XML:', err);
          res.status(500).json({ error: 'Erro ao processar o feed' });
          return;
        }

        const items = result.rss.channel[0].item;
        const formattedItems = items.map((item) => ({
          title: item.title[0],
          link: item.link[0],
          description: item.description ? item.description[0] : 'Sem descrição',
          image: item['imagem-destaque'] ? item['imagem-destaque'][0] : null,
          pubDate: item.pubDate ? item.pubDate[0] : 'Data não disponível',
        }));

        res.json(formattedItems);
      });
    } catch (error) {
      console.error('Erro ao buscar feed:', error);
      res.status(500).json({ error: 'Erro ao buscar o feed' });
    }
  };

  fetchRSSFeed();
});

app.get("/api/politics", async (req, res) => {
  const fetchRSSFeed = async () => {
    try {
      const response = await axios.get('https://agenciabrasil.ebc.com.br/rss/politica/feed.xml');
      const xmlText = response.data;

      const parser = new xml2js.Parser();
      parser.parseString(xmlText, (err, result) => {
        if (err) {
          console.error('Erro ao parsear XML:', err);
          res.status(500).json({ error: 'Erro ao processar o feed' });
          return;
        }

        const items = result.rss.channel[0].item;
        const formattedItems = items.map((item) => ({
          title: item.title[0],
          link: item.link[0],
          description: item.description ? item.description[0] : 'Sem descrição',
          image: item['imagem-destaque'] ? item['imagem-destaque'][0] : null,
          pubDate: item.pubDate ? item.pubDate[0] : 'Data não disponível',
        }));

        res.json(formattedItems);
      });
    } catch (error) {
      console.error('Erro ao buscar feed:', error);
      res.status(500).json({ error: 'Erro ao buscar o feed' });
    }
  };

  fetchRSSFeed();
});

app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});