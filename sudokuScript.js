var curPuzzle;
var curSolution;
var strikes;
var boxes;
var inNoteMode= false;
var emptySpaces;
function copy(board){
    var retVal = new Array(9);
    for (var i=0;i<9;i++)
        retVal[i]= new Array(9);
    for(var r=0;r<9;r++){
        for(var c=0;c<9;c++){
            retVal[r][c]= board[r][c];
        }
    }
    return retVal;
}
solution1=[[2,9,6,3,1,8,5,7,4],
    [5,8,4,9,7,2,6,1,3],
    [7,1,3,6,4,5,2,8,9],
    [6,2,5,8,9,7,3,4,1],
    [9,3,1,4,2,6,8,5,7],
    [4,7,8,5,3,1,9,2,6],
    [1,6,7,2,5,3,4,9,8],
    [8,5,9,7,6,4,1,3,2],
    [3,4,2,1,8,9,7,6,5]];

var boards = []
boards[0]=solution1;
boards.push([[3,9,1,2,8,6,5,7,4],
             [4,8,7,3,5,9,1,2,6],
             [6,5,2,7,1,4,8,3,9],
             [8,7,5,4,3,1,6,9,2],
             [2,1,3,9,6,7,4,8,5],
             [9,6,4,5,2,8,7,1,3],
             [1,4,9,6,7,3,2,5,8],
             [5,3,8,1,4,2,9,6,7],
             [7,2,6,8,9,5,3,4,1]])
boards.push([[8,2,4,9,5,3,6,7,1],
             [6,3,5,8,1,7,9,2,4],
             [7,1,9,6,2,4,8,5,3],
             [5,8,7,2,9,1,3,4,6],
             [1,4,2,7,3,6,5,8,9],
             [3,9,6,4,8,5,2,1,7],
             [2,6,1,5,4,9,7,3,8],
             [4,7,8,3,6,2,1,9,5],
             [9,5,3,1,7,8,4,6,2]])
boards.push([[4,5,2,3,9,1,8,7,6],
             [3,1,8,6,7,5,2,9,4],
             [6,7,9,4,2,8,3,1,5],
             [8,3,1,5,6,4,7,2,9],
             [2,4,5,9,8,7,1,6,3],
             [9,6,7,2,1,3,5,4,8],
             [7,9,6,8,5,2,4,3,1],
             [1,8,3,7,4,9,6,5,2],
             [5,2,4,1,3,6,9,8,7]])
