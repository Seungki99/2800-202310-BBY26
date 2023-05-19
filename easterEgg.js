
document.getElementById("easterEgg").onclick = function() {  
fun()  
};  
function fun() {  
    txt = document.getElementById('easterEgg');
    style = window.getComputedStyle(txt, null).getPropertyValue('font-size');
    currentSize = parseFloat(style);
    txt.style.fontSize = (currentSize + 5) + 'px'; 
}  

