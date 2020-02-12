'use strict';

console.log('service');

// --- GLOBALS ---
var gImgs = [
    {
        id: 0,
        url: '.\/img\/1.jpg',
        keywords:['funny']
    },
    {
        id: 1,
        url: '.\/img\/2.jpg',
        keywords:['cute']
    },
]

var gMeme = {
    selectedImgId:0,
    selectedLineidx:0,

    lines:[
        {
            txt: 'Lorem ipsum dolor blah',
            size: 20,
            align: 'left',
            color: 'red' 
        },
    ],
}


// --- IMAGE GALLERY ---

function getImageGallery(){
    return gImgs
}

// TODO - Hold array of image objects
// TODO - Every image has an id, url, keyword
// TODO - 

// --- SEARCH ---

// TODO - Array of keywords objects contains keyword and num of times it've been search
// 



// --- MEME EDITOR ---

function getImg(selectedImg){
    return gImgs[selectedImg];
}
// TODO - hold the x,y position of the text box
