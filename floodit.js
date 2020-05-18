// Variables du jeu
const gameSize = 12; // Taille de la grille
const colors = {
	red: "rgb(255, 0, 0)",
	green: "rgb(0, 255, 0)",
	blue: "rgb(0, 0, 255)",
	yellow: "rgb(255, 255, 0)",
	magenta: "rgb(255, 0, 255)",
	cyan: "rgb(0, 255, 255)",
}; // Les differentes couleurs dispo

// Creation de la grille
function createGrid() {
	var gameTable = $( "<table></table>" );
	for(let i=0 ; i<gameSize ; i++) {
		var line = $( "<tr></tr>" );
		for(let j=0 ; j<gameSize ; j++) {
			var cell = $( "<td></td>" );
			cell.addClass("cell");
			cell.attr("id", "cell"+i+"-"+j);
			cell.appendTo(line);
		}
		line.appendTo(gameTable);
	}
	gameTable.appendTo($( "#floodit" ));
	$( '<span id="flooditNbSteps"></span>' ).appendTo($( "#floodit" ));
}

// Creation du tableau de jeu
function randomArray(n) {
	var gameArray = new Array();
	var colorArray = Object.keys(colors);
	for(let i=0 ; i<n ; i++) {
		var line = new Array();
		for(let j=0 ; j<n ; j++) {
			line.push(colorArray[Math.floor(Math.random() * Math.floor(colorArray.length))]);
		}
		gameArray.push(line);
	}
	return gameArray;
}

// Appliquer le tableau a la grille
function applyArrayToGrid(array) {
	for(let i=0 ; i<array.length ; i++) {
		for(let j=0 ; j<array[i].length ; j++) {
			var cellId = "#cell"+i+"-"+j;
			$( cellId ).css("background-color", colors[array[i][j]]);
		}
	}
}

function remplir(i, j, array, color, prevColor) {
	if(i>=0 && j>=0 && i<array.length && j<array.length) {
		if(array[i][j] === prevColor) {
			array[i][j] = color;
			remplir(i-1, j, array, color, prevColor);
			remplir(i+1, j, array, color, prevColor);
			remplir(i, j-1, array, color, prevColor);
			remplir(i, j+1, array, color, prevColor);
		}
	}
}

// Jeu
createGrid();
var nbSteps = 0;
var gameArray = randomArray(gameSize);
console.log(gameArray);
applyArrayToGrid(gameArray);
$( "td.cell" ).on( "click", function( event ) {
	const [clickedI, clickedJ] = $( event.target ).attr("id").slice(4).split('-');
	const previousColor = gameArray[0][0];
	const color = gameArray[clickedI][clickedJ];
	if(previousColor !== color) {
		remplir(0, 0, gameArray, color, previousColor);
		nbSteps++;
	}
	applyArrayToGrid(gameArray);
	$( "#flooditNbSteps" ).html("Nombre de coups : " + nbSteps);
});