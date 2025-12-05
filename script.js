// === Select all required elements ===
const fromCurrency = document.getElementById("fromCurrency");
const toCurrency = document.getElementById("toCurrency");
const amountInput = document.getElementById("amount");
const result = document.getElementById("result");
const exchangeRateText = document.querySelector(".exchangeRate");
const convertBtn = document.getElementById("convertBtn");
const flag1 = document.querySelector(".flag1");
const flag2 = document.querySelector(".flag2");

// === Function to update flag based on currency code ===
function updateFlag(selectElement, flagImg) {
  let countryCode = selectElement.value.slice(0, 2); // Example: USD → US, INR → IN
  if (countryCode === "EU") countryCode = "EU"; // For Euro (if added later)
  flagImg.src = `https://flagsapi.com/${countryCode.toUpperCase()}/shiny/64.png`;
}

// === Update flags when selection changes ===
fromCurrency.addEventListener("change", () => updateFlag(fromCurrency, flag1));
toCurrency.addEventListener("change", () => updateFlag(toCurrency, flag2));

// === Conversion function using real-time API ===
async function convertCurrency() {
  const amount = parseFloat(amountInput.value);
  if (isNaN(amount) || amount <= 0) {
    result.innerText = "Please enter a valid amount.";
    return;
  }

  const from = fromCurrency.value;
  const to = toCurrency.value;

  // === Use a free currency API ===
  const url = `https://api.exchangerate-api.com/v4/latest/${from}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const rate = data.rates[to];

    const convertedAmount = (amount * rate).toFixed(2);

    result.innerText = `${amount} ${from} = ${convertedAmount} ${to}`;
    exchangeRateText.innerText = `1 ${from} = ${rate.toFixed(2)} ${to}`;
  } catch (error) {
    result.innerText = "Error fetching rates. Try again later.";
    console.error(error);
  }
}

// === Run conversion when button clicked ===
convertBtn.addEventListener("click", convertCurrency);

// === Default flag update on load ===
window.addEventListener("load", () => {
  updateFlag(fromCurrency, flag1);
  updateFlag(toCurrency, flag2);
});
