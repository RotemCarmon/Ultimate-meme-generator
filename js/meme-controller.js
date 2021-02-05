'use strict';


// --- GLOBALS ---

var gCanvas;
var gCtx
var gMousePrevPos = null;
var gImg;

function onInit() {
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
    saveInitState()
    addEventListeners()
    onGetKeywords()
    onRenderImgs()
    onCreateStikers()
    gImg = new Image();

}


function addEventListeners() {

    gCanvas.addEventListener('mousedown', (ev) => {
        ev.preventDefault()
        canvasPressHandler(ev)
        dragAndDrop(ev)
    })
    gCanvas.addEventListener('mouseup', (ev) => {
        ev.preventDefault()
        dropStiker(ev)
        drop(ev)
    })
    gCanvas.addEventListener('touchstart', (ev) => {
        ev.preventDefault()
        canvasPressHandler(ev)
        dragAndDrop(ev)
    })
    gCanvas.addEventListener('touchend', (ev) => {
        ev.preventDefault()
        drop(ev)
        dropStiker(ev)
    })
}

function resize() {
    var elCanvasContainer = document.querySelector('.canvas-container')
    var width = elCanvasContainer.offsetWidth
    var height = elCanvasContainer.offsetWidth
    const canvas = document.querySelector('canvas')
    canvas.width = width
    canvas.height = height
    fitLinesToSize()
    onRenderImg()
}
function fitLinesToSize() {
    var lines = getLinesArray();
    var fullFont = getFullFont()
    var text = getText()
    var textWidth = getTextWidth(text, fullFont)
    var canvasWidth = document.querySelector('canvas').width;
    var canvasHeight = document.querySelector('canvas').height;
    lines.forEach(line => line.pos.x = (canvasWidth - textWidth) / 2);
    lines[1].pos.y = canvasHeight - 50


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

// --- IMAGE GALLERY --- 

function onRenderImgs(value) {
    var imgGallery = onSearchKeyWords(value)
    var strHTMLs =
        imgGallery.map(img => {
            return `<img src="${img.url}" alt="" data-imgid="${img.id}" class="image pointer" onclick="onImgSelect(this)">`
        }).join('');
    var elGallery = document.querySelector('.img-gallery');
    elGallery.innerHTML = strHTMLs;
}
function onImgSelect(img) {
    var selectedImgId = img.dataset.imgid;
    setInitState()
    updateCurrImg(selectedImgId)
    displayMemeEditor()
    updateProperties()
    var currImg = getImg();
    gImg.src = currImg.url
    gImg.onload = () => {
        onRenderImg()
    }
}

function onRenderImg() {
    gCtx.drawImage(gImg, 0, 0, gCanvas.width, gCanvas.height)
    onRenderText()
    onRenderStikers()
}

function displayMemeEditor() {
    var elMeme = document.querySelector('.meme-container')
    var elGallery = document.querySelector('.img-gallery-container')
    elGallery.style.display = 'none'
    elMeme.style.display = 'flex'
    resize()
}

function displayGallery() {
    var elMeme = document.querySelector('.meme-container')
    var elGallery = document.querySelector('.img-gallery-container')
    elGallery.style.display = 'grid'
    elMeme.style.display = 'none'
}

// --- SEARCH ---

function onSearchKeyWords(value) {
    var filteredImgs = searchKeyWords(value)
    return filteredImgs
}

function onSetKeywords(value) {
    setKeywords(value)
    onGetKeywords()
}

function onGetKeywords() {
    var arr = getArrayOfKeywords()
    var strHTMLs = ``;
    arr.forEach(keyword => {
        var fontSize = 5 * keyword.searchCount
        if (fontSize > 120) fontSize = 80
        else if (fontSize < 20) fontSize = 20
        strHTMLs += `
        <li><a class="keyword" onclick="handleKeywordClicked('${keyword.keyword}')" style="font-size: ${fontSize}px">${keyword.keyword.toLowerCase()}</a></li>
        `
    })
    document.querySelector('.freq-searched').innerHTML = strHTMLs;
}

function handleKeywordClicked(keyword) {
    onRenderImgs(keyword);
    onSetKeywords(keyword)
}

// --- CONTROL PANEL ---

function onChooseLine(line) {  // line = object
    setCurrLine(line);
    updateProperties()
}
function updateProperties() {
    var txt = getText();
    onUpdateInputValue(txt);
    updateStrokeColorValue();
    updateFillColorValue();
    updateFont();
}
function onUpdateInputValue(txt) {
    var elInput = document.querySelector('.first-input');
    elInput.value = txt;
}
function onRemoveLine() {
    removeLine()
    onRenderImg()
}
function onTextInput(txt) {
    setText(txt);
    onRenderImg()
}
function onSetFontSize(diff) {
    setFontSize(diff)
    onRenderImg()
}
function onAlignLeft() {
    alignLeft()
    onRenderImg()
}
function onAlignCenter() {
    alignCenter()
    onRenderImg()
}
function onAlignRight() {
    alignRight()
    onRenderImg()
}
function onAddLine() {
    createLine()
    onRenderImg()
}
function onSetStrokeColor(value) {
    setStrokeColor(value)
    onRenderImg()
}
function updateStrokeColorValue() {
    var value = getStrokeColor()
    document.querySelector('#stroke').value = value;
}
function onSetFillColor(value) {
    setFillColor(value)
    onRenderImg()
}
function updateFillColorValue() {
    var value = getFillColor()
    document.querySelector('#fill').value = value;
}
function onSetFont(value) {
    setFont(value)
    onRenderImg()
}
function updateFont() {
    var value = getFont();
    document.querySelector('.font-list').value = value;
}
function onDownload(elLink) {
    const data = gCanvas.toDataURL('image/jpeg');
    elLink.href = data;
    elLink.download = 'img';
}
function onSaveImg() {
    clearMarked()
    onRenderImg()
    saveImg()
}


// --- MEME EDITOR ---

function onRenderText() {
    var linesObjs = getLinesArray();
    linesObjs.forEach((line, idx) => {
        var txt = (line.txt).toUpperCase();
        var size = line.size
        var txtPos = line.pos;
        var txtFont = line.font;
        gCtx.font = size + 'px ' + txtFont;
        gCtx.lineWidth = 4
        gCtx.strokeStyle = line.color;
        gCtx.fillStyle = line.fillColor;
        gCtx.textAlign = line.align;
        gCtx.strokeText(txt, txtPos.x, txtPos.y)
        gCtx.fillText(txt, txtPos.x, txtPos.y)
        if (line.isMarked) drawMark(line)

    }
    )
}

function drawMark(line) {
    var markSize = calcMarkSize(line);
    gCtx.beginPath();
    gCtx.rect(markSize.x - 30, markSize.y - markSize.height - 10, markSize.width + 60, markSize.height + 30);
    gCtx.fillStyle = '#0077aa2e';
    gCtx.fill()
}

function canvasPressHandler(ev) {
    var pos = getTouchPos(ev)
    var linePressed = getClickedLine(pos) // return the line object
    var stikerPressedIdx = getClickedStikerIdx(pos)
    if (!linePressed && stikerPressedIdx === -1) { // No text or stiker was pressed
        clearMarked()
        return
    } else if (!linePressed) { // Stiker pressed
        var stikersOnCanvas = getStickersOnCanvas()
        updateCurrStiker(stikersOnCanvas[stikerPressedIdx].element)
        stikersOnCanvas.splice(stikerPressedIdx, 1);
    } else { // Text pressed
        if (isMarked(linePressed)) return
        setMarked(linePressed)
        onChooseLine(linePressed) // set selectedLineidx and relevant text properties
        onRenderImg()
    }
}


// DRAG & DROP

function dragAndDrop(ev) {
    var pos = getTouchPos(ev)
    setLineIsDragging(pos)

    gMousePrevPos = { x: pos.x, y: pos.y };
    gCanvas.addEventListener('mousemove', function (ev) {
        ev.preventDefault()
        ev.stopPropagation()
        whileDrag(ev)
    })
    gCanvas.addEventListener('touchmove', function (ev) {
        ev.preventDefault()
        ev.stopPropagation()
        whileDrag(ev)
    })

}

function onChangePos(ev) {
    var pos = getTouchPos(ev)
    var mouseCurrPos = { x: pos.x, y: pos.y }
    var delta = {
        x: mouseCurrPos.x - gMousePrevPos.x,
        y: mouseCurrPos.y - gMousePrevPos.y
    }
    updatePos(delta)
    return mouseCurrPos
}

function whileDrag(ev) {
    var isDragged = getLineIsDragging()
    if (!isDragged) return
    gMousePrevPos = onChangePos(ev)
    onRenderImg()
}

function drop(ev) {
    onChangePos(ev)
    clearIsDragging()
    onRenderImg()
}

function getTouchPos(ev) {
    // checks if the event is touch or nouse event
    // returns the correct position object
    var pos = {}

    if (ev.type === 'touchstart'
        || ev.type === 'touchmove'
        || ev.type === 'touchend') {

        pos = {
            x: ev.changedTouches[0].pageX - ev.changedTouches[0].target.offsetLeft,
            y: ev.changedTouches[0].pageY - ev.changedTouches[0].target.offsetTop
        }
    } else {
        pos = {
            x: ev.offsetX,
            y: ev.offsetY
        }
    }
    return pos
}

function allowDrop(ev) {
    ev.preventDefault();
}
