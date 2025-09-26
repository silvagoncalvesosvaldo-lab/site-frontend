const fs = require('fs');
const path = require('path');

const target = path.join('src','pages','HomeClean.jsx');
let s = fs.readFileSync(target, 'utf8');

// mapa dos pares cp1252->utf8 mais comuns em PT-BR
const map = new Map(Object.entries({
  'Ã§':'ç','ÃÇ':'Ç','Ã£':'ã','Ãƒ':'Ã','Ã¡':'á','Ã�':'Á',
  'Ã¢':'â','ÃŠ':'Ê','Ãª':'ê','Ã©':'é','Ã‰':'É','Ã¨':'è',
  'Ãº':'ú','Ãš':'Ú','Ã¹':'ù','Ã³':'ó','Ã“':'Ó','Ã²':'ò',
  'Ãµ':'õ','Ã•':'Õ','Ã¶':'ö','Ã„':'Ä','Ã­':'í','Ã�':'Í',
  'Ãº':'ú','Ã¼':'ü','Ã±':'ñ','â€“':'–','â€”':'—',
  'â€œ':'“','â€':'”','â€˜':'‘','â€™':'’','â€¦':'…',
  'Âº':'º','Âª':'ª','Â°':'°','Â©':'©','Â®':'®',
  'Â£':'£','Â¥':'¥','Â·':'·','Â«':'«','Â»':'»'
}));

for (const [bad, good] of map) s = s.split(bad).join(good);

// Normaliza alguns espacinhos estranhos
s = s.replace(/\u00A0/g,' ');

fs.writeFileSync(target, s, 'utf8');
console.log('Encoding fix aplicado em', target);
