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
    firstText.addEventListener('keyup', () => {
        onTextInput()
        
    });
    secondText.addEventListener('keyup', () => {
        onTextInput()
    });
    firstText.addEventListener('focus', () => onSetLine(1));
    secondText.addEventListener('focus', () => onSetLine(2));
    gCanvas.addEventListener('click', () => clickOnText(event))
}



// TODO - make function look nicer run with a loop
function clickOnText(ev) {
    var ex = ev.offsetX;
    var ey = ev.offsetY;
    var firstText = document.querySelector('.first-input').value;
    var secondText = document.querySelector('.second-input').value

    var pos1 = getTextPos(0)
    var pos2 = getTextPos(1)
    var textWidth1 = gCtx.measureText(firstText).width
    var textWidth2 = gCtx.measureText(secondText).width
    var textHeight1 = getFontSize(0);
    var textHeight2 = getFontSize(1);

    if (
        ex > pos1.x
        && ex < pos1.x + textWidth1
        && ey > pos1.y - textHeight1
        && ey < pos1.y) {
        gCtx.rect(pos1.x - 40, pos1.y - textHeight1 - 15, pos1.x + textWidth1 + 40, pos1.y + 5)
        gCtx.fillStyle = '#88a4b151';
        gCtx.fill()
        onSetLine(1)
    } else if (
        ex > pos2.x
        && ex < pos2.x + textWidth2
        && ey > pos2.y - textHeight2
        && ey < pos2.y) {
        gCtx.rect(pos2.x - 40, pos2.y - textHeight2 - 15, pos2.x + textWidth2 + 40, pos2.y + 5)
        gCtx.fillStyle = '#88a4b151';
        gCtx.fill()
        onSetLine(2)
    }
}

// --- IMAGE GALLERY --- 

function showImages() {
    var imgGallery = getImageGallery()
    var strHTMLs =
        imgGallery.map(img => {
            return `<img src="${img.url}" alt="" data-img="${img.id}" class="image pointer" onclick="onImgSelect(this)">`
        }).join('');
    var elGallery = document.querySelector('.img-gallery');
    elGallery.innerHTML = strHTMLs;

}

function onImgSelect(img) {
    var selectedImgId = img.dataset.img;
    updateCurrImgId(selectedImgId)
    toggleDisplay()
    onDarwImg()
}

function toggleDisplay() {
    var elMeme = document.querySelector('.meme-container')
    var elGallery = document.querySelector('.img-gallery')
    if (elMeme.style.display !== 'flex') {
        elGallery.style.display = 'none'
        elMeme.style.display = 'flex'
    } else {
        elGallery.style.display = 'grid'
        elMeme.style.display = 'none'  
    }
}


// TODO - when a nav button is pressed it can't be repressed

// --- CONTROL PANEL ---
function onSetLine(line) {
    setCurrLine(line)
}

function onTextInput() {
    var line = getCurrLine();
    if (line === 0) {
        var firstTextBox = document.getElementById('first-text');
        var txt = firstTextBox.value;
    } else {
        var secondTextBox = document.getElementById('second-text');
        var txt = secondTextBox.value;
    }
    updateTextLine(txt);
    onDarwImg()
    // renderTexts()
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

