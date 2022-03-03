// To add:
// who won adden
//- local Storage
//- when fast clicking draw cards -> cards get lost ...



//Get the deck


//this is war loop spielen im background 30stm

// async function getACuteDogPhoto(){
//   const res = await fetch('https://dog.ceo/api/breeds/image/random')
//   const data = await res.json()
//   console.log(data)
// }
// getACuteDogPhoto()

let deckId = ''
let player1CardCount = 26
let botCardCount = 26


//document.querySelector('#player1-counter').innerText = player1CardCount
//document.querySelector('#bot-counter').innerText = botCardCount
async function getDeck(){
  // try{
    const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
    const data = await res.json()
    //console.log(data)
    deckId =  await data.deck_id
    //console.log(deckId)
    document.querySelector('#draw').removeEventListener('click', draw)
   // await drawCards()
    for(let i = 1; i<=26; i++){
      await drawTwoCards()
      await addingToPilePlayer()
      await addingToPileBot()
      await listingCardsInPilesPlayer1()
      await listingCardsInPilesBot()
      document.querySelector('#player1-counter').innerText = p1Remaining
      document.querySelector('#bot-counter').innerText = botRemaining
    }
    document.querySelector('.p-container').style.display= 'none'
    await clickListener()
    //await listingCardsInPilesPlayer1()
    //await listingCardsInPilesBot()
    //await drawFromPilePlayer1()
    //await drawFromPileBot()
    //await cardCounter()
 
 // }
  // catch(error){
  //   console.log(`error ${err}`)
  //  }
  

  
}
getDeck()


document.querySelector('#draw').addEventListener('click', draw )
 


document.querySelector('#play-again').addEventListener('click', reset)

async function reset(){
  location.reload();
}

let player1Val = ''
let botVal = ''


//vlt promise.All
async function draw(){

  document.querySelector('#draw').removeEventListener('click', draw)
  
  document.querySelector('#h2-player').innerText = 'Player'
  document.querySelector('#h2-bot').innerText = 'Bot'
  await drawFromPilePlayer1()
  await drawFromPileBot()
  
   //checkForRemainingCards()
  if(player1Val > botVal){
    document.querySelector('h3').innerText = 'Player Wins'
    await addingBothToPilePlayer()
    await listingCardsInPilesPlayer1()
    await listingCardsInPilesBot()
    document.querySelector('#player1-counter').innerText = p1Remaining
    document.querySelector('#bot-counter').innerText = botRemaining
    document.querySelector('#draw').addEventListener('click', draw )
  }else if(player1Val < botVal){
    document.querySelector('h3').innerText = 'Bot Wins'
    await addingBothToPileBot()
    await listingCardsInPilesPlayer1()
    await listingCardsInPilesBot()
    document.querySelector('#player1-counter').innerText = p1Remaining
    document.querySelector('#bot-counter').innerText = botRemaining
    document.querySelector('#draw').addEventListener('click', draw )
  }else{
    
    document.querySelector('.time-for-war').classList.toggle('hidden')
    document.querySelector('.time-for-war').innerText ='Time for War'
    document.querySelector('h3').innerText = 'Face Up'
    document.querySelector('#draw').removeEventListener('click', draw)
     //checkForRemainingCardsWar()
    await warFunction()
    //War
    //If the two cards played are of equal value, then there is a "war".[2] Both players place the next three cards face down and then another card face-up. The owner of the higher face-up card wins the war and adds all the cards on the table to the bottom of their deck. If the face-up cards are again equal then the battle repeats with another set of face-down/up cards. This repeats until one player's face-up card is higher than their opponent's.[2]

// Most descriptions of War are unclear about what happens if a player runs out of cards during a war.[2] In some variants, that player immediately loses. In others, the player may play the last card in their deck as their face-up card for the remainder of the war or replay the game from the beginning

    //check if player has enough cards, if not -> lost the game!
    
  
// win condition
// card count checken
// war fixen
// layout fixen
// song einfügen this is war!!
  }
  
  
}

