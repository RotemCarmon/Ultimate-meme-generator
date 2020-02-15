'use strict';


// --- GLOBALS ---
var gMarked;
var gAllPosses;
var gInitState;

var gKeywords = { 'funny': 7, 'cute': 4, 'dog': 2, 'sad': 5, 'happy': 12, 'baby': 9 }

var gImgs = [
    {
        id: 0,
        url: './img/1.jpg',
        keywords: ['funny', 'trump', 'mad']
    },
    {
        id: 1,
        url: './img/2.jpg',
        keywords: ['cute', 'dogs', 'kiss', 'romantic', 'animal']
    },
    {
        id: 2,
        url: './img/3.jpg',
        keywords: ['cute', 'dogs', 'baby', 'sleep', 'animal']
    },
    {
        id: 3,
        url: './img/4.jpg',
        keywords: ['cute', 'cat', 'sleep', 'tired', 'animal']
    },
    {
        id: 4,
        url: './img/5.jpg',
        keywords: ['funny', 'cute', 'baby', 'strong']
    },
    {
        id: 5,
        url: './img/6.jpg',
        keywords: ['funny', 'big']
    },
    {
        id: 6,
        url: './img/7.jpg',
        keywords: ['cute', 'baby']
    },
    {
        id: 7,
        url: './img/8.jpg',
        keywords: ['funny', 'admiration', 'willy', 'wonka']
    },
    {
        id: 8,
        url: './img/9.jpg',
        keywords: ['funny', 'cute', 'baby', 'happy']
    },
    {
        id: 9,
        url: './img/10.jpg',
        keywords: ['funny', 'obama', 'barak', 'joy', 'laugh', 'happy']
    },
    {
        id: 10,
        url: './img/11.jpg',
        keywords: ['funny', 'romantic', 'gay', 'sport']
    },
    {
        id: 11,
        url: './img/12.jpg',
        keywords: ['motivating', 'blaming', 'chaim', 'hecht']
    },
    {
        id: 12,
        url: './img/13.jpg',
        keywords: ['cheers', 'greeting', 'rich', 'money']
    },
    {
        id: 13,
        url: './img/14.jpg',
        keywords: ['meaningful', 'badass', 'intense', 'morphius']
    },
    {
        id: 14,
        url: './img/15.jpg',
        keywords: ['explaining', 'talk']
    },
    {
        id: 15,
        url: './img/16.jpg',
        keywords: ['funny', 'omg', 'embarrassed']
    },
    {
        id: 16,
        url: './img/17.jpg',
        keywords: ['putin', 'two', 'putin']
    },
    {
        id: 17,
        url: './img/18.jpg',
        keywords: ['toy', 'imagine', 'scared', 'buzz']
    },

]

var gMeme = {
    selectedImgId: 0,
    selectedLineidx: 0,

    lines: [
        {
            txt: 'ENTER TEXT HERE',
            size: 35,
            align: 'left',
            color: '#000000',
            fillColor: '#ffffff',
            font: 'Impact',
            pos: { x: 100, y: 80 },
            isMarked: false,
        },
        {
            txt: 'ENTER TEXT HERE',
            size: 45,
            align: 'left',
            color: '#000000',
            fillColor: '#ffffff',
            font: 'Impact',
            pos: { x: 100, y: 400 },
            isMarked: false,
        },
    ],
}
var gStikers = {

    selectedStikerIdx: 0,
    stikers: [
        {
            id: 0,
            url: './stikers/mario mushroom.png',
            pos: { x: 0, y: 0 },
            isSelected: false
        },
        {
            id: 1,
            url: './stikers/a funny dog sticker.png',
            pos: { x: 300, y: 100 },
            isSelected: false
        },
        {
            id: 2,
            url: './stikers/cartoon sticker.png',
            pos: { x: 100, y: 300 },
            isSelected: false
        },
        {
            id: 3,
            url: './stikers/challenge accepted sticker.png',
            pos: { x: 300, y: 300 },
            isSelected: false
        },
        {
            id: 4,
            url: './stikers/false.png',
            pos: { x: 300, y: 100 },
            isSelected: false
        },
        {
            id: 5,
            url: './stikers/nugs not drugs.png',
            pos: { x: 100, y: 300 },
            isSelected: false
        },
        {
            id: 6,
            url: './stikers/present.png',
            pos: { x: 300, y: 300 },
            isSelected: false
        },

    ]
}




