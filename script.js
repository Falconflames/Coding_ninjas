// Preload and configure the alarm sound
const alarmSound = new Audio('alarm.wav'); // Load the alarm sound file
alarmSound.loop = true; // Enable looping so the alarm sound repeats until stopped

// Wait for the HTML document to be fully loaded before running the enclosed functions
document.addEventListener('DOMContentLoaded', function() {
    populateTimeOptions(); // Populate the time selection dropdowns
    updateTime(); // Display the current time
    // Adding event listeners to buttons for setting and stopping alarms
    document.getElementById('button1').addEventListener('click', setAlarm);
    document.getElementById('button2').addEventListener('click', stopAlarms); // Corrected to match function name
});

// Function to update the current time display every second
function updateTime() {
    const displayTime = new Date(); // Get the current time
    let hours = displayTime.getHours(); // Extract hours
    let minutes = displayTime.getMinutes(); // Extract minutes
    let seconds = displayTime.getSeconds(); // Extract seconds
    const amPm = hours >= 12 ? 'PM' : 'AM'; // Determine AM or PM

    // Convert hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12; // Midnight or noon correction

    // Ensure two-digit formatting for hours, minutes, and seconds
    hours = hours < 10 ? "0" + hours : hours;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    // Compose the current time string and display it
    const currentTime = `${hours}:${minutes}:${seconds} ${amPm}`;
    document.getElementById("clock-display").innerText = currentTime;
}

// Updates the time display every second
setInterval(updateTime, 1000);

// Function to handle alarm ringing
function alarmRinging(currentTime) {
    console.log("Alarm ringing for:", currentTime); // Log the alarm time
    alarmSound.play(); // Play the alarm sound
}

function populateTimeOptions() {
    const hours = document.getElementById('hours'); // Getting elements from DOM
    const minutes = document.getElementById('minutes'); // Getting elements from DOM
    const seconds = document.getElementById('seconds'); // Getting elements from DOM
  
    for (let i = 1; i <= 12; i++) {
      hours.innerHTML += `<option value="${i}">${i}</option>`; // Populating hours  
    }
    for (let i = 0; i < 60; i++) {
      minutes.innerHTML += `<option value="${i}">${i < 10 ? '0' + i : i}</option>`; // Populating minutess
      seconds.innerHTML += `<option value="${i}">${i < 10 ? '0' + i : i}</option>`; // Populating seconds
    }
  }

  let alarms = [];

function setAlarm() {
  const hourValue = document.getElementById('hours').value.padStart(2, '0'); // Getting value of hours in two digits
  const minuteValue = document.getElementById('minutes').value.padStart(2, '0'); // Getting value of minutes in two digits
  const secondValue = document.getElementById('seconds').value.padStart(2, '0'); // Getting value of seconds in two digits
  const amPmValue = document.getElementById('am/pm').value.padStart(2, '0'); // Getting value of am/pm
  
  const alarmTime = `${hourValue}:${minuteValue}:${secondValue} ${amPmValue}`;  // Alarm time at which alarm will set
  if (!alarms.includes(alarmTime)) {
    alarms.push(alarmTime); // Adding alarm to alarms array
    displayAlarms(); // Displaying alarm array after adding a alarm
  }
}

function displayAlarms() {
  const alarmsList = document.getElementById('alarms');
  alarmsList.innerHTML = ''; // Clears existing alarms display
  alarms.forEach((alarm, index) => {
    const alarmElement = document.createElement('li'); // Adding setted alarm to a list 
    alarmElement.textContent = alarm;
    const removeButton = document.createElement('button'); // Adding Button for every list item 
    removeButton.textContent = 'Remove';
    removeButton.onclick = function() { removeAlarm(index); }; // Removing alarm from the index which user wants to remove
    alarmElement.appendChild(removeButton); // Displaying the remove button
    alarmsList.appendChild(alarmElement); // Displaying the alarm element
  });
}

function removeAlarm(index) {
  alarms.splice(index, 1); // Remove the alarm at the specified index
  displayAlarms(); // Refresh the alarms display
}

// function to stop alarms
function stopAlarms() {
    alarmSound.pause(); // To stop the sound
    alarmSound.currentTime = 0; // Reset sound to start
    displayAlarms();
}

// Continuously checking for alarm
setInterval(() => {
  const currentTime = document.getElementById("clock-display").innerText;
  if (alarms.includes(currentTime)) {
    alarmRinging(currentTime); // Calling the ringing function
  }
}, 1000);