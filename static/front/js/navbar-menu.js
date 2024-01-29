document.getElementById('nav-menu-btn').addEventListener('click', function() {
    
    const window = document.getElementById('nav-menu-ul') // Открываем окно при клике на кнопку
    window.style.cssText = `
    visibility: visible; 
    opacity: 1;
    transform: rotateX(0deg);
    `
  });

document.addEventListener('click', function(event) {
    var window = document.getElementById('nav-menu-ul');
    var openButton = document.getElementById('nav-menu-btn');
    if (event.target != window && event.target != openButton) {
        window.style.cssText = "visibility: hidden"; // Закрываем окно по клику на другой элемент
    }
  });