'use strict';


// --- GLOBALS ---
var gMarked;
var gAllPosses;
var gInitState;

var gImgs = [
    {
        id: 0,
        url: './img/1.jpg',
        keywords: ['funny']
    },
    {
        id: 1,
        url: './img/2.jpg',
        keywords: ['cute, dogs']
    },
    {
        id: 2,
        url: './img/3.jpg',
        keywords: ['cute, dog, baby']
    },
    {
        id: 3,
        url: './img/4.jpg',
        keywords: ['cute, cat']
    },
    {
        id: 4,
        url: './img/5.jpg',
        keywords: ['funny']
    },
    {
        id: 5,
        url: './img/6.jpg',
        keywords: ['cute. dogs']
    },
    {
        id: 6,
        url: './img/7.jpg',
        keywords: ['cute, dog, baby']
    },
    {
        id: 7,
        url: './img/8.jpg',
        keywords: ['cute, cat']
    },
    {
        id: 8,
        url: './img/9.jpg',
        keywords: ['funny']
    },
    {
        id: 9,
        url: './img/10.jpg',
        keywords: ['cute. dogs']
    },
    {
        id: 10,
        url: './img/11.jpg',
        keywords: ['cute, dog, baby']
    },
    {
        id: 11,
        url: './img/12.jpg',
        keywords: ['cute, cat']
    },
    {
        id: 12,
        url: './img/13.jpg',
        keywords: ['funny']
    },
    {
        id: 13,
        url: './img/14.jpg',
        keywords: ['cute. dogs']
    },
    {
        id: 14,
        url: './img/15.jpg',
        keywords: ['cute, dog, baby']
    },
    {
        id: 15,
        url: './img/16.jpg',
        keywords: ['cute, cat']
    },
    {
        id: 16,
        url: './img/17.jpg',
        keywords: ['cute. dogs']
    },
    {
        id: 17,
        url: './img/18.jpg',
        keywords: ['cute, dog, baby']
    },

]

var gMeme = {
    selectedImgId: 0,
    selectedLineidx: 0,

    lines: [
        {
            txt: 'ENTER TEXT HERE',
            size: 35,
            align: 'left',
            color: '#000000',
            fillColor: '#ffffff',
            font: 'Impact',
            pos: { x: 100, y: 80 },
            isMarked: false,
        },
        {
            txt: 'ENTER TEXT HERE',
            size: 45,
            align: 'left',
            color: '#000000',
            fillColor: '#ffffff',
            font: 'Impact',
            pos: { x: 100, y: 400 },
            isMarked: false,
        },
    ],
}



// --- CONTROL PANEL ---