// end game is missing so that click event nothing changes!
 function checkForRemainingCards(){
  if(p1Remaining== 0){
    //console.log(p1Remaining)
    //console.log(botRemaining)
      document.querySelector('#draw').removeEventListener('click', draw)
      document.querySelector('#game-over-container').classList.toggle('hidden')
      //console.log(p1Remaining)
      document.querySelector('p').innerText = 'You lost!'
    }else if(botRemaining==0){
     // console.log(p1Remaining)
      //console.log(botRemaining)
      document.querySelector('#draw').removeEventListener('click', draw)
      //console.log(botRemaining)
      document.querySelector('#game-over-container').classList.toggle('hidden')
      document.querySelector('p').innerText = 'You won!'
    }
  }
 function checkForRemainingCardsWar(){
if(p1Remaining<5){
    document.querySelector('#draw').removeEventListener('click', draw)
    document.querySelector('#game-over-container').classList.toggle('hidden')
    //console.log(p1Remaining)
    document.querySelector('game-over').innerText = 'You lost!'
  }else if(botRemaining<5){
    document.querySelector('#draw').removeEventListener('click', draw)
    document.querySelector('#game-over-container').classList.toggle('hidden')
    document.querySelector('.time-for-war').classList.toggle('hidden')
    document.querySelector('game-over').innerText = 'You won!'
    //console.log(botRemaining)
  }
}
async function warFunction(){
  try{

 
    await draw3CardsFromPilePlayer1()
    await draw3CardsFromPileBot()
    setTimeout(drawFaceUpWarCardFromPilePlayer1, 3100)
    setTimeout(drawFaceUpWarCardFromPileBot, 3050)
    //setTimeout(logCards,5000)
    setTimeout(whoWon,5000)
    setTimeout(clickListener, 4200)
    //draw 3 cards, store value, draw another card and show it on screen and do comparison!
    // if(player1Val > botVal){
    //   document.querySelector('h3').innerText = 'Player 1 Wins'
    //   //await addingWarCardsToPilePlayer()
    //   player1CardCount +=4
    //   botCardCount -= 4
    //   console.log(player1CardCount)
    //   console.log(botCardCount)
    //   console.log('player 1 wins')
    //   document.querySelector('#player1-counter').innerText = p1Remaining
    //   document.querySelector('#bot-counter').innerText = botRemaining
    // }else if(player1Val < botVal){
    //   document.querySelector('h3').innerText = 'Bot Wins'
    //   //await addingWarCardsToPileBot()
    //   botCardCount +=4
    //   player1CardCount -=4
    //   console.log(player1CardCount)
    //   console.log(botCardCount)
    //   console.log('bot wins')
    //   document.querySelector('#player1-counter').innerText = p1Remaining
    //   document.querySelector('#bot-counter').innerText = botRemaining
    // }else{
    //   document.querySelector('h3').innerText = 'Time for War'
    // }
  }
  catch(error){
    console.log(`error ${error}`)
  }
}
async function clickListener(){
  document.querySelector('#draw').addEventListener('click', draw)
}


async function whoWon(){
  try {
    document.querySelector('.time-for-war').classList.add('hidden')
  if(player1Val > botVal){
    document.querySelector('h3').innerText = 'Player Wins'
    await addingWarCardsToPilePlayer()
    await listingCardsInPilesPlayer1()
    await listingCardsInPilesBot()
    document.querySelector('#player1-counter').innerText = p1Remaining
    document.querySelector('#bot-counter').innerText = botRemaining
  }else if(player1Val < botVal){
    document.querySelector('h3').innerText = 'Bot Wins'
    await addingWarCardsToPileBot()
    await listingCardsInPilesPlayer1()
    await listingCardsInPilesBot()
    //console.log('bot wins')
    document.querySelector('#player1-counter').innerText = p1Remaining
    document.querySelector('#bot-counter').innerText = botRemaining
  }else{
    document.querySelector('h3').innerText = 'Time for War'
    //console.log(' iam to early i dumbbo')
    //console.log(player1Val)
    //console.log(botVal)
     
    await warFunction()
  }
  await listingCardsInPilesPlayer1()
  await listingCardsInPilesBot()
  }
  catch(error){
    console.log(`error ${err}`)
  }
}

let card0 = ''
let card1 = ''

async function drawTwoCards(){
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
  const data = await res.json()
  //console.log(data)
  card0 = data.cards[0].code
  card1 = data.cards[1].code
  //console.log(card0)
  //console.log(card1)
}

