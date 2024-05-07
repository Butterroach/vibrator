const statustext = document.getElementById("status");
const intensity = document.getElementById("intensity");
const mobilemode = document.getElementById("mobile");
let firefox = typeof navigator.userAgentData === "undefined"; // ! FIREFOX MIGHT ADD THIS IN THE FUTURE
if (firefox) {
    statustext.textContent = "firefox isnt compatible with the vibrator :(";
}

async function vibrate(gamepad, intensity) {
    return await gamepad.vibrationActuator.playEffect("dual-rumble", {
        startDelay: 0,
        duration: 1.0,
        weakMagnitude: intensity,
        strongMagnitude: intensity,
    });
}

async function wait(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

window.addEventListener("gamepadconnected", async function (event) {
    const gamepad = event.gamepad;
    const selectedGamepadIndex = gamepad.index;
    const selectedGamepad = navigator.getGamepads()[selectedGamepadIndex];
    if ("vibrationActuator" in selectedGamepad) {
        statustext.textContent = "enjoy the vibrator! >///<";
        while (true) {
            console.log("ran");
            vibrate(selectedGamepad, intensity.value / 100);
            await wait(
                (mobilemode.checked ? 50 : 10) /
                    ((intensity.value ? intensity.value : 1) / 50)
            );
        }
    } else {
        statustext.textContent =
            "your gamepad isn't compatible with the vibrator :(";
    }
});

window.addEventListener("gamepaddisconnected", (event) => {
    statustext.textContent =
        "gamepad was disconnected! :( connect a gamepad then press any button on it";
});
