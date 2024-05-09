const coinsWrapper = document.querySelector(".coins-wrapper");

window.addEventListener("load", async () => {
  const exchangeRate = await getDataFromAPI(
    "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=inr"
  );
  const response = await getDataFromAPI(
    "https://api.coingecko.com/api/v3/search/trending"
  );

  
  showTrendingCoins(response.coins, exchangeRate.bitcoin.inr);

  const coinsWrapper = document.querySelector(".coins-wrapper");

  
  const scrollDuration = 10000; 
  const scrollInterval = 20;
  const scrollIncrement = 1; 

 
  function scrollCoinsWrapper() {
  
    if (coinsWrapper.scrollLeft >= coinsWrapper.scrollWidth - coinsWrapper.clientWidth) {
      coinsWrapper.scrollLeft = 0; 
    } else {
      coinsWrapper.scrollLeft += scrollIncrement; 
    }
  }


  setInterval(scrollCoinsWrapper, scrollInterval);

});

function showTrendingCoins(data, exchangeRate) {
  data.forEach((coin) => {
    const coins = document.createElement("div");
    coins.classList.add("coins");

    const img = document.createElement("img");
    img.classList.add("coin-img");
    img.src = coin.item.thumb;

    const rightDiv = document.createElement("div");

    const name = document.createElement("h3");
    name.classList.add("coin-name");
    name.innerHTML = coin.item.name + " ( " + coin.item.symbol + " )";

    const price = document.createElement("p");
    price.classList.add("coin-price");
    price.innerText =
      "₹ " + getCoinPriceInINR(coin.item.price_btc, exchangeRate);

    rightDiv.append(name, price);

    coins.append(img, rightDiv);

    coinsWrapper.append(coins);
  });
}

function getCoinPriceInINR(price_btc, exchangeRate) {
  return Math.round(price_btc * exchangeRate * 10000) / 10000;
}

async function getDataFromAPI(url) {
  const response = await fetch(url);
  const result = await response.json();
  return result;
}

window.addEventListener('DOMContentLoaded', () => {
    const heading = document.querySelector('h1');
    heading.querySelectorAll('span').forEach((span, index) => {
      span.style.setProperty('--index', index);
    });
  });
  