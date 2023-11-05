//Clock indicators constructor
const millisecondsindicatorsContainer = document.querySelector('.milliseconds-indicators-container')
const minutesindicatorsContainer = document.querySelector('.minutes-indicators-container')

function createMillisecondsIndicators() {
    let degree = 0

    for (i = 0; i <= 300; i++) {
        const millisecondIndicator = document.createElement('div')
        millisecondIndicator.classList.add('millisecond-indicator')
        millisecondIndicator.style.transform = `rotate(${degree}deg) translateY(-225px)`

        if (i % 25 === 0) {
            millisecondIndicator.style.height = '18px'
            millisecondIndicator.style.width = '2px'
            millisecondIndicator.style.transform = `rotate(${degree}deg) translateY(-221px)`
        } else if (i % 5 === 0) {
            millisecondIndicator.style.height = '15px'
            millisecondIndicator.style.width = '1px'
            millisecondIndicator.style.transform = `rotate(${degree}deg) translateY(-223px)`
        }

        degree += 1.2
        millisecondsindicatorsContainer.appendChild(millisecondIndicator)
    }
}

function createMinutesIndicators() {
    let degree = 0

    for (i = 0; i <= 30; i++) {
        const minuteIndicator = document.createElement('div')
        minuteIndicator.classList.add('minutes-indicator')
        minuteIndicator.style.transform = `rotate(${degree}deg) translateY(-68px)`

        if (i % 5 === 0) {
            minuteIndicator.style.height = '18px'
            minuteIndicator.style.width = '2px'
            minuteIndicator.style.transform = `rotate(${degree}deg) translateY(-65px)`
        } else if (i % 5 === 0) {
            minuteIndicator.style.height = '15px'
            minuteIndicator.style.width = '1px'
            minuteIndicator.style.transform = `rotate(${degree}deg) translateY(-223px)`
        }

        degree += 12
        minutesindicatorsContainer.appendChild(minuteIndicator)
    }
}

createMillisecondsIndicators()
createMinutesIndicators()

//Pointers rotation
const lapPointer = document.querySelector('.lap-pointer')
const millisecondPointer = document.querySelector('.millisecond-pointer')
const minutePointer = document.querySelector('.minutes-pointer')

const degreesPerSecond = 5.95
let rotation = 0

//Milliseconds Pointer
function rotateMillisecondPointer() {
    rotation += degreesPerSecond / 60
    if (rotation >= 360) {
        rotation = 0;
    }
    millisecondPointer.style.transform = `rotate(${rotation}deg)`
}

//Lap Pointer
function rotateLapPointer() {
    rotation += degreesPerSecond / 60;
    if (rotation >= 360) {
        rotation = 0
    }
    lapPointer.style.transform = `rotate(${rotation}deg)`
}


//Minutes Pointer
// Minutes Pointer
let currentMinute = 0;

function rotateMinutePointer() {
    currentMinute += 1;

    if (currentMinute >= 30) {
        currentMinute = 0
    }

    const rotation = currentMinute * 12

    minutePointer.style.transform = `rotate(${rotation}deg)`    
}


// Buttons actions
// Lap button
const lap = document.querySelector('.lap')

lap.addEventListener('click', () => {
    lap.style.setProperty('--lap-before-top', '-30px')
    lap.style.setProperty('--lap-after-top', '-30px')

    clearInterval(lapInterval)

    setTimeout(() => {
        lap.style.setProperty('--lap-before-top', '-40px')
        lap.style.setProperty('--lap-after-top', '-43px')
    }, 200)
})

// Start/Stop button
const startStop = document.querySelector('.start-stop')

let click = false
let millisecondInterval
let lapInterval
let minuteInterval

startStop.addEventListener('click', () => {
    startStop.style.setProperty('--startStop-before-top', '-30px')
    startStop.style.setProperty('--startStop-after-top', '18px')

    setTimeout(() => {
        startStop.style.setProperty('--startStop-before-top', '-40px')
        startStop.style.setProperty('--startStop-after-top', '8px')
    }, 200)

    if (!click) {
        click = true
        isLapIntervalActive = true
        millisecondInterval = setInterval(rotateMillisecondPointer, 1000 / 30)
        lapInterval = setInterval(rotateLapPointer, 1000 / 30)
        minuteInterval = setInterval(rotateMinutePointer, 1000 * 60)
    } else {
        click = false
        clearInterval(millisecondInterval)
        clearInterval(lapInterval)
        isLapIntervalActive = false
    }
})

// Reset button
const reset = document.querySelector('.reset')

reset.addEventListener('click', () => {
    reset.style.setProperty('--reset-before-top', '-30px')
    reset.style.setProperty('--reset-after-top', '18px')

    setTimeout(() => {
        reset.style.setProperty('--reset-before-top', '-40px')
        reset.style.setProperty('--reset-after-top', '8px')
    }, 200)

    clearInterval(lapInterval)
    clearInterval(millisecondInterval)
    clearInterval(minuteInterval)
    click = false
    rotation = 0
    currentMinute = 0
    millisecondPointer.style.transform = `rotate(0deg)`
    lapPointer.style.transform = `rotate(0deg)`
    minutePointer.style.transform = `rotate(0deg)`
})
