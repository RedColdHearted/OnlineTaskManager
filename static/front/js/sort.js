document.getElementById('sort').addEventListener('click', function() {
    
    const window = document.getElementById('sort-window') // Открываем окно при клике на кнопку
    window.style.cssText = `
    visibility: visible; 
    opacity: 1;
    transform: rotateX(0deg);
    `
  });

document.addEventListener('click', function(event) {
    var window = document.getElementById('sort-window');
    var openButton = document.getElementById('sort');
    var pic = document.getElementById('sort-pic');
    if (event.target != window && event.target != openButton && event.target != pic) {
        window.style.cssText = "visibility: hidden"; // Закрываем окно по клику на другой элемент
    }
  });