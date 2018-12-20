/*
Name: Bunchhoung Tiv
Email: bunchhoung_tiv@student.uml.edu
Affiliation: Student at UML in course 91.61 GUI Programming I
Date: December 19, 2018
*/

//variable to hold high score
var highScore = 0;

//Global array for inserting letters
letterArray = [];

//reset
function reset(){
    letterArray = [];
    settingHand();
    TileDraggable();
    BoardDroppable();
    HandDroppable();
}

//main function that runs the functions
$(document).ready(function(){
    settingBoard();
    reset();
 });

function settingHand(){
    $("#hand").empty();
    for(let i = 0; i < 7; ++i){
        const randIndex = Math.floor(Math.random() * 27);
        $("#hand").append("<img id = 'letter" + i + "' class = 'letterTile' letter = '" + tiles[randIndex].letter + "' src = '" + tiles[randIndex].image + "' />");
    }
}

function settingBoard(){
    for(let i = 0; i < 7; ++i){
        $("#board").append("<img id = 'boardtile "+ i + "'class = 'board' index = '"+ i +"'type = '" + board[i].type + "'src = '" + board[i].image + "' />");
    }
}

//Tiles in your hand become draggable
function TileDraggable () {
    $(".letterTile").draggable({
        snapMode: 'inner',
    });
}

//Allows the board to allow letter tiles to be dropped
function BoardDroppable () {
    $(".board").droppable({
        accept: '.letterTile',
        drop: addLetter
    });
}

//allows user to return tiles back to hand
function HandDroppable () {
    $('#hand').droppable({
        accept: '.letterTile',
        drop: rackDrop,
    });
}

function addLetter(event, ui){
    ui.draggable.position ({
        of: $(this),
    });

    const id = ui.draggable.attr('letter');
    const type = $(this).attr('type');
    const index = $(this).attr('index');

    letterArray[id] = {index, type}

    console.log(letterArray[id]);
}

//when tiles are dropped into the board, it will click in
function HandDrop(event, ui){
    const id = ui.draggable.attr('id');
    const letter = ui.draggable.attr('letter');
    
    console.log(letterArray[letter]);
    delete letterArray[letter];

    ui.draggable.remove();

    $("#hand").append("<img id = 'letter" + id + "' class = 'letterTile' letter = '" + letter + "' src = 'image/letter/Tile" + letter + ".jpg' />");

    TileDraggable();
}

//Had help from Albara Mehene for checking score
function submit() {
    let position = [];
    let wArray = new Array();
    console.log(Object.keys(letterArray));

    for (const key of Object.keys( letterArray )) {
        const pos = Number (letterArray[key]['index']);
        position.push (pos);          
        wArray[pos] = key;          
    }

    var score = calculateScore ();

    position = position.sort(function(a, b) {return a - b;});

    if(score > highScore){
        highScore = score;
    }

    $("#currentScore").text(score);
    $("#highScore").text(highScore);

    reset();
}

//Had help from Albara Mehene for calculate score function
function calculateScore () {
    let score = 0;
    for (const key of Object.keys (letterArray)) {
        const tileType = letterArray[key]['type'];
        const value = getLetterValue (key);
        
        if (tileType == '2XLetter'){
            score += value * 2;
        }else if (tileType == '2XWord'){
            score += value * 2;
        }else{
            score += value;
        }
    }
    return score;
}

//Gets the value of the letter value
function getLetterValue (letter) {
    const obj = tiles.filter ((val) => val.letter == letter)[0];
    return obj.value;
}