function setBoard(start){
    for(var row=0;row<9;row++){
        for(var col=0;col<9;col++){
            var id = (row+1).toString()+(col+1).toString();
            var box=document.getElementById(id);
            if(start[row][col]!=0){

                box.value=start[row][col];
                box.disabled=true;
            }
            else{
                box.value="";
                box.disabled=false;
            }
        }
    }
}
function calcSquare(row,col){
    if(row<3){
        if(col<3){return 0}
        if(col<6){return 1}
        return 2
    }
    else if(row<6){
        if(col<3){return 3}
        if(col<6){return 4}
        return 5
    }
    else{
        if(col<3){return 6}
        if(col<6){return 7}
        return 8
    }
}
function Box(row,col){
    this.square = calcSquare(row,col)
    this.n=[1,2,3,4,5,6,7,8,9];
    this.val;
}
function genSol(){
    var valid = true;
    function attempt(){
        var boxes = new Array(9);
        var squares = new Array(9)
        for(var i=0;i<9;i++){squares[i]=[]}
        var sol = new Array(9);

        for(var r=0; r<9; r++) {
            boxes[r] = new Array(9);
            sol[r] = new Array(9);
            for(var c=0;c<9;c++){
                boxes[r][c]= new Box(r,c);

                squares[boxes[r][c].square].push(boxes[r][c]);
            }
        }

        for(var r=0; r<9; r++) {
            for(var c=0;c<9;c++){

                /*
                1. choose a random element of b.n,
                remove it from n, and set the corresponding element of sol
                2. remove the chosen value from n in all boxes in the same row, col, and box
                */

                var l = boxes[r][c].n.length;
                var val;
                if(l==0){
                    valid=false;
                    return
                }
                else{
                    var randomIndex = Math.floor(Math.random()*l)
                    val = boxes[r][c].n[randomIndex]
                }


                sol[r][c]=val;
                /*console.log("r:"+r+"c:"+c+" Value: "+val+"Before: "+boxes[r][c].n)*/
                for(var i=0;i<9;i++){
                    if(squares[boxes[r][c].square][i].n.indexOf(val)>-1)
                        squares[boxes[r][c].square][i].n.splice(squares[boxes[r][c].square][i].n.indexOf(val),1);

                    if(boxes[r][i].n.indexOf(val)>-1){

                        boxes[r][i].n.splice(boxes[r][i].n.indexOf(val),1);

                    }
                    if(boxes[i][c].n.indexOf(val)>-1){

                        boxes[i][c].n.splice(boxes[i][c].n.indexOf(val),1);

                    }

                }
                /*console.log("After: "+boxes[r][c].n);*/
            }
        }
        return sol;
    }
    var retVal = attempt();
    while(!valid){
        retVal=attempt();
    }
    return retVal
}
function getSolution(){
    var retVal;
    retVal = copy(boards[Math.floor(Math.random()*boards.length)].slice())
    return retVal;
}
function genPuzzle(solution,difficulty){

    console.log(difficulty);
    var puzzle = solution.slice();
    var numRemoved=0;
    //console.log(puzzle);
    while(numRemoved<difficulty){
        var row = Math.floor(Math.random()*9)
        var col = Math.floor(Math.random()*9)
        if(puzzle[row][col]!=0){
            puzzle[row][col]=0;
            numRemoved++;
        }
    }
    console.log(numRemoved);
    //console.log(puzzle);
    return puzzle;
}
function newGame(difficulty){
    emptySpaces=difficulty;
    console.log("new game");
    curSolution=getSolution();
    curPuzzle=genPuzzle(copy(curSolution),difficulty)
    strikes=0;

    s=document.getElementsByClassName("strike");
    for(var i=0;i<s.length;i++){
        s[i].style.visibility="hidden"
    }

    console.log(curPuzzle);
    setBoard(curPuzzle);


}

function check(box){
    console.log("Check was called");
    var id = box.id;
    var val = box.value;

    console.log(val);
    console.log([1,2,3,4,5,6,7,8,9].indexOf(1));
    if(val==1||val==2||val==3||val==4||val==5||val==6||val==7||val==8||val==9){
        console.log("Got here");
        var row = parseInt(id.charAt(0));
        var col = parseInt(id.charAt(1));
        console.log("row: "+ row +"col: "+col+" solution: "+curSolution[row-1][col-1]+"   Value: "+val);
        if(curSolution[row-1][col-1]!=val){
            box.style.color="red"
            console.log("wrong")
            strikes++;
            var x= "strike"+strikes;
            console.log("x="+x)

            document.getElementById(x).style.visibility='visible';

        }
        else{
            console.log("right")
            box.disabled=true;
            emptySpaces--;
            console.log("Empty spaces: "+emptySpaces);
        }
    }
    if(strikes==3){
        setTimeout(function(){
            alert("That was three strikes. Why don't you just start over?");
            newGame(35);
            console.log("new game")
        },1000)
    }
    if(emptySpaces==0){
        setTimeout(function(){
            alert("You win! Starting new game.");
            newGame(35);
            console.log("new game")
        },1000)
    }
}
function changeMode(){
    console.log("got here 2");
    inNoteMode=!inNoteMode;
}
function main(){
     document.getElementById('easy').addEventListener("click",function(){newGame(35)})
     document.getElementById('medium').addEventListener("click",function(){newGame(45)})
     document.getElementById('hard').addEventListener("click",function(){newGame(55)})
     document.getElementById('note').addEventListener("click",function(){changeMode()})

    // document.getElementById('medium').addEventListener("click",newGame(45))
    // document.getElementById('hard').addEventListener("click",newGame(55))


    boxes = document.getElementsByClassName('box');

    for(var i=0;i<boxes.length;i++){

        boxes[i].maxLength=1;

        boxes[i].addEventListener("input",function(){
            if(!inNoteMode){
                check(this);
            }

        });
        boxes[i].addEventListener("click",function(){
            if(inNoteMode){
                this.maxLength=9
                this.style.fontSize="15px"
                this.style.color="blue"

            }
            else{
                this.value=""
                this.maxLength=1
                this.style.fontSize="30px"
                this.style.color="black"

            }
        });

    }

}

window.addEventListener("load", function(event) {
    main();
});
