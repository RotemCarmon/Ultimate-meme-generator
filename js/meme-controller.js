'use strict';


// --- GLOBALS ---

var gCanvas;
var gCtx
var gMouseStartPos;
var gMousePrevPos;
var gImg;

function onInit() {
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
    saveInitState()
    addEventListeners()
    onGetKeywords()
    onRenderImgs()
    onCreateStikers()
    setAllPosses()
    gImg = new Image();

}



function addEventListeners() {
    var firstText = document.querySelector('.first-input');
    firstText.addEventListener('keyup', (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        onTextInput()
        setAllPosses()
    });
    gCanvas.addEventListener('mousedown', (ev) => {
        ev.preventDefault()
        canvasPressHandler(ev)
        dragAndDrop(ev)
    })
    gCanvas.addEventListener('mouseup', (ev) => {
        ev.preventDefault()
        dropStiker(ev)
        setAllPosses()
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
        setAllPosses()
    })
}
function resize() {
    var elCanvasContainer = document.querySelector('.canvas-container')
    var width = elCanvasContainer.offsetWidth
    var height = elCanvasContainer.offsetWidth
    document.querySelector('canvas').width = width
    document.querySelector('canvas').height = height
    fitLinesToSize()
    onRenderImg()
}
function fitLinesToSize() {
    var lines = getLineObjs();
    var fullFont = getFullFont()
    var text = getText()
    var textWidth = getTextWidth(text, fullFont)
    var canvasWidth = document.querySelector('canvas').width;
    var canvasHeight = document.querySelector('canvas').height;
    lines.forEach(line => line.pos.x = (canvasWidth - textWidth) / 2);
    lines[1].pos.y = canvasHeight - 50


}
function touchHandler(ev) {

    var pos = {}

    if (
        ev.type === 'touchstart'
        || ev.type === 'touchmove'
        || ev.type === 'touchend'
    ) {

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


    // console.log(currPos)
    return pos
}


// --- IMAGE GALLERY --- 

// }

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
    // updateCurrImgId(selectedImgId)
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
        var fontSize = 10 * keyword.searchCount
        if (fontSize > 150) fontSize = 150
        else if (fontSize < 20) fontSize = 20
        strHTMLs += `
        <li><a class="keyword" onclick="onRenderImgs('${keyword.keyword}')" style="font-size: ${fontSize}px">${keyword.keyword.toLowerCase()}</a></li>
        `
    })
    document.querySelector('.freq-searched').innerHTML = strHTMLs;
}

// --- CONTROL PANEL ---

function onChooseLine(line) {
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
function onTextInput() {
    var firstTextBox = document.getElementById('first-text');
    var txt = firstTextBox.value;
    setText(txt);
    onRenderImg()
}
function onSetFontSize(diff) {
    setFontSize(diff)
    setAllPosses()
    onRenderImg()
}
function onAlignLeft() {
    alignLeft()
    setAllPosses()
    onRenderImg()
}
function onAlignCenter() {
    alignCenter()
    setAllPosses()
    onRenderImg()
}
function onAlignRight() {
    alignRight()
    setAllPosses()
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
    var linesObjs = getLineObjs();
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
        if (line.isMarked) drawMark(idx)

    }
    )
}
function drawMark(idx) {
    var allPosses = getAllPosses()
    var currPos = allPosses[idx];
    gCtx.beginPath();
    gCtx.rect(currPos.x - 30, currPos.y - currPos.height - 10, currPos.width + 60, currPos.height + 30);
    gCtx.fillStyle = '#0077aa2e';
    gCtx.fill()
}
function canvasPressHandler(ev) {
    var txtPressed = getClickedTextPos(ev)
    var stikerPressed = getClickedStikerPos(ev)
    if (txtPressed < 0 && stikerPressed < 0) {
        clearMarked()
        onRenderImg()
        return
    } else if (txtPressed < 0) {
        var stikerIdx = getClickedStikerPos(ev) // id in onCanvas array
        console.log('stikerIdx',stikerIdx);
        var stikersOnCanvas = getStikersOnCanvas()
        var stikerId = stikersOnCanvas[stikerIdx].id 
        console.log('stikerId',stikerId);
        updateSelectedStikerIdx(stikerId)
        updateIsSelected(stikerId)
        updateCurrStiker(stikersOnCanvas[stikerIdx].element)
        stikersOnCanvas.splice(stikerIdx, 1);

    } else {
        var marked = checkMark(txtPressed)
        if (marked) return
        setMarked(txtPressed)
        onChooseLine(txtPressed)
        onRenderImg()
    }
}


// DRAG & DROP


function dragAndDrop(ev) {
    var pos = touchHandler(ev)

    setIsDragging(ev)
    gMouseStartPos = { x: pos.x, y: pos.y }
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
function whileDrag(ev) {
    var pos = touchHandler(ev)
    var isDragged = getIsDragging()
    if (isDragged < 0) return
    if (!gMousePrevPos) gMousePrevPos = gMouseStartPos
    var mouseCurrPos = { x: pos.x, y: pos.y }
    var delta = {
        x: mouseCurrPos.x - gMousePrevPos.x,
        y: mouseCurrPos.y - gMousePrevPos.y
    }

    updatePos(delta)
    gMousePrevPos = mouseCurrPos
    onRenderImg()
}
function drop(ev) {
    var pos = touchHandler(ev)

    var mouseEndPos = { x: pos.x, y: pos.y }
    var delta = {
        x: mouseEndPos.x - gMousePrevPos.x,
        y: mouseEndPos.y - gMousePrevPos.y
    }
    updatePos(delta)
    onRenderImg()

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
function allowDrop(ev) {
    ev.preventDefault();
}


// --- STIKERS --- 

function onCreateStikers() {  // create the img element on control panel
    var stikers = getStikers()
    var strHTMLs =
        stikers.map(stiker => {
            return `<img src="${stiker.url}" alt="" data-stiker="${stiker.id}" class="stiker pointer" onmousedown="onStikerSelect(this)" ontouchstart="onStikerSelect(this)" draggable="true">`
        }).join('');
    var elStikers = document.querySelector('.stikers');
    elStikers.innerHTML = strHTMLs;
}
function onStikerSelect(stiker) { // When stiker is pressed on control panel
    updateCurrStiker(stiker)

}

function onRenderStiker(stikerPos) {
    var currStiker = getStiker()  // selectedStiker element in gStikers object
    var img = currStiker;
    gCtx.drawImage(img, stikerPos.x - 50, stikerPos.y - 50, 100, 100)
    
}
function onRenderStikers() {  // When the img is rendered this function rerenders the stikers on the canvas
    var stikersOnCanvas = getStikersOnCanvas();
    stikersOnCanvas.forEach(stiker => {
        var img = stiker.element
        gCtx.drawImage(img, stiker.pos.x, stiker.pos.y, 100, 100)

    })
}
function dropStiker(ev) {

    var selectedStiker = getSelectedId()
    var pos = touchHandler(ev)
    if (selectedStiker >= 0) {
        var dropPos = { x: pos.x, y: pos.y }
        updateStikerOnCanvas(ev)
        onRenderStiker(dropPos)
        clearIsSelected()
    }
}





