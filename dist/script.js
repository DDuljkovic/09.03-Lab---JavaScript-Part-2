// This is a simple JavaScript file that adds interactivity to the HTML page
// It defines a function to show an alert when a link is clicked
function sayHello() {
    alert("Hello, world from javascript!");
}

// Function to check if a password is strong
function isStrongPassword(password) {
    // Check for minimum length
    if (password.length < 8) {
        return false;
    }
    // Check that it does not contain the word "password"
    if (password.toLowerCase().includes("password")) {
        return false;
    }
    // Check for at least one uppercase character
    if (!/[A-Z]/.test(password)) {
        return false;
    }
    return true;
}

// Example calls (you can test these in the console)
console.log(isStrongPassword("Qwerty"));         // false - Too short
console.log(isStrongPassword("passwordQwerty")); // false - Contains "password"
console.log(isStrongPassword("qwerty123"));      // false - No uppercase characters
console.log(isStrongPassword("Qwerty123"));      // true

// Ensure the DOM is fully loaded before attaching event listeners
document.addEventListener("DOMContentLoaded", function() {
    const link = document.getElementById("hello-link");
    if (!link) {
        console.error("Link with ID 'hello-link' not found.");
        return;
    }
    link.addEventListener("click", function(event) {
        event.preventDefault(); // Prevent the default link behavior
        sayHello();
    });
});

async function getRandomJoke() {
    return fetch('https://icanhazdadjoke.com/', {
        headers: { 'Accept': 'text/plain' }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .catch(error => {
        console.error('There was a problem fetching the joke:', error);
        return "Failed to fetch a joke. Please try again later.";
    });
}

document.addEventListener("DOMContentLoaded", function() {
    const jokeButton = document.getElementById("joke-button");
    if (!jokeButton) {
        console.error("Button with ID 'joke-button' not found.");
        return;
    }
    jokeButton.addEventListener("click", async function() {
        const jokeDisplay = document.getElementById("joke-display");
        if (!jokeDisplay) {
            console.error("Element with ID 'joke-display' not found.");
            return;
        }
        jokeDisplay.textContent = "Loading joke...";
        const joke = await getRandomJoke();
        jokeDisplay.textContent = joke;
    });
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("login-form");
  if (!form) return;

  const pwInput = document.getElementById("password");
  const msg = document.getElementById("pw-msg");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const pwd = pwInput.value || "";
    if (isStrongPassword(pwd)) {
      msg.textContent = "Password strength looks good. (Demo login)";
      msg.className = "pw-msg ok";
      // Demo: pretend to log in
      setTimeout(() => alert("Logged in (demo)"), 50);
    } else {
      msg.textContent =
        'Password must be 8+ chars, include an uppercase letter, and not contain "password".';
      msg.className = "pw-msg error";
    }
  });
});

// Helper function to check password strength and alert user
function checkPasswordStrengthFromInput() {
    const pwInput = document.getElementById("password");
    if (!pwInput) {
        alert("Password field not found.");
        return;
    }

    const password = pwInput.value.trim();
    if (password === "") {
        alert("Please enter a password first.");
        return;
    }

    if (isStrongPassword(password)) {
        alert("Password is strong");
    } else {
        alert("Password is weak");
    }
}

// Attach to button
document.addEventListener("DOMContentLoaded", function() {
    const checkButton = document.getElementById("check-password-button");
    if (checkButton) {
        checkButton.addEventListener("click", checkPasswordStrengthFromInput);
    }
});
