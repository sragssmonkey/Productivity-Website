const thumbnails = document.querySelectorAll(".background");
const mainContent = document.querySelector(".main"); // Select a single element

thumbnails.forEach(img => {
    img.addEventListener("click", function () {
        mainContent.style.backgroundImage = `url('${img.src}')`;
        mainContent.style.backgroundSize = "cover";
        mainContent.style.backgroundRepeat = "no-repeat";
        mainContent.style.backgroundPosition = "center";
    });
});

const time= document.querySelector(".clock");
const digiclock = document.getElementById("waqt1");

let clockStarted = false;

time.addEventListener("click",function(){
    if (clockStarted)return;
    clockStarted=true;
    const hours = document.createElement("span");
    const dot = document.createElement("span");
    const minutes = document.createElement("span");
    const dot1 = document.createElement("span");
    const seconds = document.createElement("span");
    dot.textContent=":";
    dot1.textContent=":";

    digiclock.appendChild(hours);
    digiclock.appendChild(dot);
    digiclock.appendChild(minutes);
    digiclock.appendChild(dot1);
    digiclock.appendChild(seconds);
    setInterval(()=>{
    let currentTime= new Date();
    hours.textContent = String(currentTime.getHours()).padStart(2, "0");
    minutes.textContent = String(currentTime.getMinutes()).padStart(2, "0");
    seconds.textContent = String(currentTime.getSeconds()).padStart(2, "0");

},1000);    
});

const input = document.querySelector(".itemAdd"); 
const addButton = document.getElementById("button");
const itemList = document.querySelector(".itemList"); 

addButton.addEventListener("click", () => {
    const taskItem = input.value.trim();
    if (taskItem !== "") {
        const task = document.createElement("li");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const taskText = document.createElement("span");
        taskText.textContent = taskItem;

        const removeButton = document.createElement("i");
        removeButton.setAttribute("class", "fa-solid fa-xmark");
        removeButton.setAttribute("id", "cross");

        
        removeButton.style.cursor = "pointer";

        task.appendChild(checkbox);
        task.appendChild(taskText);
        task.appendChild(removeButton);
        itemList.appendChild(task);

        input.value = "";

        
        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                taskText.style.textDecoration = "line-through";
                taskText.style.opacity = "0.6";
            } else {
                taskText.style.textDecoration = "none";
                taskText.style.opacity = "1";
            }
        });

       
        removeButton.addEventListener("click", () => {
            task.remove();
        });
    }
});

const pomo = document.querySelector(".pomodoro button");
const waqt = document.getElementById("waqt");

pomo.addEventListener("click", function alarm() {
    const longBreakButton = document.createElement("button");
    longBreakButton.textContent = "Long Break";
    longBreakButton.setAttribute("class","case1");

    const shortBreakButton = document.createElement("button");
    shortBreakButton.textContent = "Short Break";
    shortBreakButton.setAttribute("class","case2");

    waqt.innerHTML = ""; 
    waqt.appendChild(longBreakButton);
    waqt.appendChild(shortBreakButton);

    let longPressed = false;
    let shortPressed = false;

    function startTimer(durationInSeconds, label) {
        const minutes = document.createElement("span");
        const dot = document.createElement("span");
        const seconds = document.createElement("span");

        const funct= document.createElement("div");
        funct.setAttribute("class","funct");
        const start = document.createElement("button");
        const stop = document.createElement("button");
        const reset = document.createElement("button");

        dot.textContent = ":";

        start.innerHTML = `<i class="fa-solid fa-play"></i>`;
        stop.innerHTML = `<i class="fa-solid fa-pause"></i>`;
        reset.innerHTML = `<i class="fa-solid fa-rotate-right"></i>`;

        let timeLeft = durationInSeconds;
        let running = false;
        let timer;

        function updateDisplay() {
            minutes.textContent = String(Math.floor(timeLeft / 60)).padStart(2, '0');
            seconds.textContent = String(timeLeft % 60).padStart(2, '0');
        }

        updateDisplay();

        waqt.innerHTML = ""; // Clear buttons and show timer UI
        waqt.appendChild(minutes);
        waqt.appendChild(dot);
        waqt.appendChild(seconds);
        funct.appendChild(start);
        funct.appendChild(stop);
        funct.appendChild(reset);
        waqt.appendChild(funct);

        start.addEventListener("click", () => {
            if (running) return;
            running = true;
            timer = setInterval(() => {
                if (timeLeft > 0) {
                    timeLeft--;
                    updateDisplay();
                } else {
                    clearInterval(timer);
                    running = false;
                    alert(`${label} finished!`);
                }
            }, 1000);
        });

        stop.addEventListener("click", () => {
            clearInterval(timer);
            running = false;
        });

        reset.addEventListener("click", () => {
            clearInterval(timer);
            timeLeft = durationInSeconds;
            running = false;
            updateDisplay();
        });
    }

    longBreakButton.addEventListener("click", () => {
        if (longPressed) return;
        longPressed = true;
        startTimer(1500, "Long break"); 
    });

    shortBreakButton.addEventListener("click", () => {
        if (shortPressed) return;
        shortPressed = true;
        startTimer(300, "Short break"); 
    });
});


document.addEventListener("DOMContentLoaded", function () {
    const notesBtn = document.querySelector(".write");
    const diary = document.querySelector(".diary");

    // Check if both elements exist
    if (!notesBtn || !diary) {
        console.error("Missing elements: .write or .diary not found in the DOM");
        return;
    }

    notesBtn.addEventListener("click", () => {
        notesBtn.style.display = "none";
        const slate = document.createElement("textarea");

        slate.placeholder = "ADD A NOTE";

        const deleteBtn = document.createElement("i");
        deleteBtn.className = "fa-solid fa-trash";

        
        diary.appendChild(slate);
        diary.appendChild(deleteBtn);

        deleteBtn.addEventListener("click", () => {
            slate.remove();
            deleteBtn.remove();
            notesBtn.style.display = "flex";
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const musicButton = document.querySelector(".player");
    const spotify = document.querySelector(".spotify");

    const songs = [
        { name: "Banjara", src: "Banjara.mp3" },
        { name: "Jeena Jeena", src: "JeenaJeena.mp3" },
        { name: "Hamdard", src: "Hamdard.mp3" },
        { name: "Zaroorat", src: "Zaroorat.mp3" },
        { name: "Zamana Lage", src: "Zamana lage.mp3" }
    ];

    let audioPlayer;
    let songListVisible = false;

    musicButton.addEventListener("click", () => {
        spotify.innerHTML = "";
        songListVisible = !songListVisible;

        if (!songListVisible) return;
        musicButton.style.display="none";
        const songList = document.createElement("ul");
        songList.style.listStyle = "none";
        songList.style.padding = "0";

        songs.forEach(song => {
            const listItem = document.createElement("li");
            listItem.textContent = song.name;
            listItem.style.cursor = "pointer";
            listItem.style.marginBottom = "8px";
            listItem.style.color = "#fff";

            listItem.addEventListener("click", () => {
                if (!audioPlayer) {
                    audioPlayer = document.createElement("audio");
                    audioPlayer.controls = true;
                    audioPlayer.style.marginTop = "10px";
                    spotify.appendChild(audioPlayer);
                }
                audioPlayer.src = song.src;
                audioPlayer.play();
            });

            songList.appendChild(listItem);
        });

        spotify.appendChild(songList);
    });
});
