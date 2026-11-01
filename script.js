// clock
setInterval(() => {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}, 1000);

//Open or close wins
function openWindow() {
    document.getElementById('myWindow').style.display = 'block';
}

function closeWindow() {
    document.getElementById('myWindow').style.display = 'none';
}

function openNotepad() {
    document.getElementById('notepadWindow').style.display ='block';
}

function closeNotepad() {
    document.getElementById('notepadWindow').style.display = 'none';
}     

// drag the windows

let activeWindow = null;
let offsetX = 0, offsetY = 0;

function dragWindow(event, windowId) {
    event.preventDefault();
    activeWindow = document.getElementById(windowId);
    offsetX = event.clientX - activeWindow.offsetLeft;
    offsetY = event.clientY - activeWindow.offsetTop;

    document.onmousemove =elementDrag;
    document.onmouseup = closeDragElement;
}

function elementDrag(e) {
    if (!activeWindow) return;
    e.preventDefault();
    activeWindow.style.left = (e.clientX - offsetX) + "px";
    activeWindow.style.top = (e.clientY - offsetY) + "px";
}

function closeDragElement() {
    document.onmousemove = null;
    document.onmouseup = null;
    activeWindow = null;
}

const notepadarea = document.querySelector('#notepadWindow textarea');
if (notepadarea) {
    notepadarea.value = localStorage.getItem('notepadContent') || '';
    notepadarea.addEventListener('input', () => {
        localStorage.setItem('notepadContent', notepadarea.value);
    });
}    

//open a window
function openWindow(id) {
    const targetid =id || 'myWindow';
    document.getElementById(targetid).style.display= 'block';
}

//calc
function calcAppend(val) {
    document.getElementById('calcDisplay').value += val;
}

function calcClear() {
    document.getElementById('calcDisplay').value = ''; 
}

function calcEqual() {
    try {
        document.getElementById('calcDisplay').value =eval(document.getElementById('calcDisplay').value);     
    } catch {
        document.getElementById('calcDisplay').value = 'Error';
    }
}

// wind controls
function minimizeWindow(id) {
    document.getElementById(id).style.display= 'none';
}

function maximizeWindow(id) {
    const win =document.getElementById(id);
    
    //restore
    if (!win.dataset.maximized || win.dataset.maximized==="false"){
        win.dataset.prevwidth = win.style.width || '300px';
        win.dataset.prevHeight = win.style.height || 'auto';
        win.dataset.prevTop = win.style.top || '100px';
        win.dataset.prevLeft = win.style.left || '150px';
    
        
        win.style.width ='100vw';
        win.style.height= 'calc(100vh - 75px)';
        win.style.top = '35px';
        win.style.left ='0';
        win.dataset.maximized = "true"
    } else {
        win.style.width = win.dataset.prevwidth;
        win.style.height = win.dataset.prevHeight;
        win.style.top =win.dataset.prevTop;
        win.style.left =win.dataset.prevLeft;
        win.dataset.maximized = "false";
    }
}

function closeCalc() {
    document.getElementById('calcWindow').style.display= 'none';
}

let highestZindex =10;

function bringTofront(id){
    const win = document.getElementById(id);
    if (win) {
        highestZindex++;
        win.style.zIndex =highestZindex;
    }
}

function toggleWindow(id) {
    const win = document.getElementById(id);
    if (!win) return;

    // if windows open close it
    if (win.style.display=== 'block' && win.style.zIndex == highestZindex) {
        win.style.display= 'none';
    } else{
        //or open and bringto front
        win.style.display = 'block';
        bringTofront(id);
    }

}

//bring to front when drag
function dragWindow(event, windowId){
    event.preventDefault();
    bringTofront(windowId);
    activeWindow= document.getElementById(windowId);
    offsetX =event.clientX- activeWindow.offsetLeft;
    offsetY= event.clientY-activeWindow.offsetTop;

    document.onmousemove = elementDrag;
    document.onmouseup = closeDragElement;
}