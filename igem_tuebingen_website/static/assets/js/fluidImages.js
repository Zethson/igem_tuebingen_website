function showImage(imgName) {
const w = window.innerWidth;

if(w < 500)document.getElementById('largeImg').src = imgName;
if(w < 500)showLargeImagePanel();
if(w < 500)unselectAll();


}
function showLargeImagePanel() {
document.getElementById('largeImgPanel').style.visibility = 'visible';

}

function unselectAll() {
if(document.selection) document.selection.empty();
if(window.getSelection) window.getSelection().removeAllRanges();

}

function hideMe(obj) {
obj.style.visibility = 'hidden';}