let tries = 1
let last_2_cards = []
let total_seconds = 0
let currect_flips = []
let time_interval_id = 0

function on() {
    document.getElementById("overlay").style.display = "block";
    document.getElementById("gameover").style.display = "none";
    document.getElementById("card-grid").hidden = true;
    document.getElementById("topper").hidden = true;
}

function shuffle(array) { 
  for (let i = array.length - 1; i > 0; i--) { 
    const j = Math.floor(Math.random() * (i + 1)); 
    [array[i], array[j]] = [array[j], array[i]]; 
  } 
  return array; 
}; 

function set_time(){
    let timer = document.getElementById("time")
    ++total_seconds
    timer.innerHTML = total_seconds 
}

function init_game() {
    tries = 1
    last_2_cards = []
    total_seconds = 0
    currect_flips = []
    time_interval_id = 0
    
    const pairs = document.getElementById("pairs").value;
    var cards = [];
    for (let i = 1; i <= pairs; i++) {
        for (let j = 0; j < 2; j++) {
            let card = document.createElement("div");
            card.className = "col playing-card"
            
            let card_image = document.createElement("img")
            card_image.src = "cards/back.svg"
            card_image.dataset.card = "cards/" + i + ".png"
            card_image.className = "playing-card-image"
            card_image.setAttribute("onclick","flip_card(this)")

            card.appendChild(card_image)
            cards.push(card)
        }
    }

    shuffle(cards)
    for (let i = 0 ; i < cards.length; i++) {
        document.getElementById("card-list").appendChild(cards[i])
    }

    total_seconds = 0
    time_interval_id = setInterval(set_time,1000)

    document.getElementById("name").innerHTML = document.getElementById("username").value
}

function gameover() {
    clearInterval(time_interval_id)
    document.getElementById("card-grid").hidden = true;
    document.getElementById("topper").hidden = true;
    document.getElementById("gameover").style.display =  "block"

    document.getElementById("result").innerHTML = document.getElementById("time").innerHTML
}

function flip_card(card){
    if (last_2_cards.length == 0){
        last_2_cards.push(card)
    } else if (last_2_cards.length == 1) {
        last_2_cards.push(card)
        if (card.getAttribute("data-card") == last_2_cards[0].getAttribute("data-card")) {
            last_2_cards = []
            currect_flips.push(card)
        }
    } else {
        for (let i = 0; i < last_2_cards.length; i++) {
            last_2_cards[i].src = "cards/back.svg"
            last_2_cards[i].setAttribute("onclick","flip_card(this)")
        }
        last_2_cards = [card]

    }
    card.src = card.getAttribute("data-card")
    card.setAttribute("onclick","")
    if (currect_flips.length == document.getElementById("pairs").value) {
        gameover()
    }
    
}

function reset() {
    document.getElementById("card-list").innerHTML = ""
    document.getElementById("time").innerHTML = 0
    on()
}

function game_start() {
    let pairs = document.getElementById("pairs").value;
    if (pairs < 1 || pairs > 15) {
        alert("number of pairs must be between 1 and 15");
        return
    }
    document.getElementById("overlay").style.display = "none";
    document.getElementById("gameover").style.display = "none";
    document.getElementById("card-grid").hidden = false;
    document.getElementById("topper").hidden = false;
    init_game()
}