async function addingToPilePlayer(){
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/playerPile/add/?cards=${card0}`)
  const data = await res.json()
  //console.log(data)
}
async function addingBothToPilePlayer(){
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/playerPile/add/?cards=${drawnCardPlayer1},${drawnCardBot}`)
  const data = await res.json()
  //console.log(data)
}
async function addingToPileBot(){
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/botPile/add/?cards=${card1}`)
  const data = await res.json()
  //console.log(data)
}
async function addingBothToPileBot(){
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/botPile/add/?cards=${drawnCardBot},${drawnCardPlayer1} `)
  const data = await res.json()
 // console.log(data)
}

let p1Remaining = ''
let botRemaining = ''
async function listingCardsInPilesPlayer1(){
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/playerPile/list/`)
  const data = await res.json()
 // console.log(data)
  p1Remaining = data.piles.playerPile.remaining
  //console.log(p1Remaining)
  //document.querySelector('#player1-counter').innerText = data.piles.playerPile.remaining
}
async function listingCardsInPilesBot(){
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/botPile/list/`)
  const data = await res.json()
  //console.log(data)
  botRemaining = data.piles.botPile.remaining
  //console.log(botRemaining)
  //document.querySelector('#bot-counter').innerText = data.piles.botPile.remaining
}

let drawnCardPlayer1 = ''
let drawnCardBot = ''

async function drawFromPilePlayer1(){
  checkForRemainingCards()
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/playerPile/draw/bottom/?count=1`)
  const data = await res.json()
  //console.log(data)
  drawnCardPlayer1 = data.cards[0].code
  //console.log(drawnCardPlayer1)
  //console.log(data.cards[0].image)
  document.querySelector('#player1').src = data.cards[0].image
  player1Val = cardValue(data.cards[0].value)
}
async function drawFromPileBot(){
  checkForRemainingCards()
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/botPile/draw/bottom/?count=1`)
  const data = await res.json()
  //console.log(data)
  drawnCardBot = data.cards[0].code
  //console.log(drawnCardBot)
  //console.log(data.cards[0].image)
  document.querySelector('#bot').src = data.cards[0].image
  botVal = cardValue(data.cards[0].value)
}


let p1War1 = ''
let p1War2 = ''
let p1War3 = ''
let botWar1 = ''
let botWar2 = ''
let botWar3 = ''

// //War
// //draw 3 cards and store the value 
async function draw3CardsFromPilePlayer1(){
  try{
  checkForRemainingCardsWar()
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/playerPile/draw/bottom/?count=3`)
  const data = await res.json()
  //console.log(data)
  p1War1 = data.cards[0].code
  //console.log(p1War1)
  p1War2 = data.cards[1].code
 // console.log(p1War2)
  p1War3 = data.cards[2].code
 // console.log(p1War3)
  }
  catch(error){
    console.log(`error ${err}`)
   }
}
async function draw3CardsFromPileBot(){
  checkForRemainingCardsWar()
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/botPile/draw/bottom/?count=3`)
  const data = await res.json()
 // console.log(data)
  botWar1 = data.cards[0].code
 // console.log(botWar1)
  botWar2 = data.cards[1].code
  //console.log(botWar2)
  botWar3 = data.cards[2].code 
 // console.log(botWar3) 
}

let faceUpPlayer = ''
let faceUpBot = ''

async function drawFaceUpWarCardFromPilePlayer1(){
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/playerPile/draw/bottom/?count=1`)
  const data = await res.json()
  //console.log(data)
  faceUpPlayer = data.cards[0].code
  //console.log(drawnCardPlayer1)
  //console.log(data.cards[0].image)
  document.querySelector('#player1').src = data.cards[0].image
  player1Val = cardValue(data.cards[0].value)

}

async function drawFaceUpWarCardFromPileBot(){
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/botPile/draw/bottom/?count=1`)
  const data = await res.json()
 // console.log(data)
  faceUpBot = data.cards[0].code
  
  //console.log(drawnCardPlayer1)
  //console.log(data.cards[0].image)
  document.querySelector('#bot').src = data.cards[0].image
  botVal = cardValue(data.cards[0].value)
}

// async function logCards(){
//   console.log(`${drawnCardPlayer1},${drawnCardBot},${p1War1},${p1War2},${p1War3},${botWar1},${botWar2},${botWar3},${faceUpPlayer},${faceUpBot}`)
// }

// // setTimeout(drawFromPileBot(), 4710) 
// //   setTimeout(drawFromPilePlayer1(), 4700)

