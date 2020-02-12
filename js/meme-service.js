'use strict';


// --- GLOBALS ---
var gCurrMeme = 0;
// gCurrMeme should be equal to selectedImgId


var gImgs = [
    {
        id: 0,
        url: './img/1.jpg',
        keywords:['funny']
    },
    {
        id: 1,
        url: './img/2.jpg',
        keywords:['cute']
    },
]

var gMeme = {
    selectedImgId:0,
    selectedLineidx:0,

    lines:[
        {
            txt: '',
            size: 40,
            align: 'left',
            color: 'red' ,
            pos: {x:50 ,y:80}
        },
    ],
}



// --- CONTROL PANEL ---

function updateTextLine(txt){
    gMeme.lines[gCurrMeme].txt = txt
}
function setFontSize(diff){
    gMeme.lines[gCurrMeme].size += diff
}
function setTextPos(diff){
    gMeme.lines[gCurrMeme].pos.y += diff
}
function getFontSize(){
    return gMeme.lines[gCurrMeme].size;
}
function getTextPos(){
    return gMeme.lines[gCurrMeme].pos
}


// --- IMAGE GALLERY ---

function updateCurrImgId(id){
    gMeme.selectedImgId = id
}
function getImageGallery(){
    return gImgs
}

// --- MEME EDITOR ---

function getImg(){
    return gImgs[gMeme.selectedImgId];
}
function getText(){
    return gMeme.lines[gCurrMeme].txt.toUpperCase();
}
function getTextAlign(){
    return gMeme.lines[gCurrMeme].align;
}


// --- SEARCH ---

// TODO - Array of keywords objects contains keyword and num of times it've been search