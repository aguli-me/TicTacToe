var matrix = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8]
];
var size = 3;
var moveNo = 0;
var user;

// Function is called whenever user clicks on a Box/rectangle
function selectBox(data, index) {
  var i = Math.trunc(data/3);
  var j = index;
  moveNo++;
  user = moveNo % 2 ? "A" : "B";
  matrix[i][j] = user;

  if (user === "A") {
    drawX(j*100, i*100);
  } else {
    drawO(j*100, i*100);
  }

  if (moveNo < 5) {
    return;
  } else {
    let result = checkGame(i,j);
    if (result) {
      let str = "User " + user + " Won!";
      d3.select("#result").text(str);
    }
  }
}

// Function is called to check if the Game is finished
// after each user takes turns
function checkGame(i,j) {
  let result = checkHorizontal(i);
  if (result) { return result; }

  result = checkVertical(j);
  if (result) { return result; }

  result = checkDiagonal();
  return result;
}

function checkHorizontal(i) {
  if (matrix[i][0] === matrix[i][1]
    && matrix[i][0] === matrix[i][2]
  ) {
    return true;
  }
}

function checkVertical(j) {
  if (matrix[0][j] === matrix[1][j]
    && matrix[0][j] === matrix[2][j]
  ) {
    return true;
  }
}

function checkDiagonal() {
  if (matrix[0][0] === matrix[1][1]
    && matrix[0][0] === matrix[2][2]
    ||
    matrix[0][2] === matrix[1][1]
    && matrix[2][0] === matrix[1][1]
  ) {
    return true;
  }
}

function drawX(x, y) {
  d3.select("svg")
    .append("line") // attach a line
    .style("stroke", "green") // colour the line
    .style("stroke-width", 10)
    .attr("x1", x + 11)
    .attr("y1", y + 11) 
    .attr("x2", x + 80) 
    .attr("y2", y + 80);

  d3.select("svg")
    .append("line") // attach a line
    .style("stroke", "green") // colour the line
    .style("stroke-width", 10)
    .attr("x1", x + 80)
    .attr("y1", y + 11)
    .attr("x2", x + 11)
    .attr("y2", y + 80);
}

function drawO(x, y) {
  d3.select("svg")
    .append("circle") // attach a line
    .style("fill", "pink")
    .attr("cx", x + 50)
    .attr("cy", y + 50)
    .attr("r", 35);

  d3.select("svg")
    .append("circle") // attach a line
    .style("fill", "white")
    .attr("cx", x + 50)
    .attr("cy", y + 50)
    .attr("r", 25);
}

// Execution begins from here.
function ready() {
  d3.select("body")
    .style("background-color", "#333333");

  var canvas = d3.select("svg");

  var row = canvas.selectAll("g")
    .data(matrix)
    .enter()
    .append("g");

  row.selectAll("rect")
    .data(function(d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("width", 100)
    .attr("height", 100)
    .attr("rx", 10)
    .style("fill", "white")
    .style("stroke", "grey")
    .attr("transform", function(d, innerArrIndex) {
      let outerArrIndex = Math.trunc(d/3);
      return "translate(" + innerArrIndex*100 + "," + outerArrIndex*100 + ")";
    })
    .on("click", function( d, i){
      selectBox(d, i);
    });

  d3.select("svg")
    .append("text") // append text
    .style("fill", "white") // fill the text with the colour black
    .attr("x", 540)
    .attr("y", 100) // set x position of left side of text
    .attr("transform", "rotate(10)")
    .text("Tic");

  d3.select("svg")
    .append("text") // append text
    .style("fill", "white") // fill the text with the colour black
    .attr("x", 650) // set x position of left side of text
    .attr("y", 130) // set y position of bottom of text
    .attr("transform", "rotate(16)")
    .text("Tac");

  d3.select("svg")
    .append("text") // append text
    .style("fill", "white") // fill the text with the colour black
    .attr("x", 650) // set x position of left side of text
    .attr("y", 300)
    .attr("transform", "rotate(-10)") // set y position of bottom of text
    .text("Toe!");
};