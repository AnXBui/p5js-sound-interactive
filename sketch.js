

var song;
var fft;
var button;
var width = 1440;
var height = 720;
var column = 32;
var row = 16;
var songTime;
var centerx;
var centery;

var scaleOutput = 1;
var output;
var canvas;
var colCount = width / column;
var rowCount = height / row;

var slider;



var rayArray = [];

function toggleSong() {
    if (song.isPlaying()) {
        song.pause();
    } else {
        song.play();
    }
}

function preload() {
    song = loadSound('summer.mp3');
}

function setup() {
    var width = 1440;
    var height = 720;

    centerx = 12 * colCount;
    centery = 6 * rowCount;
    songTime = song.duration();
    createCanvas(width, height);
    colorMode(HSB,255);
    angleMode(DEGREES);

    button = createButton('toggle');
    button.mousePressed(toggleSong);



    for (let x = 1; x < row; x++) {
        for (let y = 1; y < column; y++) {
            let posx = y * colCount;
            let posy = x * rowCount;
            let vector = createVector(posx - centerx, posy - centery)
            vector.normalize();
            let v = new Ray(posx, posy, vector);
            rayArray.push(v);
        }
    }


    fft = new p5.FFT(0.5, column * row * 4);

}

function draw() {


    if (song.isPlaying()){
    background(255);


    background(255);



    var fre = [];


    var spectrum = fft.analyze();


    for (let i = 0; i < rayArray.length; i++) {
        let posx = rayArray[i].getx();
        let posy = rayArray[i].gety();
        let centerx = mouseX;
        let centery = mouseY;
        let vector = createVector(posx - mouseX, posy - mouseY);
        vector.normalize();
        let amp = spectrum[i];
        let ampMap = map(amp, 0, 256, 0, 30);
        let ampMapmin = map(amp, 0, 256, 0, 20);
        let ampMapcolor = map(amp, 0, 256, 0, 360);
        if (amp > 100){
            ampMap = map(amp, 0, 256, 0, 60);
            if (amp > 150){
                ampMap = map(amp, 0, 256, 0, 300);
            }
        }



        let baseVector = vector.copy().mult(ampMap);
        let offVector = vector.copy().mult(ampMapmin);


        let newx = (posx + baseVector.x);
        let newy = (posy + baseVector.y);

        let offsetx = offVector.x;
        let offsety = offVector.y;

        blendMode(MULTIPLY);

        stroke(ampMapcolor, 255, 255);
        strokeWeight(7);
        strokeCap(SQUARE);

        line(posx + offsetx,posy + offsety,newx,newy);

        blendMode(BLEND);



    }






    }

    translate(width/2, height/2);





}




class Ray {
    constructor(x, y, v) {
        this.x = x;
        this.y = y;
        this.v = v;
    }

    push(vector) {
        this.v = vector;
    }

    getx() {
        return this.x;
    }

    gety() {
        return this.y;
    }

    getv() {
        return this.v;
    }

}
