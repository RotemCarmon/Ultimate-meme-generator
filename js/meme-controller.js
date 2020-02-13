'use strict';


// --- GLOBALS ---

var gCanvas;
var gCtx
var gCurrPage;
var gMouseStartPos;
var gMousePrevPos;

function onInit() {
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
    addEventListeners()
    showImages()
    findAllPosses()
}
function addEventListeners() {
    var firstText = document.querySelector('.first-input');
    firstText.addEventListener('keyup', () => {
        ev.preventDefault()
        ev.stopPropagation()
        onTextInput()
    });
    gCanvas.addEventListener('click', (ev) => {
        MarkText(ev);
    })
    gCanvas.addEventListener('mousedown', (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        dragAndDrop(ev)
    })
    gCanvas.addEventListener('mouseup', (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        drop(ev)
    })


}

function dragAndDrop(ev) {
    setIsDragging(ev)
    gMouseStartPos = { x: ev.offsetX, y: ev.offsetY }
    gMousePrevPos = null;
    gCanvas.addEventListener('mousemove', function (ev) {
        ev.preventDefault()
        ev.stopPropagation()
        whileDrag(ev)
    })
}

function whileDrag(ev) {
    if (!gMousePrevPos) gMousePrevPos = gMouseStartPos
    var mouseCurrPos = { x: ev.offsetX, y: ev.offsetY }
    var delta = {
        x: mouseCurrPos.x - gMousePrevPos.x,
        y: mouseCurrPos.y - gMousePrevPos.y
    }

    upDatePos(delta)
    renderImg()
    gMousePrevPos = mouseCurrPos
}

function drop(ev) {
    var mouseEndPos = { x: ev.offsetX, y: ev.offsetY }
    var delta = {
        x: mouseEndPos.x - gMousePrevPos.x,
        y: mouseEndPos.y - gMousePrevPos.y
    }
    upDatePos(delta)
    renderImg()
    findAllPosses()
}

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

function MarkText(ev) {
    var txtPressed = getClickedTextPos(ev)
    if (txtPressed < 0) return
    var marked = checkMark(txtPressed)
    if (marked) return
    setMarked(txtPressed)
    setCurrLine(txtPressed)
    renderImg()
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
    updateInputValue(txt)
}
function updateInputValue(txt) {
    var elInput = document.querySelector('.first-input')
    elInput.value = txt;
}
function onRemoveLine() {
    removeLine()
    renderImg()
}
function onTextInput() {
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
function onDownload(elLink) {
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
    linesObjs.forEach((line, idx) => {
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
        if (line.isMarked) markBox(idx)

    }
    )
}
function markBox(idx) {
    var allPosses = getAllPosses()
    var currPos = allPosses[idx];
    gCtx.beginPath();
    gCtx.rect(currPos.x - 10, currPos.y - currPos.height - 10, currPos.width + 20, currPos.height + 30);
    gCtx.fillStyle = '#0077aa2e';
    gCtx.fill()
}