function updateTextLine(txt) {
    gMeme.lines[gMeme.selectedLineidx].txt = txt
}
function setFontSize(diff) {
    gMeme.lines[gMeme.selectedLineidx].size += diff
}
function setTextPos(diff) {
    gMeme.lines[gMeme.selectedLineidx].pos.y += diff
}
function getFontSize() {
    return gMeme.lines[gMeme.selectedLineidx].size;
}
function getTextPos() {
    return gMeme.lines[gMeme.selectedLineidx].pos
}
function createLine() {
    var numOfLines = gMeme.lines.length;
    var setY = 60 * numOfLines
    var newLine = {
        txt: 'ENTER TXET HERE',
        size: 35,
        align: 'left',
        color: getStrokeColor(),
        fillColor: getFillColor(),
        font: getFont(),
        pos: { x: 100, y: setY },
        isMarked: false,
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineidx = gMeme.lines.length - 1;
}
function removeLine() {
    var line = gMeme.selectedLineidx;
    gMeme.lines.splice(line, 1)
}
function getText() {
    return gMeme.lines[gMeme.selectedLineidx].txt.toUpperCase();
}
function setStrokeColor(value) {
    gMeme.lines[gMeme.selectedLineidx].color = value;
}
function setFillColor(value) {
    gMeme.lines[gMeme.selectedLineidx].fillColor = value;
}
function setFont(value) {
    gMeme.lines[gMeme.selectedLineidx].font = value;
}
function getStrokeColor() {
    return gMeme.lines[gMeme.selectedLineidx].color;
}
function getFillColor() {
    return gMeme.lines[gMeme.selectedLineidx].fillColor;
}
function getFont() {
    return gMeme.lines[gMeme.selectedLineidx].font;
}
function alignLeft(){
    gMeme.lines[gMeme.selectedLineidx].pos.x = 0
}
function alignCenter(){
    var size = getFontSize()
    var font = getFont()
    var fullFont = `${size}px  ${font}`;
    var text = getText()
    var textWidth = getTextWidth(text, fullFont)
    gMeme.lines[gMeme.selectedLineidx].pos.x = (500 - textWidth) / 2 
}
function alignRight(){
    var size = getFontSize()
    var font = getFont()
    var fullFont = `${size}px  ${font}`;
    var text = getText()
    var textWidth = getTextWidth(text, fullFont)
    gMeme.lines[gMeme.selectedLineidx].pos.x = (500 - textWidth)
}

// --- IMAGE GALLERY ---

function updateCurrImgId(id) {
    gMeme.selectedImgId = id
}
function getImageGallery() {
    return gImgs;
}

// --- MEME EDITOR ---

function getImg() {
    return gImgs[gMeme.selectedImgId];
}
function setIsDragging(ev) {
    var clickedText = getClickedTextPos(ev)
    if (clickedText < 0) return
    else gAllPosses[clickedText].isDragging = true
}
function getIsDragging() {
    return gAllPosses.findIndex(pos => pos.isDragging === true)
}
function upDatePos(delta){
    var currDragging = getIsDragging()
    if(currDragging< 0)return
    var prevPos = gMeme.lines[currDragging].pos
    var newPos = {x: prevPos.x + delta.x, y:prevPos.y + delta.y}
    gMeme.lines[currDragging].pos = newPos;
}
// --- SEARCH ---

function searchKeyWords(value){

    console.log('value->',value);
  var filteredImgs =  gImgs.filter((img, idx) => {


        if(img.keywords.some(key => key === value)){
            return idx

        // console.log(img.keywords[0] === value)
        // if(img.keywords[0] === value )console.log('YEYY!')
        
        } 

    } )
    console.log('filteredImgs', filteredImgs)
}


// TODO - Array of keywords objects contains keyword and num of times it've been search


// --- Utils ---




function getLineObjs() {
    var lines = gMeme.lines
    return lines
}
function setCurrLine(line) {
    if (line >= 0) {
        gMeme.selectedLineidx = line;
        return
    }
    var linesLength = gMeme.lines.length;
    if (gMeme.selectedLineidx < linesLength - 1) {
        gMeme.selectedLineidx++
    } else {
        gMeme.selectedLineidx = 0;
    }
}
function getCurrLine() {
    return gMeme.selectedLineidx;
}
function getTextWidth(text, font) {

    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}
function findAllPosses() {
    var allPosses = gMeme.lines.map(line => {
        var txtPos = line.pos;
        var textHeight = line.size;
        var fullFont = `${line.size}px  ${line.font}`
        var textWidth = getTextWidth(line.txt, fullFont)

        return createPosObj(txtPos.x, txtPos.y, textWidth, textHeight)

    })
    gAllPosses = allPosses;
    return allPosses
}
function getAllPosses() {
    return gAllPosses
}
function createPosObj(x, y, width, height) {
    return {
        x,
        y,
        width,
        height,
        isDragging: false
    }
}
function setMarked(mark) {
    clearMarked()
    gMeme.lines[mark].isMarked = true;
    gMarked = mark;
}
function clearMarked(){
    gMeme.lines.forEach(line => line.isMarked = false)
}
function checkMark(txtPressed) {
    return gMeme.lines[txtPressed].isMarked;
}
function getClickedTextPos(ev) {
    var allPosses = gAllPosses;
    var ex = ev.offsetX;
    var ey = ev.offsetY;
    var txtPressed = allPosses.findIndex(pos => {
        return ex > +pos.x
            && ex < +(pos.x + pos.width)
            && ey > +(pos.y - pos.height)
            && ey < +pos.y
    })
    return txtPressed
}

function saveInitState(){
    gInitState = JSON.parse(JSON.stringify(gMeme));
}
function  setInitState(){
    gMeme = JSON.parse(JSON.stringify(gInitState));
}