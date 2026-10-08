// Gallery items. Replace `src` with real image URLs (e.g. files in /public) when available;
// until then each item gets a generated placeholder so the page works offline.

const HUES = { Electronics: 212, Apparel: 18, Home: 150, Beauty: 330, Sports: 45, Books: 265 };

function placeholder(title, category) {
  const h = HUES[category];
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="hsl(${h},65%,55%)"/><stop offset="1" stop-color="hsl(${h + 30},60%,35%)"/>
</linearGradient></defs>
<rect width="800" height="600" fill="url(#g)"/>
<text x="400" y="310" text-anchor="middle" font-family="Arial, Helvetica, sans-serif" font-size="44" fill="#fff">${title}</text>
</svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const ITEMS = [
  ['Wireless headphones', 'Electronics'],
  ['Smart watch', 'Electronics'],
  ['Portable speaker', 'Electronics'],
  ['Denim jacket', 'Apparel'],
  ['Linen shirt', 'Apparel'],
  ['Ceramic vase', 'Home'],
  ['Table lamp', 'Home'],
  ['Throw blanket', 'Home'],
  ['Face serum', 'Beauty'],
  ['Running shoes', 'Sports'],
  ['Yoga mat', 'Sports'],
  ['Hardcover notebook', 'Books'],
];

export const galleryItems = ITEMS.map(([title, category], i) => ({
  id: i + 1,
  title,
  category,
  src: placeholder(title, category),
}));
