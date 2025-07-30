const gameContainer = document.getElementById("game-container");
        const backgroundContainer = document.getElementById("background-container");
        const trex = document.getElementById("trex");
        const scoreEl = document.getElementById("score");
        const livesEl = document.getElementById("lives");
        const specialAttackStatusEl = document.getElementById("special-attack-status");
        const startScreen = document.getElementById("start-screen");
        const gameOverScreen = document.getElementById("game-over-screen");
        const startButton = document.getElementById("start-button");
        const restartButton = document.getElementById("restart-button");
        const finalScoreEl = document.getElementById("final-score");

        const backgroundImgUrl = "https://i.pinimg.com/originals/ca/b1/cb/cab1cbe56ab860f94be3355ce3e0ae4b.jpg";
        const trexImgUrl = "https://static.vecteezy.com/system/resources/previews/022/718/763/large_2x/t-rex-dinosaur-isolated-on-transparent-background-ai-generated-png.png";
        const raptorImgUrl = "https://static.vecteezy.com/system/resources/previews/021/107/765/original/3d-velociraptor-dinosaur-isolated-png.png";

        backgroundContainer.style.backgroundImage = `url('${backgroundImgUrl}')`;
        trex.style.backgroundImage = `url('${trexImgUrl}')`;

        let score = 0;
        let lives = 0;
        let gameActive = false;
        let raptors = [];
        let keys = {};
        let gameLoopInterval;
        let chompCounter = 0;
        let specialAttackReady = false;
        let raptorSpawnRate = 0.01;
        let raptorBaseSpeed = 2;

        startButton.addEventListener("click", startGame);
        restartButton.addEventListener("click", startGame);
        window.addEventListener("keydown", (e) => {
        keys[e.code] = true;
        if (e.code === "Enter" && specialAttackReady && gameActive) {
            triggerSpecialAttack();
        }
        });
        window.addEventListener("keyup", (e) => {
        keys[e.code] = false;
        if (e.code === "Space" && gameActive) {
            chomp();
        }
        });

        function startGame() {
            score = 0;
            lives = 3;
            chompCounter = 0;
            raptorSpawnRate = 0.01;
            raptorBaseSpeed = 2;
            specialAttackReady = false;

            scoreEl.textContent = score;
            livesEl.textContent = lives;
            specialAttackStatusEl.style.display = "none";

            raptors.forEach((raptor) => raptor.element.remove());
            raptors = [];

            startScreen.style.display = "none";
            gameOverScreen.style.display = "none";

            trex.style.top = "50%";

            gameActive = true;
            gameLoopInterval = setInterval(gameLoop, 1000 / 60);
        }

        function gameOver() {
            gameActive = false;
            clearInterval(gameLoopInterval);
            finalScoreEl.textContent = score;
            gameOverScreen.style.display = "flex";
        }

        function createRaptor() {
            const element = document.createElement("div");
            element.className = "game-char raptor";
            element.style.backgroundImage = `url('${raptorImgUrl}')`;
            element.style.top = `${Math.random() * (window.innerHeight - 100)}px`;

            gameContainer.appendChild(element);

            raptors.push({
                element: element,
                x: window.innerWidth,
                speed: Math.random() * 2 + raptorBaseSpeed,
            });
        }

        function updatePlayer() {
            const currentTop = trex.offsetTop;
            const speed = 8;

            if (keys["ArrowUp"] && currentTop > 0) {
                trex.style.top = `${currentTop - speed}px`;
            }
            if (
                keys["ArrowDown"] &&
                currentTop < window.innerHeight - trex.offsetHeight
            ) {
                trex.style.top = `${currentTop + speed}px`;
            }
        }

        function updateRaptors() {
            if (Math.random() < raptorSpawnRate && gameActive) {
                createRaptor();
            }

            for (let i = raptors.length - 1; i >= 0; i--) {
                const raptor = raptors[i];
                raptor.x -= raptor.speed;
                raptor.element.style.left = `${raptor.x}px`;

                if (raptor.x < -100 && raptor.speed > 0) {
                    raptor.element.remove();
                    raptors.splice(i, 1);
                    lives--;
                    livesEl.textContent = lives;
                    if (lives <= 0) {
                        gameOver();
                    }
                }

                if (raptor.x > window.innerWidth + 100 && raptor.speed < 0) {
                    raptor.element.remove();
                    raptors.splice(i, 1);
                }
            }
        }

        function chomp() {
            trex.classList.add("chomping");
            setTimeout(() => trex.classList.remove("chomping"), 200);

            const trexRect = trex.getBoundingClientRect();

            for (let i = raptors.length - 1; i >= 0; i--) {
                const raptor = raptors[i];
                const raptorRect = raptor.element.getBoundingClientRect();

                if (isColliding(trexRect, raptorRect) && raptor.speed > 0) {
                    raptor.element.remove();
                    raptors.splice(i, 1);
                    score++;
                    chompCounter++;
                    scoreEl.textContent = score;

                    if (chompCounter % 10 === 0 && chompCounter > 0) {
                        specialAttackReady = true;
                        specialAttackStatusEl.style.display = "block";
                    }
                }
            }
        }

        function triggerSpecialAttack() {
            const roarAudio = new Audio("ytmp3free.cc_jurassic-park-trex-roar-rexy-best-roar-youtubemp3free.org.mp3");
            roarAudio.play().catch((e) => console.error("Audio play failed:", e));

            specialAttackReady = false;
            specialAttackStatusEl.style.display = "none";
            raptors.forEach((raptor) => {
                raptor.speed = -raptor.speed;
                raptor.element.style.transform = "scaleX(-1)";
            });
        }

        function isColliding(rect1, rect2) {
            return !(
                rect1.right < rect2.left ||
                rect1.left > rect2.right ||
                rect1.bottom < rect2.top ||
                rect1.top > rect2.bottom
            );
        }

        function gameLoop() {
            if (!gameActive) return;

            raptorBaseSpeed += 0.001;
            raptorSpawnRate += 0.00001;

            updatePlayer();
            updateRaptors();
        }