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


function onTextInput() {
    var firstTextBox = document.getElementById('first-text');
    var txt = firstTextBox.value;
    updateTextLine(txt);
    onAddText()
}

function onSetFontSize(diff) {
    setFontSize(diff)
    onDarwImg()
 
}

function onSetTextPos(diff){
    setTextPos(diff)
    onDarwImg()



}
// --- MEME EDITOR ---

function onDarwImg() {
    var currImg = getImg();
    var img = new Image();
    img.src = currImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        onTextInput()
    }
}

function onAddText() {
    var firstTextLine = getText();
    var size = getFontSize()
    var txtPos = getTextPos()
    gCtx.font = size + 'px IMPACT';
    gCtx.fillStyle = '#ffffff'
    gCtx.strokeStyle = '#000000'
    gCtx.textAlign = getTextAlign()
    gCtx.strokeText(firstTextLine, txtPos.x,txtPos.y)
    gCtx.fillText(firstTextLine, txtPos.x,txtPos.y)
}


function onClearText() {
    onDarwImg()

}

function onBackspacePress(ev) {
    if (ev.keyCode === 8)onDarwImg()
    return
}