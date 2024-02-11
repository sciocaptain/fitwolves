const puppeteer = require('puppeteer');

async function scrapeMenuItems() {
  // Launch a headless browser
  const browser = await puppeteer.launch();

  // Open a new page
  const page = await browser.newPage();

  try {
    // Navigate to the webpage
    await page.goto('https://stonybrook.nutrislice.com/menu/east-side-dining');

    // Wait for the page to fully load
    await page.waitForNavigation({ waitUntil: 'networkidle0' });

    // Scrape all elements with class 'menu-item'
    const menuItems = await page.evaluate(() => {
      // Use Array.from to convert NodeList to Array
      const items = Array.from(document.querySelectorAll('.menu-item'));
      // Map over the array to extract text content from each element
      return items.map(item => item.textContent.trim());
    });

    // Output the menu items
    console.log('Menu Items:');
    console.log(menuItems);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the browser
    await browser.close();
  }
}

// Call the scraping function
scrapeMenuItems();
