const puppeteer = require("puppeteer");
const fs = require("fs");

function startScrapper() {
  (async function () {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    console.log("scraperis started");
    const urls = {
      "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=M&age1=&age2=&period=&period2=":
        "men",
      "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=F&age1=&age2=&period=&period2=":
        "female",
      "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=&age1=&age2=&period=&period2=":
        "general",
      "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=&age1=&age2=18&period=&period2=":
        "youthU18",
      "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=&age1=&age2=14&period=&period2=":
        "youthU14",
      "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=&age1=&age2=10&period=&period2=":
        "youthU10",
      "https://ratings.fide.com/a_top_var.php?continent=&country=LTU&rating=&gender=&age1=50&age2=&period=&period2=":
        "senior",
    };
  
    const data = {};
  
    for (const url in urls) {
      await page.goto(url);
  
      const pageData = await page.evaluate(function () {
        const tableRow = document.querySelectorAll("tr");
        const dataArray = [];
  
        // Get the number of rows in the table, up to a maximum of 21
        const rowCount = Math.min(tableRow.length, 21);
  
        for (let i = 1; i < rowCount; i++) {
          const tdElements = tableRow[i].querySelectorAll("td");
  
          if (tdElements.length >= 6) {
            const nr = tdElements[0].innerText;
            const playerTitle = tdElements[2].innerText;
            const playerName = tdElements[1].innerHTML;
            const playerRating = tdElements[4].innerText;
  
            dataArray.push({
              nr,
              playerName,
              playerName: tableRow[i].querySelector("a").innerHTML,
              playerTitle,
              playerRating,
            });
          }
        }
        return dataArray;
      });
  
      // Use the URL as the key
      const key = urls[url];
      data[key] = pageData;
    }
  
    fs.writeFile("data.json", JSON.stringify(data), "utf8", function (err) {
      if (err) {
        return console.log(err);
      }
      console.log(
        "The data has been scraped and saved successfully! View it at './data.json'",
      );
    });
  
    await browser.close();
  })();
};

startScrapper()

