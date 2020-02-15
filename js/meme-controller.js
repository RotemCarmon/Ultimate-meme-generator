'use strict';


// --- GLOBALS ---

var gCanvas;
var gCtx
var gMouseStartPos;
var gMousePrevPos;

function onInit() {
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
    saveInitState()
    addEventListeners()
    onGetKeywords()
    onRenderImgs()
    setAllPosses()
}
function addEventListeners() {
    var firstText = document.querySelector('.first-input');
    firstText.addEventListener('keyup', (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        onTextInput()
    });
    gCanvas.addEventListener('click', (ev) => {
        ev.preventDefault()
        OnPressText(ev);
    })
    gCanvas.addEventListener('mousedown', (ev) => {
        ev.preventDefault()
        // ev.stopPropagation()
        dragAndDrop(ev)
    })
    gCanvas.addEventListener('mouseup', (ev) => {
        ev.preventDefault()
        // ev.stopPropagation()
        setAllPosses()
        drop(ev)
    })
    // gCanvas.addEventListener('touchstart', (ev) => {
    //     ev.preventDefault()
    //     ev.stopPropagation()
    //     dragAndDrop(ev)
    //     OnPressText(ev);
    // }, false);
    // gCanvas.addEventListener('touchend', (ev) => {
    //     ev.preventDefault()
    //     ev.stopPropagation()
    //     setAllPosses()
    //     drop(ev)
    // }, false)
    // gCanvas.addEventListener('touchmove',(ev) => {
    //     ev.preventDefault()
    // }, false);


}


// --- IMAGE GALLERY --- 

// }
function onImgSelect(img) {
    var selectedImgId = img.dataset.img;
    setInitState()
    updateCurrImgId(selectedImgId)
    displayMemeEditor()
    updateProperties()
    onRenderImg()

}
function displayMemeEditor() {
    var elMeme = document.querySelector('.meme-container')
    var elGallery = document.querySelector('.img-gallery-container')
    elGallery.style.display = 'none'
    elMeme.style.display = 'flex'
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
function onRenderImgs(value) {
    console.log('value',value);
    var imgGallery = onSearchKeyWords(value)
    var strHTMLs =
        imgGallery.map(img => {
            return `<img src="${img.url}" alt="" data-img="${img.id}" class="image pointer" onclick="onImgSelect(this)">`
        }).join('');
    var elGallery = document.querySelector('.img-gallery');
    elGallery.innerHTML = strHTMLs;
}
function onSetKeywords(value){
    setKeywords(value)
    onGetKeywords()
}
function onGetKeywords(){
    var freqKeywords = getfrequentKeywords();
    // var freqKeywords = [];
    // freqKeywords.push(getKeywords());
    var arr = shuffleArray(freqKeywords)
    console.log(arr)
    var strHTMLs =``;
    arr.forEach(keyword => {
         strHTMLs += `
        <li><a class="keyword" onclick="onRenderImgs('${keyword.keyword}')" style="font-size: ${10*keyword.searchCount}px">${keyword.keyword}</a></li>
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

function onRenderImg() {
    var currImg = getImg();
    var img = new Image();
    img.src = currImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        onRenderText()
    }
}
function onRenderText() {
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
        if (line.isMarked) drawMark(idx)

    }
    )
}
function drawMark(idx) {
    var allPosses = getAllPosses()
    var currPos = allPosses[idx];
    gCtx.beginPath();
    gCtx.rect(currPos.x - 10, currPos.y - currPos.height - 10, currPos.width + 20, currPos.height + 30);
    gCtx.fillStyle = '#0077aa2e';
    gCtx.fill()
}
function OnPressText(ev) {
    var txtPressed = getClickedTextPos(ev)
    if (txtPressed < 0) {
        clearMarked()
        onRenderImg()
        return
    }
    var marked = checkMark(txtPressed)
    if (marked) return
    setMarked(txtPressed)
    onChooseLine(txtPressed)
    onRenderImg()
}

// DRAG & DROP


function dragAndDrop(ev) {
    setIsDragging(ev)
    gMouseStartPos = { x: ev.offsetX, y: ev.offsetY }
    gMousePrevPos = { x: ev.offsetX, y: ev.offsetY };


    gCanvas.addEventListener('mousemove', function (ev) {
        ev.preventDefault()
        ev.stopPropagation()
        whileDrag(ev)
    })
    //     gCanvas.addEventListener('touchmove', function (ev) {
    //         ev.preventDefault()
    //         ev.stopPropagation()
    //         whileDrag(ev)
    //     })
}
function whileDrag(ev) {
    var isDragged = getIsDragging()
    if (isDragged < 0) return
    if (!gMousePrevPos) gMousePrevPos = gMouseStartPos
    var mouseCurrPos = { x: ev.offsetX, y: ev.offsetY }
    var delta = {
        x: mouseCurrPos.x - gMousePrevPos.x,
        y: mouseCurrPos.y - gMousePrevPos.y
    }

    upDatePos(delta)
    gMousePrevPos = mouseCurrPos
    onRenderImg()
}
function drop(ev) {
    var mouseEndPos = { x: ev.offsetX, y: ev.offsetY }
    var delta = {
        x: mouseEndPos.x - gMousePrevPos.x,
        y: mouseEndPos.y - gMousePrevPos.y
    }
    upDatePos(delta)
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