document.addEventListener('DOMContentLoaded', function() {
    // Attempt to play the birthday song after a user interaction
    const birthdaySong = document.getElementById('birthday-song');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const volumeSlider = document.getElementById('volume-slider');
    
    
   // Function to toggle play/pause
    function togglePlayPause() {
        if (birthdaySong.paused) {
            birthdaySong.play();
            playPauseBtn.src = 'pause.png'; // Set this to your pause button image path
            playPauseBtn.alt = 'Pause';
        } else {
            birthdaySong.pause();
            playPauseBtn.src = 'play.png'; // Set this to your play button image path
            playPauseBtn.alt = 'Play';
        }
    }

    // Function to adjust the volume
    function adjustVolume() {
        birthdaySong.volume = volumeSlider.value;
    }

    // Event listener for the play/pause button
    playPauseBtn.addEventListener('click', togglePlayPause);

    // Event listener for the volume slider
    volumeSlider.addEventListener('input', adjustVolume);

    // Try to play music automatically
    birthdaySong.play().catch(function(error) {
        console.log("Audio play failed, user interaction required.");
        // Set to the play button if autoplay fails
        playPauseBtn.src = 'play.png';
        playPauseBtn.alt = 'Play';
    });

    // Set the initial volume
    birthdaySong.volume = volumeSlider.value;

    
    const balloonContainer = document.getElementById('balloon-container');
    const happyBirthdayMessage = "HAPPY BIRTHDAY";
    const moonMessage = "LUKE";
    const colors = ['#FFC0CB', '#89CFF0', '#FAFAD2', '#E6E6FA', '#FFD700'];

    // Create "Happy Birthday" balloons
    createBalloons(happyBirthdayMessage, balloonContainer, 'balloon');
    
    // Create "Moon" balloons with slight adjustments
    createBalloons(moonMessage, balloonContainer, 'moon-balloon', true);

    // Function to lighten or darken a color
    function adjustColor(color, amount) {
        let usePound = false;
        if (color[0] === "#") {
            color = color.slice(1);
            usePound = true;
        }
        const num = parseInt(color, 16);
        let r = (num >> 16) + amount;
        if (r > 255) r = 255;
        else if (r < 0) r = 0;

        let b = ((num >> 8) & 0x00FF) + amount;
        if (b > 255) b = 255;
        else if (b < 0) b = 0;

        let g = (num & 0x0000FF) + amount;
        if (g > 255) g = 255;
        else if (g < 0) g = 0;

        return (usePound ? "#" : "") + (g | (b << 8) | (r << 16)).toString(16);
    }

    // Adjusted createBalloons function with gradient backgrounds
    function createBalloons(message, container, className, isMoon = false) {
        for (let i = 0; i < message.length; i++) {
            let balloon = document.createElement('div');
            balloon.className = className;
            balloon.innerText = message[i];
            balloon.style.left = `${5 + (i * (100 / message.length))}%`; // Space out balloons

            const color = colors[i % colors.length];
            const gradientStart = adjustColor(color, 40); // Lighten color
            const gradientEnd = adjustColor(color, -40); // Darken color
            balloon.style.backgroundImage = `radial-gradient(circle at 50% 50%, ${gradientStart}, ${gradientEnd})`;

            if (isMoon) {
                balloon.style.bottom = '-250px'; // Start lower than "Happy Birthday" balloons
            } else {
                balloon.style.bottom = '-100px'; // Default starting position
            }
            container.appendChild(balloon);
        }
    }

    // Generate candles and append them to the candles-container
    const candlesContainer = document.getElementById('candles-container');
    let flamesExtinguished = 0; // Counter to keep track of extinguished flames

    for (let i = 0; i < 20; i++) {
        let candle = document.createElement('div');
        candle.className = 'candle';

        // Create the flame div as a child of the candle
        let flame = document.createElement('div');
        flame.className = 'flame';
        candle.appendChild(flame); // Add flame to candle

        // Only hide the flame when the candle is clicked and check if all are out
        flame.onclick = function() {
            this.style.opacity = '0'; // Only the flame goes out, not the entire candle
            flamesExtinguished++; // Increment the counter for extinguished flames
            
            // Check if all flames are extinguished
            if (flamesExtinguished === 20) {
                // Redirect to another link
                window.location.href = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'; // Replace 'https://example.com' with your desired URL
            }
        };

        candlesContainer.appendChild(candle);
    }

    // Delay display of the modal
    setTimeout(function() {
        const modal = document.getElementById('modal');
        modal.style.display = "block";
    }, 8500); // Adjust time to match the balloon animation duration

    // Close modal functionality
    document.getElementById('closeModal').onclick = function() {
        const modal = document.getElementById('modal');
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        const modal = document.getElementById('modal');
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    const sprinkleCount = 200; // Number of sprinkles to add
    const scolors = ['#FFC0CB', '#89CFF0', '#FAFAD2', '#E6E6FA', '#FFD700']; // Pastel colors

    for (let i = 0; i < sprinkleCount; i++) {
        const sprinkle = document.createElement('div');
        sprinkle.className = 'sprinkle';
        sprinkle.style.backgroundColor = scolors[Math.floor(Math.random() * colors.length)];
        sprinkle.style.left = `${Math.random() * 100}%`;
        sprinkle.style.top = `${Math.random() * 100}%`;
        sprinkle.style.transform = `rotate(${Math.random() * 360}deg)`;

        document.body.appendChild(sprinkle); // Append to body or a specific container
    }
});
