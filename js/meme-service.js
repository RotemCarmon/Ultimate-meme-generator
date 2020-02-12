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
        keywords: ['cute']
    },
]

var gMeme = {
    selectedImgId: 0,
    selectedLineidx: 0,
    
    lines: [
        {
            txt: '',
            size: 40,
            align: 'left',
            color: 'red',
            pos: { x: 50, y: 80 }
        },
        {
            txt: '',
            size: 35,
            align: 'left',
            color: 'blue',
            pos: { x: 100, y: 300 }
        },
    ],
}




function getLineObjs(){
    var lines = gMeme.lines
   return lines
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
function getText() {
    return gMeme.lines[gMeme.selectedLineidx].txt.toUpperCase();
}
function getTextAlign() {
    return gMeme.lines[gMeme.selectedLineidx].align;
}


function setCurrLine(line) {
    if(line < 1) line = 1
    gMeme.selectedLineidx = ( line - 1);
}
function getCurrLine() {
    return gMeme.selectedLineidx;
}



// --- SEARCH ---

// TODO - Array of keywords objects contains keyword and num of times it've been search