// adding War cards to Pile
async function addingWarCardsToPilePlayer(){
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/playerPile/add/?cards=${drawnCardPlayer1},${drawnCardBot},${p1War1},${p1War2},${p1War3},${botWar1},${botWar2},${botWar3},${faceUpPlayer},${faceUpBot}`)
  const data = await res.json()
  //console.log(data)
  //console.log(`${drawnCardPlayer1},${drawnCardBot},${p1War1},${p1War2},${p1War3},${botWar1},${botWar2},${botWar3}`)
}
async function addingWarCardsToPileBot(){
  const res = await fetch(`https://www.deckofcardsapi.com/api/deck/${deckId}/pile/botPile/add/?cards=${drawnCardPlayer1},${drawnCardBot},${p1War1},${p1War2},${p1War3},${botWar1},${botWar2},${botWar3},${faceUpPlayer},${faceUpBot}`)
  const data = await res.json()
 // console.log(data)
}




// async function drawCards(){
//   const res = await fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`)
//   const data = await res.json()
//   console.log(data)
//   let arrayPlayer1  = []
//   for(let i = 0; i<=25;i++){
//     arrayPlayer1.push(data.cards[i])
//   }
//   let arrayPlayer2  = []
//   for(let i = 26; i<52;i++){
//     arrayPlayer2.push(data.cards[i])
//   }
//   console.log(arrayPlayer1)
//   console.log(arrayPlayer2)     
// }
// // //adding to piles

// function addPiles(){
  
//   const urlPilePlayer1 = `https://www.deckofcardsapi.com/api/deck/${deckId}/pile/player1/add/?cards=AS,2S`
//   fetch(urlPilePlayer1)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
  
//   const urlPilePlayer2 = `https://www.deckofcardsapi.com/api/deck/${deckId}/pile/player2/add/?cards=AS,2S`
//   fetch(urlPilePlayer2)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }




// fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//         deckId = data.deck_id
//         console.log(deckId)
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });


// // draw  26 cards
// document.querySelector('button').addEventListener('click', getFetch)

// function getFetch(){
 
//   const url = `https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`

//   fetch(url)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
        
//         let arrayPlayer1  = []
//         for(let i = 0; i<=25;i++){
          
//           arrayPlayer1.push(data.cards[i])
//         }
//         let arrayPlayer2  = []
//         for(let i = 26; i<52;i++){
          
//           arrayPlayer2.push(data.cards[i])
//         }

//         console.log(arrayPlayer1)
//         console.log(arrayPlayer2)
//         //addPiles()
//         //listingCardInPiles()
//         console.log('höö')
//       })
//       .then(()=> {
//         console.log('wait')
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }
// //adding to piles

// function addPiles(){
  
//   const urlPilePlayer1 = `https://www.deckofcardsapi.com/api/deck/${deckId}/pile/player1/add/?cards=AS,2S`
//   fetch(urlPilePlayer1)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
  
//   const urlPilePlayer2 = `https://www.deckofcardsapi.com/api/deck/${deckId}/pile/player2/add/?cards=AS,2S`
//   fetch(urlPilePlayer2)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data)
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }



// function listingCardInPiles(){
//   const urlListingCards =   `https://www.deckofcardsapi.com/api/deck/${deckId}/pile/player1/list/`
//     fetch(urlListingCards)
//       .then(res => res.json()) // parse response as JSON
//       .then(data => {
//         console.log(data.piles)
//       })
//       .catch(err => {
//           console.log(`error ${err}`)
//       });
// }



function cardValue(val){
  if(val === "ACE"){
    return 14
  }else if (val === "KING"){
    return 13
  }else if(val === "QUEEN"){
    return 12
  }else if(val === "JACK"){
    return 11
  }else{
    return Number(val)
  }
}

// // get deck id / deck
// get deck id  

// and add to 2 piles for p1 and p2
// // draw from each pile 1 card -> compare add/ draw more cards -> compare -> add to one pile
// // till one pile is empty

// let val1 = Number(cardValue( data.cards[0].value ))
//         let val2 = Number(cardValue( data.cards[1].value ))
//         document.querySelector('#player1').src = data.cards[0].image
//         document.querySelector('#player2').src = data.cards[1].image
//         if(val1 > val2){
//           document.querySelector('h3').innerText = 'Player 1 WON!'
//           player1Pile()
//         }else if(val1 < val2){
//           document.querySelector('h3').innerText = 'Player 2 WON!'
//         }else{
//           document.querySelector('h3').innerText = 'WAR!'
//         }


