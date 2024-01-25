const timerDate = document.getElementById('timer-date')
const timerTime = document.getElementById('timer-time')

const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


setInterval(function() {
    const now = new Date()
    timerDate.textContent = `${now.toLocaleDateString()} ${daysOfWeek[now.getDay()]}`
    timerTime.textContent = now.toLocaleTimeString()
}, 1000)

console.log()