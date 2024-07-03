document.addEventListener('DOMContentLoaded', (event) => {
    const inputValue = document.getElementById("user-input");
    const clickSound = document.getElementById("click-sound");
    const deleteClearSound = document.getElementById("delete-clear-sound");

    function playSound(sound) {
        sound.currentTime = 0; // Rewind to the start
        sound.play();
    }
    
    // Handle number and dot button clicks
    document.querySelectorAll(".numbers").forEach(function (item) {
        item.addEventListener("click", function (e) {
            playSound(clickSound);
            if (inputValue.innerText === "0" || inputValue.innerText === "NaN") {
                inputValue.innerText = "";
            }
            inputValue.innerText += e.target.innerHTML.trim();
        });
    });

    // Handle operation button clicks
    document.querySelectorAll(".operations").forEach(function (item) {
        item.addEventListener("click", function (e) {
            const operation = e.target.innerHTML.trim();
            let lastChar = inputValue.innerText[inputValue.innerText.length - 1];

            // Play appropriate sound for AC and DEL buttons
            if (operation === "AC" || operation === "DEL") {
                playSound(deleteClearSound);
            } else {
                playSound(clickSound);
            }

            // Handle the 'AC' (All Clear) button
            if (operation === "AC") {
                inputValue.innerText = "0";
                return;
            }

            // Handle the 'DEL' (Delete) button
            if (operation === "DEL") {
                if (inputValue.innerText.length > 1) {
                    inputValue.innerText = inputValue.innerText.slice(0, -1);
                } else {
                    inputValue.innerText = "0";
                }
                return;
            }

            // Handle the '=' (Equals) button
            if (operation === "=") {
                try {
                    inputValue.innerText = eval(inputValue.innerText);
                } catch {
                    inputValue.innerText = "NaN";
                }
                return;
            }

            // Handle other operations (+, -, *, /, %)
            if (!isNaN(lastChar) || lastChar === ".") {
                inputValue.innerText += operation;
            }
        });
    });
});
