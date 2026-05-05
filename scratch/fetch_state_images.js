const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../public/data');
const outputDir = path.join(__dirname, '../public/states');

if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function fetchWikipediaImageRest(title) {
  const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(title)}`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'ngtrak_bot/1.0' } });
    const data = await res.json();
    return data.originalimage?.source || data.thumbnail?.source || null;
  } catch (err) {
    return null;
  }
}

async function downloadImage(url, dest) {
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'ngtrak_bot/1.0' } });
    if (!res.ok) throw new Error(`Status ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
    return true;
  } catch (err) {
    return false;
  }
}

async function fetchCommonsImage(query) {
  const url = `https://commons.wikimedia.org/w/api.php?action=query&generator=search&gsrsearch=${encodeURIComponent(query)}&gsrnamespace=6&prop=imageinfo&iiprop=url&format=json&gsrlimit=1`;
  try {
    const res = await fetch(url, { headers: { 'User-Agent': 'ngtrak_bot/1.0' } });
    const data = await res.json();
    const pages = data.query?.pages;
    if (pages) {
      const page = Object.values(pages)[0];
      return page.imageinfo[0].url;
    }
  } catch(e) {}
  return null;
}

async function main() {
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith('.json'));
  
  for (const file of files) {
    const slug = file.replace('.json', '');
    const data = JSON.parse(fs.readFileSync(path.join(dataDir, file), 'utf8'));
    const destPath = path.join(outputDir, `${slug}.jpg`);
    
    if (fs.existsSync(destPath)) {
      console.log(`Skipping ${slug}, image already exists.`);
      continue;
    }

    console.log(`Fetching image for ${data.name}...`);
    
    let imgUrl = null;
    if (data.capital) {
      imgUrl = await fetchWikipediaImageRest(data.capital.replace(' State', ''));
      if (imgUrl && (imgUrl.toLowerCase().includes('map') || imgUrl.toLowerCase().includes('locator') || imgUrl.toLowerCase().includes('flag') || imgUrl.toLowerCase().includes('seal'))) {
        imgUrl = null;
      }
    }
    
    if (!imgUrl) {
      let stateTitle = `${data.name} State`;
      if (data.name.toLowerCase() === 'fct') stateTitle = 'Abuja';
      imgUrl = await fetchWikipediaImageRest(stateTitle);
      if (imgUrl && (imgUrl.toLowerCase().includes('map') || imgUrl.toLowerCase().includes('locator') || imgUrl.toLowerCase().includes('flag') || imgUrl.toLowerCase().includes('seal'))) {
        imgUrl = null;
      }
    }

    if (!imgUrl) {
       imgUrl = await fetchCommonsImage(`${data.name} State Nigeria city landscape`);
    }
    
    if (!imgUrl) {
       imgUrl = await fetchCommonsImage(`${data.name} Nigeria`);
    }

    if (imgUrl) {
      const success = await downloadImage(imgUrl, destPath);
      if (success) {
        console.log(`✓ Saved ${slug}.jpg`);
      } else {
        console.log(`✗ Failed to save ${slug}.jpg`);
      }
    } else {
      console.log(`✗ No image found on Wikipedia for ${data.name}`);
    }
    
    await new Promise(r => setTimeout(r, 500));
  }
  console.log("Done fetching state images.");
}

main();
