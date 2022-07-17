const getNumbers = document.querySelectorAll('.styleNumber')
const getBody = document.querySelector('#body')
const startButton = document.querySelector('#start')
const resetButton = document.querySelector('#reset')
const getSeconds = document.querySelector('.seconds')
const getMinutes = document.querySelector('.minutes')
const getHours = document.querySelector('.hours')
const timelaps = document.querySelector('#timelaps')
const app = document.querySelector('#app')

let
    interval,
    seccount, mincount, hourcount,
    allNumbers, toSeconds, lineSecond

let started = false

getBody.addEventListener("click", function () {
    getBody.classList.add('border-[#5EA6EB]')
});

changeInput()

resetButton.addEventListener("click", resetCountDown);
startButton.addEventListener("click", startStop);
getNumbers.forEach(number => {
    number.addEventListener("change", changeInput);
});


function startStop() {
    if (!started) {

        timelaps.style.animationDuration = `${toSeconds}s`;
        // timelaps.classList.add('timelaps')
        countDown()
        started = true

    } else {
        stopCountDown()
        started = false
    }
}

function stopCountDown() {
    startButton.innerHTML = 'START'
    getNumbers.forEach(number => {
        number.removeAttribute('disabled', '')
    });
    clearInterval(interval)


}

function resetCountDown() {
    getSeconds.value = ''
    getMinutes.value = ''
    getHours.value = ''
    startButton.innerHTML = 'START'
    getNumbers.forEach(number => {
        number.removeAttribute('disabled', '')
    });
    clearInterval(interval)
    started = false

}

function countDown() {
    let lineW = app.getBoundingClientRect().width
    let l = lineW / lineSecond
    let a = 0
    if (toSeconds >= 1) {
        getNumbers.forEach(number => {
            number.setAttribute('disabled', '')
        });
        startButton.innerHTML = 'STOP'

        interval = setInterval(() => {
            toSeconds--
            if (toSeconds < 0) { 
                timelaps.classList.remove('timelaps');
                a = 0; 
                timelaps.style.width = `${a}px` 
                resetCountDown(); 
               
                }
            else {
                a += l
                timelaps.style.width = `${a}px`
                seccount = toSeconds % 60
                mincount = Math.floor(toSeconds / 60) % 60
                hourcount = Math.floor((toSeconds / 60) / 60)

                getSeconds.value = seccount.toString().padStart(2, 0)
                getMinutes.value = mincount.toString().padStart(2, 0)
                getHours.value = hourcount.toString().padStart(2, 0)
            }
        }, 1000);
    } else {
        getSeconds.value = ''

        clearInterval(interval)
    }

}





function changeInput() {
    allNumbers = []
    getNumbers.forEach(number => {
        let subNumber = number.value.toString()

        if (subNumber.length > 2) {
            alert('Invalid Entry \n\n\nPlace only two digits \n\n max number: 99')
            number.value = ''
        }
        allNumbers.push(number.value)
    });

    toSeconds = allNumbers[0] * 3600 + allNumbers[1] * 60 + allNumbers[2] * 1
    lineSecond = allNumbers[0] * 3600 + allNumbers[1] * 60 + allNumbers[2] * 1


}