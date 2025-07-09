CREATE DATABASE news_site;

USE news_site;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role VARCHAR(20) NOT NULL
);

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE articles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    summary TEXT NOT NULL,
    content TEXT NOT NULL,
    category_id INT,
    author_id INT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE TABLE tokens (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    token VARCHAR(255) NOT NULL,
    expiry DATETIME NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
-- Insérer les utilisateurs (si non existants)
INSERT IGNORE INTO users (username, password_hash, role) VALUES
('fatou_diop', 'hashed_password', 'writer'),
('mamadou_sow', 'hashed_password', 'writer'),
('aminata_ndiaye', 'hashed_password', 'writer'),
('ibrahima_fall', 'hashed_password', 'writer');

-- Insérer les catégories en ignorant les doublons
INSERT IGNORE INTO categories (name) VALUES ('Économie'), ('Politique'), ('Sport'), ('Société');

-- Insérer les articles
INSERT INTO articles (category_id, title, summary, content, created_at, author_id) VALUES
((SELECT id FROM categories WHERE name = 'Économie'),
 'Senegal abandonne le projet Akon City au profit d’un développement touristique réaliste',
 'Le gouvernement sénégalais a officiellement mis fin au projet ambitieux de $6 milliards d’Akon City, optant pour une initiative plus modeste axée sur le tourisme.',
 'Le Sénégal a pris une décision marquante en annulant le projet Akon City, une ville futuriste de $6 milliards inspirée de Wakanda, portée par le chanteur sénégalo-américain Akon. Annoncé en 2018, ce projet visait à transformer la région côtière de Mbodiène en une métropole high-tech alimentée par des énergies renouvelables et la cryptomonnaie Akoin. Cependant, après des années de stagnation et des retards financiers, l’agence nationale Sapco a repris les 800 hectares de terrain alloués, déclarant que "le projet Akon City n’existe plus". Serigne Mamadou Mboup, responsable de Sapco, a confirmé à la presse nationale que cette décision fait place à un plan touristique plus réalisable, aligné avec les priorités économiques actuelles du pays. Cette volte-face intervient dans un contexte où le Sénégal prépare les infrastructures pour les Jeux olympiques de la jeunesse 2026, nécessitant des investissements pragmatiques. Les critiques pointent du doigt les promesses irréalistes d’Akon, tandis que les défenseurs soulignent son intention de stimuler l’économie locale. Le gouvernement mise désormais sur des partenariats privés pour relancer le développement côtier, un défi majeur dans un pays où le tourisme représente une part croissante du PIB.',
 '2025-07-04 12:00:00',
 (SELECT id FROM users WHERE username = 'fatou_diop')),

((SELECT id FROM categories WHERE name = 'Économie'),
 'La dette publique du Sénégal atteint 119% du PIB, un défi économique majeur',
 'Une hausse inattendue de la dette publique à 119% du PIB met le Sénégal face à des défis financiers, malgré une croissance économique robuste.',
 'Le Sénégal traverse une période critique avec la révélation que sa dette publique a grimpé à 119% de son PIB en 2024, selon un rapport de Barclays basé sur les dernières données budgétaires. Cette augmentation spectaculaire, contre une estimation précédente de 99,7% en 2023, a été mise en lumière après un audit sous la présidence de Bassirou Diomaye Faye, qui a révélé des sous-estimations des déficits par l’administration précédente. Cette situation a conduit à un gel des financements du FMI, obligeant le pays à lever 2,25 milliards de dollars sur les marchés régionaux au premier semestre 2025. Malgré une croissance économique prévue à 9,3%, portée par la production de pétrole et de gaz, les coûts de service de la dette ont explosé, pesant sur les finances publiques. Le gouvernement a répondu en émettant des obligations à moyen et long terme, représentant 70% des fonds levés, et prépare un plan de redressement fiscal pour juillet. Les experts s’interrogent sur la viabilité de cette stratégie dans un contexte de tensions commerciales internationales et de baisse de l’aide internationale.',
 '2025-07-08 14:00:00',
 (SELECT id FROM users WHERE username = 'mamadou_sow')),

((SELECT id FROM categories WHERE name = 'Sport'),
 'Le Sénégal domine la RD Congo 4-0 au Wafcon 2024, un triomphe historique',
 'L’équipe féminine sénégalaise de football a brillé avec une victoire 4-0 contre la RD Congo, se plaçant en tête du groupe A.',
 'Le Sénégal a marqué les esprits lors de l’ouverture du groupe A du Wafcon 2024 au Maroc, en écrasant la RD Congo sur le score de 4-0. Menées par une Mama Diop inspirée, auteure d’un doublé spectaculaire dont un lob somptueux dès la 5e minute, les Lionnes ont démontré une supériorité écrasante. Ngeunar Ndiaye a également inscrit deux buts, profitant d’une défense congolaise débordée par la vitesse et la puissance de l’attaque sénégalaise. Les trois premiers buts, marqués en moins de 22 minutes, ont résulté de longs ballons bien exploités, tandis que la seconde période, plus calme, a vu les deux équipes heurter les montants. Cette performance, lors de leur troisième participation à une phase finale, positionne le Sénégal comme un sérieux prétendant au titre, avec un prochain match crucial contre la Zambie. L’entraîneur a salué l’esprit combatif de son équipe, qui pourrait créer la surprise dans ce tournoi prestigieux.',
 '2025-07-06 16:00:00',
 (SELECT id FROM users WHERE username = 'aminata_ndiaye')),

((SELECT id FROM categories WHERE name = 'Politique'),
 'La Cour suprême confirme la condamnation pour diffamation de Ousmane Sonko',
 'La condamnation pour diffamation du Premier ministre Ousmane Sonko a été maintenue, soulevant des questions sur son avenir politique.',
 'La Cour suprême du Sénégal a rejeté l’appel du Premier ministre Ousmane Sonko contre sa condamnation pour diffamation, prononcée en janvier 2024. Cette décision, rendue mardi, met fin à une saga judiciaire qui oppose Sonko, ancien leader de l’opposition, à l’ex-ministre du Tourisme Mame Mbaye Niang. La peine, une suspension de six mois, avait déjà exclu Sonko de la dernière élection présidentielle, et cette confirmation soulève désormais des doutes sur sa capacité à se présenter à nouveau. Malgré cette adversité, Sonko a déclaré que "l’affaire n’est pas close" pour lui, promettant des réformes majeures lors de son premier discours au parlement. Cette affaire intervient dans un contexte de tensions politiques, alors que le président Bassirou Diomaye Faye et son mentor Sonko cherchent à transformer le pays. Les observateurs s’interrogent sur l’impact de cette décision sur la démocratie sénégalaise et la popularité du duo au pouvoir.',
 '2025-07-03 12:00:00',
 (SELECT id FROM users WHERE username = 'ibrahima_fall'));