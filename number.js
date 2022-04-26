/**
 * Get a random fact from your favorite number
 */

function getFavoriteNumFact(number = 4) {
  let url = `http://numbersapi.com/${number}?json`;
  let fact = axios.get(url);
  fact.then((res) => $("#number-facts").append($("<li>").text(res.data.text)));
}

/**
 * Get 3 facts from different numbers
 */
function getNumFacts(randomNum1 = 42, randomNum2 = 96, randomNum16 = 100) {
  let url = `http://numbersapi.com/${randomNum1},${randomNum2},${randomNum16}?json`;
  axios.get(url).then((data) => {
    values = Object.values(data.data);
    values.forEach((fact) => {
      $("#number-facts").append($("<li>").text(`${fact}`));
    });
  });
}

/**
 *Get 4 facts from your favorite number
 */
function getFavNumFacts(number = 4) {
  let url = `http://numbersapi.com/${number}?json`;

  Promise.all(
    Array.from({ length: 4 }, () => {
      return axios.get(url);
    })
  ).then((facts) => {
    facts.forEach((data) =>
      $("#number-facts").append($("<li>").text(`${data.data.text}`))
    );
  });
}
