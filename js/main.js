let cols;
let rows;

let currentState;
let previousState;
let dampening = 0.99;

function setup() {
    createCanvas(400, 400);

    cols = width;
    rows = height;

    currentState = new Array(cols);
    previousState = new Array(cols);

    // Make 2D array
    for (let i = 0; i < cols; i++) {
        currentState[i] = new Array(rows);
        previousState[i] = new Array(rows);
    }

    // Initialize values as black color
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            currentState[i][j] = 0;
            previousState[i][j] = 0;
        }
    }

}

function draw() {
    background(0);

    loadPixels();
    for (let i = 1; i < cols - 1; i++) {
        for (let j = 1; j < rows - 1; j++) {
            currentState[i][j] = (
                (previousState[i - 1][j] + 
                previousState[i + 1][j] + 
                previousState[i][j - 1] + 
                previousState[i][j + 1]) / 2) - 
                currentState[i][j];
            currentState[i][j] = currentState[i][j] * dampening;
            // let col = color(255, 102, 204);
            let col = color(currentState[i][j]);
            let index = (i + j * cols) * 4;
            pixels[index] = red(col);
            pixels[index + 1] = green(col);
            pixels[index + 2] = blue(col);
            pixels[index + 3] = alpha(col);
       }
    }
    updatePixels();

    let tempState = previousState;
    previousState = currentState;
    currentState = tempState;

    previousState[floor(random(width))][floor(random(height))] = 255;

}
