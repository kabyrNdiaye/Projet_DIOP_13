// Nous importons les outils nécessaires
const express = require('express');    // Pour créer le serveur web
const mysql = require('mysql2/promise'); // Pour se connecter à MySQL

// Nous avons crée une application Express
const app = express();

// Nous configurons la connexion à la base de données MySQL
const pool = mysql.createPool({
  host: 'localhost',                    
  user: 'root',                       
  password: '',        
  database: 'news_site',               
  waitForConnections: true,             
  connectionLimit: 10                 
});

// On dit à Express de comprendre les données JSON
app.use(express.json());

// Route pour voir tous les articles
app.get('/articles', async (req, res) => {
  try {
    // On demande tous les articles à la base
    const [rows] = await pool.query('SELECT * FROM articles');
    // On envoie les résultats au navigateur en format JSON
    res.json(rows);
  } catch (error) {
    // Si une erreur survient, on l'affiche
    console.error('Erreur:', error);
    res.status(500).json({ error: 'Problème avec la base de données' });
  }
});

// On démarre le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Serveur démarré sur http://localhost:3000');
});