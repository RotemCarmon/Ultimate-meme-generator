'use strict';


var gCanvas;
var gCtx
var gCurrPage;


function onInit() {
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
    addEventListeners()
    showImages()

}


function addEventListeners() {
    var firstText = document.querySelector('.first-input');
    firstText.addEventListener('keyup', () => {
        onTextInput()
    });
    // window.addEventListener('resize', onResize)

    // firstText.addEventListener('focus', () => onSetLine(1));
    // secondText.addEventListener('focus', () => onSetLine(2));
    // gCanvas.addEventListener('click', () => clickOnText(event))

}

// function onResize(){

//     gCanvas.width = elContainer.offsetWidth
//     gCanvas.height = elContainer.offsetHeight

// }

function toggleNavbar(elBtn) {

    if (elBtn.classList.contains('fa-bars')) {
        elBtn.classList.remove('fa-bars')
        elBtn.classList.add('fa-times')
        document.body.classList.add('burger')
    } else {
        elBtn.classList.remove('fa-times')
        elBtn.classList.add('fa-bars')
        document.body.classList.remove('burger')

    }
}

// TODO - make function look nicer run with a loop


// function clickOnText(ev) {
//     var ex = ev.offsetX;
//     var ey = ev.offsetY;
//     var firstText = document.querySelector('.first-input').value;
//     var secondText = document.querySelector('.second-input').value

//     var pos1 = getTextPos(0)
//     var pos2 = getTextPos(1)
//     var textWidth1 = gCtx.measureText(firstText).width
//     var textWidth2 = gCtx.measureText(secondText).width
//     var textHeight1 = getFontSize(0);
//     var textHeight2 = getFontSize(1);

//     if (
//         ex > pos1.x
//         && ex < pos1.x + textWidth1
//         && ey > pos1.y - textHeight1
//         && ey < pos1.y) {
//         gCtx.rect(pos1.x - 40, pos1.y - textHeight1 - 15, pos1.x + textWidth1 + 40, pos1.y + 5)
//         gCtx.fillStyle = '#88a4b151';
//         gCtx.fill()
//         onSetLine(1)
//     } else if (
//         ex > pos2.x
//         && ex < pos2.x + textWidth2
//         && ey > pos2.y - textHeight2
//         && ey < pos2.y) {
//         gCtx.rect(pos2.x - 40, pos2.y - textHeight2 - 15, pos2.x + textWidth2 + 40, pos2.y + 5)
//         gCtx.fillStyle = '#88a4b151';
//         gCtx.fill()
//         onSetLine(2)
//     }
// }

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
    toggleDisplay('meme')
    renderImg()
}

function toggleDisplay(page) {
    if (gCurrPage === page) return
    var elMeme = document.querySelector('.meme-container')
    var elGallery = document.querySelector('.img-gallery')
    if (elMeme.style.display !== 'flex') {
        gCurrPage = 'meme'
        elGallery.style.display = 'none'
        elMeme.style.display = 'flex'
    } else {
        gCurrPage = 'gallery'
        elGallery.style.display = 'grid'
        elMeme.style.display = 'none'
    }
}


// TODO - when a nav button is pressed it can't be repressed

// --- CONTROL PANEL ---
function onSetLine() {
    setCurrLine()
    var txt = getText()
    console.log('text', txt);
    renderInputValue(txt)
}


function renderInputValue(txt) {
    var elInput = document.querySelector('.first-input')
    elInput.value = txt;
}
function onRemoveLine() {
    removeLine()
    renderImg()
}
function onTextInput() {
    console.log('IM HERE')
    var firstTextBox = document.getElementById('first-text');
    var txt = firstTextBox.value;
    updateTextLine(txt);
    renderImg()
}
function onSetFontSize(diff) {
    setFontSize(diff)
    renderImg()
}
function onSetTextPos(diff) {
    setTextPos(diff)
    renderImg()
}
function onAddLine() {
    createLine()
    renderImg()
}
function onSetStrokeColor(value) {
    setStrokeColor(value)
    renderImg()
}
function onSetFillColor(value) {
    setFillColor(value)
    renderImg()
}
function onSetFont(value) {
    setFont(value)
    renderImg()
}
function onDownload(elLink){
    const data = gCanvas.toDataURL('image/jpeg');
    elLink.href = data;
    elLink.download = 'img';
}

// --- MEME EDITOR ---

function renderImg() {
    var currImg = getImg();
    var img = new Image();
    img.src = currImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        renderText()

    }
}

function renderText() {
    var linesObjs = getLineObjs();
    linesObjs.map(line => {
        var txt = (line.txt).toUpperCase();
        var size = line.size
        var txtPos = line.pos;
        var txtFont = line.font;
        gCtx.font = size + 'px ' + txtFont;
        gCtx.strokeStyle = line.color;
        gCtx.fillStyle = line.fillColor;
        gCtx.textAlign = line.align;
        gCtx.strokeText(txt, txtPos.x, txtPos.y)
        gCtx.fillText(txt, txtPos.x, txtPos.y)
    }
    )
}
