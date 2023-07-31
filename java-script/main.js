const configuration = {
    isRunning: true,
    inReverse: false,
    trafficPausedIndex: 2,
    currentLight: 0,
    trafficLightInterval: 2000,
    pausedLightInterval: 1000,
    runningInterval: undefined,
    availableLight: [{image:'/assets/red.svg', delay:5000}, {image:'/assets/red-yellow.svg', delay:2000},{ image:'/assets/yellow.svg', delay:1000},{ image:'/assets/green.svg', delay:5000}, {image:'/assets/idle.svg', delay:1000}],
    elementId: 'traffic-light',
    buttonId: 'traffic-light-switch',
    switchOn:'/assets/switch-on.svg',
    switchOff:'/assets/switch-off.svg'
}

const sleepFor = (delay) => new Promise((resolve) => setTimeout(resolve, delay))

function start_stop() {
    getTrafficLight().src = configuration.availableLight[2];
    setButtonTitle();
    configuration.isRunning = !configuration.isRunning;
    if (configuration.isRunning) {
        drawLight();
    } else {
        drawLightWhenPaused();
    }

}

async function drawLightWhenPaused() {
    configuration.trafficPausedIndex = 2;
    while (!configuration.isRunning) {
        getTrafficLight().src = configuration.availableLight[configuration.trafficPausedIndex].image;
        await sleepFor(configuration.availableLight[configuration.trafficPausedIndex].delay);  
        configuration.trafficPausedIndex = configuration.trafficPausedIndex == 2 ? configuration.availableLight.length - 1 : 2;
       
    }
}

function isReversing(currentLightIndex) {
    if (currentLightIndex == 3) {
        configuration.inReverse = true;
    }
    if (currentLightIndex == 0) {
        configuration.inReverse = false;
    }
}

function setNextLightIndex() {
    if (!configuration.inReverse) {
        if (configuration.currentLight == 1) {
            configuration.currentLight++;
        }
        configuration.currentLight++;
    } else {
        if (configuration.currentLight == 2) {
            configuration.currentLight--;
        }
        configuration.currentLight--;
    }
}

async function drawLight() {
    configuration.currentLight = 0;
    while (configuration.isRunning) {
        isReversing(configuration.currentLight);
        getTrafficLight().src = configuration.availableLight[configuration.currentLight].image;
        await sleepFor( configuration.availableLight[configuration.currentLight].delay); 
        setNextLightIndex();          
    }
}

function getTrafficLight() {
    return document.getElementById(configuration.elementId);
}

function setButtonTitle() {
    document.getElementById(configuration.buttonId).src = !configuration.isRunning ? configuration.switchOff : configuration.switchOn;
}