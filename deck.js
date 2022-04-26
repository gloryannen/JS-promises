/**
 * Get deck, shuffle it, then draw a card
 * Show card value and suit
 * Cards drawn again do so from the same deck
 */
function drawCard() {
  let deck = "http://deckofcardsapi.com/api/deck/new/shuffle";
  axios.get(deck).then((res) => {
    const deck_id = res.data.deck_id;
    axios
      .get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
      .then((res) => {
        console.log(res.data.cards[0].value, "OF", res.data.cards[0].suit);
      });
  });
}

/**
 * Load HTML with button to draw cards from a deck
 */
function setHTMLDeck() {
  let $deckContainer = $("#deck-container").addClass(
    "container justify-content-md-center text-center"
  );
  let $btn = $("#card-btn");

  let deck = "http://deckofcardsapi.com/api/deck/new/shuffle";
  axios.get(deck).then((res) => {
    const deck_id = res.data.deck_id;
    $btn.click(function () {
      axios
        .get(`http://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
        .then((res) => {
          let data = res.data;
          $deckContainer.append(
            $("<img>")
              .attr("src", data.cards[0].image)
              .addClass("ml-2 mb-2")
              .width("150px")
          );
          if (data.remaining == 0)
            $btn
              .prop("disabled", true)
              .html("No More Cards")
              .removeClass("btn-success")
              .addClass("btn-danger");
        });
    });
  });
}
setHTMLDeck();
