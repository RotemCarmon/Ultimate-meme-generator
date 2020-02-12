'use strict';


var gCanvas;
var gCtx


function onInit() {
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
    showImages()
}





// --- IMAGE GALLERY --- 

function showImages() {
    var imgGallery = getImageGallery()
    var strHTMLs =
        imgGallery.map(img => {
            return `<img src="${img.url}" alt="" data-img="${img.id}" onclick="onImgSelect(this)">`
        }).join('');
    var elGallery = document.querySelector('.img-gallery');
    elGallery.innerHTML = strHTMLs;
    // console.log('gallery', elGallery);

}

function onImgSelect(img) {
    var selectedImgId = img.dataset.img;
    updateCurrImgId(selectedImgId)
    onDarwImg()
}

// --- CONTROL PANEL ---

function onAddTextInput(){
    var firstTextBox = document.getElementById('first-text');
    var txt = firstTextBox.value;
    updateTextLine(txt);
    onAddText()

}

// --- MEME EDITOR ---

function onDarwImg() {
    var currImg = getImg();
    var img = new Image();
    img.src = currImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}

function onAddText() {
    var firstTextLine = getText();
    gCtx.font = '40px IMPACT';
    gCtx.fillStyle = '#ffffff'
    gCtx.strokeStyle = '#000000'
    gCtx.strokeText(firstTextLine, 50, 80)
    gCtx.fillText(firstTextLine, 50, 80)
}