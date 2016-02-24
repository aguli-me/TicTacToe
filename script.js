var matrix = [
  [],
  [],
  []
];

var realData = [];
$(document).ready(function(){

var data = [1, 2, 3, 4, 5, 6];

    realData = [{
      data: 1,
      state: 1
    }, {
      data: 2,
      state: 1
    }, {
      data: 3,
      state: 1
    }, {
      data: 4,
      state: 1
    }, {
      data: 5,
      state: 1
    }, {
      data: 6,
      state: 1
    }, {
      data: 7,
      state: 1
    }, {
      data: 8,
      state: 1
    }, {
      data: 9,
      state: 1
    }];


 var count = 0;
 
 for (var i=0; i<3; i++) {
   for (var j=0; j<3; j++) {
      matrix[i][j] = null;
      realData[count].index = [i, j];
      count++;
   }
} 


    d3.select('body')
      .style('background-color', '#333333');

    var canvas = d3.select('body')
      .append('svg')
      .attr('width', 900)
      .attr('height', 500); 

    var squares = canvas.selectAll('rect')
      .data(realData)
      .enter()
      .append('rect')
      .attr('width', 150)
      .attr('height', 150)
      .attr('fill', 'white')
      .attr('rx', '5')
      .attr('ry', '5')
      .attr('class', function(d) {
        return d.index[0]+ " = "+d.index[1];
      })
      .attr('id', function(d, i){
        return 'rect' + i;
      })
      .style('stroke', '#006600')
      .attr('x', function(d, i) {
        return ((d.data - 1) % 3) * 160;
      })
      .attr('y', function(d, i) {
        return Math.trunc(i / 3) * 160;
      })
      .on('click', function(d, i) {
        selectBox(d,i, this);
      });

    d3.select('svg')
    .append("text")         // append text
    .style("fill", "white")   // fill the text with the colour black
    .attr("x", 540) 
    .attr('y', 100)          // set x position of left side of text
    .attr("transform", "rotate(10)")
    .text("Tic");
 
    d3.select('svg')
    .append("text")         // append text
    .style("fill", "white")   // fill the text with the colour black
    .attr("x", 850)           // set x position of left side of text
    .attr("y", 200)           // set y position of bottom of text
    .attr("transform", "rotate(10)")
    .text("Tac");
 
    d3.select('svg')
    .append("text")         // append text
    .style("fill", "white")   // fill the text with the colour black
    .attr("x", 650)           // set x position of left side of text
    .attr("y", 300)   
    .attr("transform", "rotate(-10)")        // set y position of bottom of text
    .text("Toe!");
});


    var user1 = {
      current: true,
      selected: []
    };
    
    var user2 = {
      current: false,
      selected: []
    };
    
    function selectBox(d, i, rect) {
      var index = d.index;

      if (!matrix[index[0]][index[1]]) {
        
        if (user1.current && !user2.current) {
          matrix[index[0]][index[1]] = 1;
          drawHug(index, d, i, rect);
          user1.selected.push(index);
          user1.current = false;
          user2.current = true;
        } else if (!user1.current && user2.current) {
          matrix[index[0]][index[1]] = 2;
          drawKiss(index, d , i, rect);
          user2.selected.push(index);
          user1.current = true;
          user2.current = false;
        } else {
          console.log("shouldn't reach here!");
        }
      } else {
        alert("You cannot check a box which is already selected!")
      }

      var result = gameOver(index);

      if (result) {
        alert("Congratulations " + result + "! You have won!!");
      }
    }
    
    function gameOver(index) {
      var temp = matrix[index[0]][index[1]];
      if (index[0] === index[1]) {
        var nextIndex = index[0];
        if (nextIndex === 0) {
          nextIndex++;
          if (matrix[nextIndex][nextIndex] === temp) {
            nextIndex = nextIndex++;
            if (matrix[nextIndex][nextIndex] === temp) {
              if (temp === 1) {
                return "user1";
              } else {
                return "user2";
              }
            }
          }
        }
        if (nextIndex === 1) {

        }
        if (nextIndex === 2) {
          nextIndex = nextIndex-1;
          if (matrix[nextIndex][nextIndex] === temp) {
            nextIndex = nextIndex-1;
            if (matrix[nextIndex][nextIndex] === temp) {
              if (temp === 1) {
                return "user1";
              } else {
                return "user2";
              }
            }
          }
        }
      }
    }
    
    function drawHug(index, d, i, rect) {
      var x = rect.x.animVal.value;
      var y = rect.y.animVal.value;

      d3.select('svg')
        .append("line")          // attach a line
        .style("stroke", "green")
        .style("stroke-width", 10)  // colour the line
        .attr("x1", x+7)     // x position of the first end of the line
        .attr("y1", y+7)      // y position of the first end of the line
        .attr("x2", x+140)     // x position of the second end of the line
        .attr("y2", y+140); 

      d3.select('svg')
        .append("line")          // attach a line
        .style("stroke", "green")
        .style("stroke-width", 10)  // colour the line
        .attr("x1", x+140)     // x position of the first end of the line
        .attr("y1", y+7)      // y position of the first end of the line
        .attr("x2", x+7)     // x position of the second end of the line
        .attr("y2", y+140);
    }
    
    function drawKiss(index, d, i, rect) {
      var x = rect.x.animVal.value;
      var y = rect.y.animVal.value;

      d3.select('svg')
        .append("circle")          // attach a line
        .style("fill", "pink")
        .attr("cx", x+75)     // x position of the first end of the line
        .attr("cy", y+75)      // y position of the first end of the line
        .attr("r", 75);

      d3.select('svg')
        .append("circle")          // attach a line
        .style("fill", "white")
        .attr("cx", x+75)     // x position of the first end of the line
        .attr("cy", y+75)      // y position of the first end of the line
        .attr("r", 60);
    }
    