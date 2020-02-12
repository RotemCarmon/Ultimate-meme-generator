'use strict';


var gCanvas;
var gCtx


function onInit() {
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
    addEventListeners()
    showImages()

}
function addEventListeners() {
    var firstText = document.querySelector('.first-input');
    var secondText = document.querySelector('.second-input');
    firstText.addEventListener('keyup', (event) =>{
        console.log(event.keyCode)
        // if()
        onTextInput()
    });
    secondText.addEventListener('keyup', () => {
        onTextInput()    
    });
    firstText.addEventListener('focus',() => onSetLine(1));
    secondText.addEventListener('focus',() => onSetLine(2));
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
function onSetLine(line) {
    setCurrLine(line)
    console.log('currLine', getCurrLine())
}

function onTextInput() {
    var line = getCurrLine();
    // console.log('Did It!')
    if (line === 0) {
        var firstTextBox = document.getElementById('first-text');
        var txt = firstTextBox.value;
    } else {
        var secondTextBox = document.getElementById('second-text');
        var txt = secondTextBox.value;
    }

    updateTextLine(txt);
    renderTexts()
}

function onSetFontSize(diff) {
    setFontSize(diff)
    onDarwImg()
}

function onSetTextPos(diff) {
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
        renderTexts()

    }
}

function renderTexts() {
    var linesObjs = getLineObjs();
    linesObjs.map(line => {

        var txt = (line.txt).toUpperCase();
        var size = line.size
        var txtPos = line.pos
        gCtx.font = size + 'px IMPACT';
        gCtx.fillStyle = '#ffffff'
        gCtx.strokeStyle = '#000000'
        gCtx.textAlign = line.align;
        gCtx.strokeText(txt, txtPos.x, txtPos.y)
        gCtx.fillText(txt, txtPos.x, txtPos.y)
    }
    )
}

// function onBackspacePress(ev) {
//     if (ev.keyCode === 8) {
//         var firstTextBox = document.getElementById('first-text');
//         var txt = firstTextBox.value;
//         updateTextLine(txt)
//         var text = getText()
//         console.log(text)
//     }
//     return
// }

// function onClearText() {
//     onDarwImg()

// }