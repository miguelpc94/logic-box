const on=1;
const off=0;
const red=0;
const green=1;
const blue=2;
const boxWidth=50;
const boxHeight=50;

/**
 * Generate an array with the RGB components of a random color
 * @return  {array}     Array with the RGB components
 */
function generateRandomColor() {
    let randomColor=[];
    randomColor[red] = (155+(Math.random()*100));
    randomColor[green] = (155+(Math.random()*100));
    randomColor[blue] = (155+(Math.random()*100));
    return randomColor;
}

/**
 * Take a color and cut its RGB components in half
 * @param   {array}     color - Array with the RGB components
 * @return  {array}     Array with the RGB components
 */
function halveColor(color) {
    return [color[red]/2, color[green]/2, color[blue]/2];
}

/**
 * Take an array with the RGB components of a color and returns a string that represents
 * that color for CSS
 * @param   {array}     color - Array with the RGB components
 * @return  {string}    String of a CSS color
 */
function generateCssColor(color) {
    return "rgb("+color[red]+","+color[green]+","+color[blue]+")";
}

/**
 * Generate random colors for the number of boxes given in the states on and off
 * @param   {number}    numberOfBoxes - Number of boxes
 * @return  {array}     Array of color for boxes turned on and off
 */
function generateBoxColors(numberOfBoxes) {
    let generatedBoxColors=[];
    generatedBoxColors[on]=[];
    generatedBoxColors[off]=[];
    for (let boxNumber=0; boxNumber<numberOfBoxes; boxNumber++) {
        generatedBoxColors[on][boxNumber] = [];
        generatedBoxColors[on][boxNumber] = generateRandomColor();
        generatedBoxColors[off][boxNumber] = [];
        generatedBoxColors[off][boxNumber] = halveColor(generatedBoxColors[on][boxNumber]);
    }
    return generatedBoxColors;
}

/**
 * Generate random array of booleans
 * @function
 * @param   {number}    numberOfBooleans - Number of booleans
 * @return  {array}     Array of random booleans
 */
function generateRandomBooleans(numberOfBooleans) {
    let randomBooleans=[];
    for (let index=0; index<numberOfBooleans; index++) {
        if (Math.random()>0.5) {
            randomBooleans[index]=true;
        } else {
            randomBooleans[index]=false;
        }
    }
    return randomBooleans;
}

/**
 * TODO: Create the SoundBox object
 */

/**
 * TODO: Create a function that render the canvas templete wit ha given height and width and return its ID
 */

/**
 * Generate an object that controls a set of logic boxes of the given number of rows and columns.
 * Each logic box inside the box set have an index. The index is distributed from left to right, top to bottom.
 * TODO: The size of the canvas is given or taken from somewhere and the set is drawn to fit inside it
 * @constructs BoxSet
 * @param   {number}    rows - Number of rows
 * @param   {number}    columns - Number of columns
 * @return  {BoxSet}    Object that controls a set of logic boxes
 */
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
    /**
    * TODO: A method that receives a canvas ID and read from it its width and height.
    * With this info, calculates the size of the elememts to fit all inside the context
    */

    /**
    * Set the color of the logic boxes when they are on
    * @memberof BoxSet
    * @param   {array}      boxColors - Array with the RGB components
    * @return  {boolean}    Whether it could set the colors
    */
    boxSet.setBoxColorsOn = function(boxColors=[[255,255,255]]) {
        if (boxColors.length<(this.rows*this.columns)) {
            return false;
        }
        for (let boxIndex=0; boxIndex<(this.rows*this.columns); boxIndex++) {
            this.boxes[boxIndex].colorOn[red]=boxColors[boxIndex][red];
            this.boxes[boxIndex].colorOn[green]=boxColors[boxIndex][green];
            this.boxes[boxIndex].colorOn[blue]=boxColors[boxIndex][blue];
        }
        return true;
    };
    /**
    * Set the color of the logic boxes when they are off
    * @memberof BoxSet
    * @param   {array}      boxColors - Array with the RGB components
    * @return  {boolean}    Whether it could set the colors
    */
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
    /**
    * Return the state of each logic box inside this BoxSet
    * @memberof BoxSet
    * @return  {array}    An array of booleans of the states
    */
    boxSet.getBoxStates = function() {
        let boxStates=[];
        for (let boxIndex=0; boxIndex<(this.rows*this.columns); boxIndex++) {
            boxStates[boxIndex]=this.boxes[boxIndex].state;
        }
        return boxStates;
    };
    /**
    * Set the state of each logic box inside this BoxSet
    * @memberof BoxSet
    * @param   {array}    boxStates - An array of booleans of the states
    * @return  {array}    An array of booleans of the states
    */
    boxSet.setBoxStates = function(boxStates=[]) {
        if (boxStates.length<(this.rows*this.columns)) {
            return false;
        }
        for (let boxIndex=0; boxIndex<(this.rows*this.columns); boxIndex++) {
            this.boxes[boxIndex].state=boxStates[boxIndex];
        }
        return true;
    };
    /**
    * Draw the set of logic boxes in the canvas of ID canvasID
    * @memberof BoxSet
    */
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
                context.fillRect(column*boxWidth, row*boxHeight, boxWidth, boxHeight);
            }
        }
    };
    return boxSet;
}

$( document ).ready(function() {
    testBoxSet1=createBoxSet(3,3);
    testBoxSet1.canvasID='#boxSet1';
    generatedColors=generateBoxColors(9);
    testBoxSet1.setBoxColorsOn(generatedColors[on]);
    testBoxSet1.setBoxColorsOff(generatedColors[off]);
    testBoxSet1.setBoxStates(generateRandomBooleans(9));
    testBoxSet1.draw();

    testBoxSet2=createBoxSet(3,3);
    testBoxSet2.canvasID='#boxSet2';
    generatedColors=generateBoxColors(9);
    testBoxSet2.setBoxColorsOn(generatedColors[on]);
    testBoxSet2.setBoxColorsOff(generatedColors[off]);
    testBoxSet2.setBoxStates(generateRandomBooleans(9));
    testBoxSet2.draw();

    testBoxSet3=createBoxSet(3,3);
    testBoxSet3.canvasID='#boxSet3';
    generatedColors=generateBoxColors(9);
    testBoxSet3.setBoxColorsOn(generatedColors[on]);
    testBoxSet3.setBoxColorsOff(generatedColors[off]);
    testBoxSet3.setBoxStates(generateRandomBooleans(9));
    testBoxSet3.draw();

    setInterval(function() {
        testBoxSet1.setBoxStates(generateRandomBooleans(9));
        testBoxSet2.setBoxStates(generateRandomBooleans(9));
        testBoxSet3.setBoxStates(generateRandomBooleans(9));
        testBoxSet1.draw();
        testBoxSet2.draw();
        testBoxSet3.draw();
    },75);
});