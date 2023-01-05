const refs = {
    btnStart: document.querySelector('[data-start]'),
    btnStop: document.querySelector('[data-stop]'),
}

let  idInterval = null;


const onChangeColor = (e) => {
            onBtnDisabled()
            idInterval = setInterval(() => {
                const color = getRandomHexColor();
                document.body.style.background = `${color}`;
            }, 1000)
        
    }

const onStopChangeColor = (e) => {
            clearInterval(idInterval);
            onBtnDisabled()
    }

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

refs.btnStart.addEventListener('click', onChangeColor);
refs.btnStop.addEventListener('click', onStopChangeColor);

function onBtnDisabled () {
    if (!refs.btnStart.disabled) {
        refs.btnStart.disabled = true;
        refs.btnStop.disabled = false
    } else {
        refs.btnStart.disabled = false;
        refs.btnStop.disabled = true
    }
}