document.addEventListener('click', function(event) {
    var window = document.getElementById('alert');
    var btn = document.getElementById('close');
    if (event.target == btn) {
        window.style.cssText = "visibility: hidden; opacity: 0 ; height: 0px"; // Закрываем окно по клику на другой элемент
    }
  });