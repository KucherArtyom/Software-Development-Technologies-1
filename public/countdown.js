document.addEventListener('DOMContentLoaded', function() {
    const timeElement = document.querySelector('.quiz-info span:nth-child(2)');
    let secondsLeft = 60;
    let correctButton = null;
    let selectedAnswer = null;
    let timerRunning = true;

    function updateTime() {
        if (!timerRunning) return;

        const minutes = Math.floor(secondsLeft / 60);
        const remainingSeconds = secondsLeft % 60;
        
        const formattedTime = `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
        
        timeElement.textContent = `⏱️ ${formattedTime}`;
        
        secondsLeft--;
        
        if (secondsLeft < 0) {
            clearInterval(intervalId);
            timeElement.textContent = '⏱️ 00:00';
            showCorrectAnswer();
        }
    }

    const intervalId = setInterval(updateTime, 1000);

    function highlightCorrectAnswer() {
        correctButton.classList.add('correct');
    }

    function styleSelectedButton(button) {
        button.classList.add('selected');
    }

    function lockAllAnswers() {
        const optionButtons = document.querySelectorAll('.quiz-options button');
        optionButtons.forEach(btn => {
            btn.disabled = true;
            btn.classList.add('locked');
        });
    }

    function showCorrectAnswer() {
        highlightCorrectAnswer();
        lockAllAnswers();
        unlockNextButton();
    }

    function unlockNextButton() {
        const nextButton = document.querySelector('.quiz-navigation button:last-child');
        nextButton.disabled = false;
        nextButton.classList.remove('locked');
    }

    function stopTimer() {
        timerRunning = false;
        clearInterval(intervalId);
    }

    const optionButtons = document.querySelectorAll('.quiz-options button');

    correctButton = optionButtons[1]; 

    optionButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();

            if (selectedAnswer !== null || !timerRunning) return;

            styleSelectedButton(this);

            selectedAnswer = index;

            stopTimer();

            if (index === 1) {
                highlightCorrectAnswer();
            } else {
                showCorrectAnswer();
            }

            lockAllAnswers();

            unlockNextButton();
        });
    });

    const nextButton = document.querySelector('.quiz-navigation button:last-child');
    nextButton.disabled = true;
    nextButton.classList.add('locked');
});
    