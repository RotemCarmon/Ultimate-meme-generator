'use strict';


// --- GLOBALS ---


var gImgs = [
    {
        id: 0,
        url: './img/1.jpg',
        keywords: ['funny']
    },
    {
        id: 1,
        url: './img/2.jpg',
        keywords: ['cute. dogs']
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
            color: 'Black',
            fillColor: 'white',
            font: 'Impact',
            pos: { x: 100, y: 80 }
        },
        {
            txt: 'ENTER TEXT HERE',
            size: 45,
            align: 'left',
            color: 'Black',
            fillColor: 'white',
            font: 'Impact',
            pos: { x: 100, y: 400 }
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
function getFontSize(line) {
    return gMeme.lines[line].size;
}
function getTextPos(line) {
    return gMeme.lines[line].pos
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
        pos: { x: 100, y: setY }
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

// --- IMAGE GALLERY ---

function updateCurrImgId(id) {
    gMeme.selectedImgId = id
}
function getImageGallery() {
    return gImgs
}

// --- MEME EDITOR ---

function getImg() {
    return gImgs[gMeme.selectedImgId];
}




// --- SEARCH ---

// TODO - Array of keywords objects contains keyword and num of times it've been search


// --- Utils ---


function getLineObjs() {
    var lines = gMeme.lines
    return lines
}
function setCurrLine() {
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