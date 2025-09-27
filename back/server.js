import express from 'express';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

// Serve static assets from backend
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Navbar data
const navbarData = {
  logo: 'http://localhost:5000/assets/Uc.png', 
  links: [
    { name: 'Native', path: '/native' }
  ],
  urblocItems: [
    { name: 'Profile', path: '/profile' },
    { name: 'Cart', path: '/cart' },
    { name: 'Orders', path: '/orders' }
  ]
};

// Trending searches
const trendingSearches = [
  "Professional cleaning",
  "Electricians",
  "Salon",
  "Plumbers",
  "Carpenters",
  "Washing machine repair",
  "RO repair",
  "AC repair",
  "Home painting",
  "Furniture assembly"
];

// Navbar endpoint
app.get('/api/navbar', (req, res) => res.json(navbarData));

// Search endpoint
app.get('/api/search', (req, res) => res.json(trendingSearches));

const PORT = 5000;
app.listen(PORT, () => console.log(`Backend server running on port ${PORT}`));
