'use strict';

console.log('service');

// --- GLOBALS ---

// TODO - Hold array of image objects
var gImgs = [
    // TODO - Every image has an id, url, keyword
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
            txt: 'Fuck You All',
            size: 20,
            align: 'left',
            color: 'red' 
        },
    ],
}


function updateCurrImgId(id){
    gMeme.selectedImgId = id

}

// --- IMAGE GALLERY ---

function getImageGallery(){
    return gImgs
}

// --- MEME EDITOR ---

function getImg(){
    return gImgs[gMeme.selectedImgId];
}


function getText(){
    console.log(gMeme.lines)
    return gMeme.lines[0].txt.toUpperCase();
}
// TODO - hold the x,y position of the text box


// --- SEARCH ---

// TODO - Array of keywords objects contains keyword and num of times it've been search