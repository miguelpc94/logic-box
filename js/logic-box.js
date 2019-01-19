const on=1;
const off=0;
const red=0;
const green=1;
const blue=2;
const boxWidth=50;
const boxHeight=50;

function generateRandomBoxColor() {
    let randomColor=[];
    randomColor[red] = (155+(Math.random()*100));
    randomColor[green] = (155+(Math.random()*100));
    randomColor[blue] = (155+(Math.random()*100));
    return randomColor;
}

function halveColor(color) {
    return [color[red]/2, color[green]/2, color[blue]/2];
}

function generateCssColor(color) {
    return "rgb("+color[red]+","+color[green]+","+color[blue]+")";
}

function generateBoxColors(numberOfBoxes) {
    let generatedBoxColors=[];
    generatedBoxColors[on]=[];
    generatedBoxColors[off]=[];
    for (let boxNumber=0; boxNumber<numberOfBoxes; boxNumber++) {
        generatedBoxColors[on][boxNumber] = [];
        generatedBoxColors[on][boxNumber] = generateRandomBoxColor();
        generatedBoxColors[off][boxNumber] = [];
        generatedBoxColors[off][boxNumber] = halveColor(generatedBoxColors[on][boxNumber]);
    }
        return generatedBoxColors;
}

function createBoxSet(rows=1,columns=1) {
    let boxSet={};
    boxSet.rows=rows;
    boxSet.columns=columns;
    boxSet.canvasID=undefined;
    boxSet.boxes=[];
    for (let boxIndex=0; boxIndex<(rows*columns); boxIndex++) {
        boxSet.boxes[boxIndex]= {
            colorOn: [255,255,255],
            colorOff: [255,255,255],
            state: false
        };
    };
    boxSet.setBoxColorsOn = function(boxColors=[[255,255,255]]) {
        if (boxColors.length<(this.rows*this.columns)) {
            return false;
        }
        for (let boxIndex=0; boxIndex<(this.rows*this.columns); boxIndex++) {
            this.boxes[boxIndex].colorOn[red]=boxColors[boxIndex][red];
            this.boxes[boxIndex].colorOn[green]=boxColors[boxIndex][green];
            this.boxes[boxIndex].colorOn[blue]=boxColors[boxIndex][blue];
        }
    };
    boxSet.setBoxColorsOff = function(boxColors=[[255,255,255]]) {
        if (boxColors.length<(this.rows*this.columns)) {
            return false;
        }
        for (let boxIndex=0; boxIndex<(this.rows*this.columns); boxIndex++) {
            this.boxes[boxIndex].colorOff[red]=boxColors[boxIndex][red];
            this.boxes[boxIndex].colorOff[green]=boxColors[boxIndex][green];
            this.boxes[boxIndex].colorOff[blue]=boxColors[boxIndex][blue];
        }
        return true;
    };
    boxSet.getBoxStates = function() {
        let boxStates=[];
        for (let boxIndex=0; boxIndex<(this.rows*this.columns); boxIndex++) {
            boxStates[boxIndex]=this.boxes[boxIndex].state;
        }
        return boxStates;
    };
    boxSet.setBoxStates = function(boxStates=[]) {
        if (boxStates.length<(this.rows*this.columns)) {
            return false;
        }
        for (let boxIndex=0; boxIndex<(this.rows*this.columns); boxIndex++) {
            this.boxes[boxIndex].state=boxStates[boxIndex];
        }
        return true;
    };
    boxSet.draw = function() {
        let context = document.querySelector(this.canvasID).getContext("2d");
        context.clearRect(0,0,this.columns*boxWidth,this.columns*boxHeight);
        for(let row=0; row<this.rows; row++) {
            for (let column=0; column<this.columns; column++) {
                box = this.boxes[column+(row*this.columns)];
                if (box.state) {
                    context.fillStyle = generateCssColor(box.colorOn);
                } else {
                    context.fillStyle = generateCssColor(box.colorOff);
                }
                context.fillRect(column*boxWidth, row*boxHeight, (column+1)*boxWidth, (row+1)*boxHeight);
            }
        }
    };
    return boxSet;
}

$( document ).ready(function() {
    testBoxSet=createBoxSet(2,2);
    testBoxSet.canvasID='#boxSet1';
    generatedColors=generateBoxColors(4);
    testBoxSet.setBoxColorsOn=generatedColors[on];
    testBoxSet.setBoxColorsOff=generatedColors[off];
    testBoxSet.setBoxStates([false,true,true,false]);
    testBoxSet.draw();
});
/*
$( document ).ready(function() {
    const on=1;
    const off=0;
    const red=0;
    const green=1;
    const blue=2;
    const boxes=18;
                
                
                
    function generateBoxColors(numberOfBoxes) {
        let generatedBoxColors=[];
        for (let boxNumber=0; boxNumber<numberOfBoxes; boxNumber++) {
            generatedBoxColors[boxNumber] = [];
            generatedBoxColors[boxNumber][on] = [];
            generatedBoxColors[boxNumber][on] = generateRandomBoxColor();
            generatedBoxColors[boxNumber][off] = [];
            generatedBoxColors[boxNumber][off] = halveColor(generatedBoxColors[boxNumber][on]);
        }
            return generatedBoxColors;
    }
                
    function generateCssColor(color) {
        return "rgb("+color[red]+","+color[green]+","+color[blue]+")";
    }
                
    function turnBox(onOrOff ,boxNumber) {
        $("#box"+boxNumber).css("background-color", generateCssColor(boxColors[boxNumber][onOrOff]));
    }
                
    var boxColors=generateBoxColors(boxes);
                
    function flashBoxes() {
        for (let box=0; box<boxes; box++) {
            if (Math.random()>0.5) {
                turnBox(on,box);
            } else {
                turnBox(off,box);
            }
        }
    }
                
    for (let box=0; box<boxes; box++) {
        turnBox(on,box);
    }
                
    setInterval(function() {flashBoxes()},250);

    var c = document.getElementById("boxSet");
    var ctx = c.getContext("2d");

    // Create gradient
    var grd = ctx.createRadialGradient(75,50,5,90,60,100);
    grd.addColorStop(0,"red");
    grd.addColorStop(1,"white");

    // Fill with gradient
    ctx.fillStyle = grd;
    ctx.fillRect(10,10,140,140);
});
*/