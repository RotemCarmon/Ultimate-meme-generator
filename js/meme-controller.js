'use strict';

console.log('controller');

var gCanvas;
var gCtx


function onInit(){
    gCanvas = document.getElementById('meme-canvas');
    gCtx = gCanvas.getContext('2d');
    showImages()
}





// --- IMAGE GALLERY --- 

    var imgGallery = getImageGallery()
    function showImages(){
        var strHTMLs = 
        imgGallery.map(img => {
          return  `<img src"${img.url}"/>`
        }).join('');
        var elGallery = document.querySelector('.img-gallery');
        // elGallery.innerHTML = strHTMLs;
        console.log('gallery', elGallery);

    }




// --- MEME EDITOR ---

function darwImg(){
    var currImg = getImg(0);
    var img = new Image();
    img.src = currImg.url
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
}