// --- CONTROL PANEL ---

function setText(txt) {
    gMeme.lines[gMeme.selectedLineidx].txt = txt
}
function setFontSize(diff) {
    gMeme.lines[gMeme.selectedLineidx].size += diff
}
function setStrokeColor(value) {
    gMeme.lines[gMeme.selectedLineidx].color = value;
}
function setFillColor(value) {
    gMeme.lines[gMeme.selectedLineidx].fillColor = value;
}
function setFont(value) {
    gMeme.lines[gMeme.selectedLineidx].font = value;
}
function getText() {
    return gMeme.lines[gMeme.selectedLineidx].txt.toUpperCase();
}
function getFontSize() {
    return gMeme.lines[gMeme.selectedLineidx].size;
}
function getStrokeColor() {
    return gMeme.lines[gMeme.selectedLineidx].color;
}
function getFillColor() {
    return gMeme.lines[gMeme.selectedLineidx].fillColor;
}
function getFont() {
    return gMeme.lines[gMeme.selectedLineidx].font;
}
function alignLeft() {
    gMeme.lines[gMeme.selectedLineidx].pos.x = 0
}
function alignCenter() {
    var size = getFontSize()
    var font = getFont()
    var fullFont = `${size}px  ${font}`;
    var text = getText()
    var textWidth = getTextWidth(text, fullFont)
    gMeme.lines[gMeme.selectedLineidx].pos.x = (500 - textWidth) / 2
}
function alignRight() {
    var size = getFontSize()
    var font = getFont()
    var fullFont = `${size}px  ${font}`;
    var text = getText()
    var textWidth = getTextWidth(text, fullFont)
    gMeme.lines[gMeme.selectedLineidx].pos.x = (500 - textWidth)
}
function createLine() {
    var numOfLines = gMeme.lines.length;
    var setY = 60 * numOfLines
    var newLine = {
        txt: 'ENTER TXET HERE',
        size: 35,
        align: 'left',
        color: getStrokeColor(),
        fillColor: getFillColor(),
        font: getFont(),
        pos: { x: 100, y: setY },
        isMarked: false,
    }
    gMeme.lines.push(newLine)
    gMeme.selectedLineidx = gMeme.lines.length - 1;
}
function removeLine() {
    var line = gMeme.selectedLineidx;
    gMeme.lines.splice(line, 1)
}
function getTextPos() {
    return gMeme.lines[gMeme.selectedLineidx].pos
}

// --- IMAGE GALLERY ---

function updateCurrImgId(id) {
    gMeme.selectedImgId = id
}
function getImageGallery() {
    return gImgs;
}

// --- MEME EDITOR ---

function getImg() {
    return gImgs[gMeme.selectedImgId];
}
function setIsDragging(ev) {
    var clickedText = getClickedTextPos(ev)
    if (clickedText < 0) return
    else gAllPosses[clickedText].isDragging = true
}
function getIsDragging() {
    return gAllPosses.findIndex(pos => pos.isDragging === true)
}
function upDatePos(delta) {
    var currDragging = getIsDragging()
    if (currDragging < 0) return
    var prevPos = gMeme.lines[currDragging].pos
    var newPos = { x: prevPos.x + delta.x, y: prevPos.y + delta.y }
    gMeme.lines[currDragging].pos =  newPos;
}
function getStiker() {
    var currStiker = gStikers.selectedStikerIdx;
    return gStikers.stikers[currStiker];
}
function getStikers() {
    return gStikers.stikers;
}
// --- SEARCH ---

