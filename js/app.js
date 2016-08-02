var n = 0, fieldText = "", user = "", AIuser = "", turn = "", gameOver = false, userPoints = [], AIPoints = [], moves = [1,2,3,4,5,6,7,8,9], won = [[1,2,3],[4,5,6],[7,8,9],[1,4,7],[2,5,8],[3,6,9],[1,5,9],[3,5,7]];

function reset() {
  $( '.head' ).text("Welcome to Tic Tac Toe");
  $('.field').html('&nbsp');
  turn = "o";
  userPoints = [];
  AIPoints = [];
  moves = [1,2,3,4,5,6,7,8,9];
  gameOver = false;
}
function clicked(val){
  fieldText = $( val ).text();
  if (turn === user && gameOver === false && fieldText != "o" && fieldText != "x") {
    var info = Number($( val ).attr( "value" ));
    var isIn = $.inArray(info, moves);
    if(turn === "o"){
      $( val ).text("o");
    }
    if(turn === "x") {
      $( val ).text("x");
    }
    userPoints.push(info);
    moves.splice( isIn, 1 );
    if(turn === "x") {turn = "o";}
      else {turn = "x";}
    game();
  }
}
function AI() {
  var item = moves[Math.floor(Math.random()*moves.length)];
  var selected = "div[value='" + item + "']";
  moves.splice( $.inArray(item, moves), 1 );
  $( selected ).text(turn);
  if (turn === "o") {turn = "x";}
  else {turn = "o";}
  AIPoints.push(item);
  game();
}
function isGameOver() {
  var z = 0, x = 0;
  userPoints = userPoints.sort();
  AIPoints = AIPoints.sort();
  for (var i = won.length-1; i >= 0; i--) {
    z = x = 0;
    for (var j = 2 ; j >= 0; j--) {
      if(userPoints.indexOf(won[i][j]) === -1){
        j = -1;
        z = 0;
      }
      z++;
    }
    for (var k = 2 ; k >= 0; k--) {
      if(AIPoints.indexOf(won[i][k]) === -1){
        k = -1;
        x = 0;
      }
      x++;
    }
    if(z === 3) {
      console.log(won[i]);
      return "user";
    }
    if(x === 3) {
      console.log(won[i]);
      return "AI";
    }
  }
}

function gamesOver(end) {
  gameOver = true;
  if(end === "tie"){
    $( '.head' ).text("Game is a TIE!!");
    $( '.head' ).effect('shake', 'slow');
    setTimeout(function (){
      reset();
      game();
    }, 1500);
  }
  else if (end === "x"){
    $( '.head' ).text( user + " won the game!! Click start to play again");
    $( '.head' ).effect('shake', 'slow');
    setTimeout(function (){
      reset();
      game();
    }, 2500);
  }
  else {
    $( '.head' ).text(AIuser + " won the game!! Click start to play again");
    $( '.head' ).effect('shake', 'slow');
    setTimeout(function (){
      reset();
      game();
    }, 2500);
  }
}
function game() {
  n = isGameOver();
  if(n === "user") {gamesOver("x");}
  if(n === "AI") {gamesOver("");}
  if(moves.length === 0) {gamesOver("tie");}
  if(turn !== user && gameOver === false) {AI();}
  $( '.headSub' ).text("It is " + turn + " turn.");
}

$( window ).load( function() {
  $('#overlay')
    .fadeIn()
    .find('#modal')
    .fadeIn();
  $( '.start' ).on('click', function(event) {
    event.preventDefault();
    $('#overlay')
    .fadeIn()
    .find('#modal')
    .fadeIn();
  });
  $( '.close' ).on('click', function(event) {
    event.preventDefault();
    $('#overlay')
    .fadeOut()
    .find('#modal')
    .fadeOut();
  });
  $( '.x' ).click( function() {
    user = "x";
    AIuser = "o";
    reset();
    game();
  });
  $( '.o' ).click( function() {
    user = "o";
    AIuser = "x";
    reset();
    game();
  });
  $('.field').on('click', function(){
    clicked(this);
  });
});