function searchKeyWords(value) {
    var filteredImgs = gImgs.filter((img) => {
        if (!value) return true
        else {
            return img.keywords.some(key => key.toLowerCase().indexOf(value.toLowerCase()) !== -1)
        }
    })
    return filteredImgs;
}
function setKeywords(value) {
    if (value in gKeywords) gKeywords[value] += 1
    else gKeywords[value] = 1
    console.log('gKeywords', gKeywords);
}
function getfrequentKeywords() {   // get only the 5 most frequently searched words

    var keywords = JSON.parse(JSON.stringify(gKeywords));
    var freqWords = [];
    while (Object.keys(freqWords).length < 5) {
        if (!Object.keys(keywords).length > 0) return freqWords;

        var currWord;
        var currNum = 0;
        for (const word in keywords) {
            if (keywords[word] > currNum) {
                currWord = word;
                currNum = keywords[word];
            }
        }

        freqWords.push({ keyword: currWord, searchCount: currNum })

        delete keywords[currWord];
    }
    return freqWords;

}

function getArrayOfKeywords() {
    var keywordsArr = [];
    for (const key in gKeywords) {
        keywordsArr.push({ keyword: key, searchCount: gKeywords[key] })
    }
    return keywordsArr;
}


// TODO - Array of keywords objects contains keyword and num of times it've been search


// --- Utils ---




function getLineObjs() {
    var lines = gMeme.lines
    return lines
}
function setCurrLine(line) {
    if (line >= 0) {
        gMeme.selectedLineidx = line;
        return
    }
    var linesLength = gMeme.lines.length;
    if (gMeme.selectedLineidx < linesLength - 1) {
        gMeme.selectedLineidx++
    } else {
        gMeme.selectedLineidx = 0;
    }
}
function getCurrLine() {
    return gMeme.selectedLineidx;
}
function getTextWidth(text, font) {

    var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement("canvas"));
    var context = canvas.getContext("2d");
    context.font = font;
    var metrics = context.measureText(text);
    return metrics.width;
}
function setAllPosses() {
    var allPosses = gMeme.lines.map(line => {
        var txtPos = line.pos;
        var textHeight = line.size;
        var fullFont = `${line.size}px  ${line.font}`
        var textWidth = getTextWidth(line.txt, fullFont)

        return createPosObj(txtPos.x, txtPos.y, textWidth, textHeight)

    })
    gAllPosses = allPosses;
    return allPosses
}
function getAllPosses() {
    return gAllPosses
}
function createPosObj(x, y, width, height) {
    return {
        x,
        y,
        width,
        height,
        isDragging: false
    }
}
function setMarked(mark) {
    clearMarked()
    gMeme.lines[mark].isMarked = true;
    gMarked = mark;
}
function clearMarked() {
    gMeme.lines.forEach(line => line.isMarked = false)
}
function checkMark(txtPressed) {
    return gMeme.lines[txtPressed].isMarked;
}
function getClickedTextPos(ev) {
    var allPosses = gAllPosses;
    var ex = ev.offsetX;
    var ey = ev.offsetY;
    var txtPressed = allPosses.findIndex(pos => {
        return ex > +pos.x
            && ex < +(pos.x + pos.width)
            && ey > +(pos.y - pos.height)
            && ey < +pos.y
    })
    return txtPressed
}
function getClickedStikerPos(ev) {
    console.log(ev)
    var stikerPosses = gStikers.stikers.map(stiker => stiker.pos)

    var ex = ev.offsetX;
    var ey = ev.offsetY;
    var stikerPressed = stikerPosses.findIndex(pos => {
        return ex > +pos.x
            && ex < +(pos.x + 200)
            && ey < +(pos.y + 200)
            && ey > +pos.y
    })

    console.log('current stikerPosses', stikerPosses);
    return stikerPressed
}


function saveInitState() {
    gInitState = JSON.parse(JSON.stringify(gMeme));
}
function setInitState() {
    gMeme = JSON.parse(JSON.stringify(gInitState));
}
function saveImg() {
    if (!localStorage.getItem('my-canvas')) savedImgs = [];
    else var savedImgs = JSON.parse(localStorage.getItem('my-canvas'))

    savedImgs.push(gCanvas.toDataURL())
    var str = JSON.stringify(savedImgs)
    localStorage.setItem('my-canvas', str)
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array
}
function getStikerId(stiker){
    return stiker.dataset.stiker
}
function updateCurrStikerId(stiker) {
    var stikerId = getStikerId(stiker);
    console.log('selected stiker', stikerId)
    gStikers.stikers.forEach(stiker => stiker.isSelected = false)
    gStikers.stikers[stikerId].isSelected = true
    gStikers.selectedStikerIdx = stikerId;
}