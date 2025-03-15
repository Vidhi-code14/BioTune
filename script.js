function showMessage() {
    alert("Welcome to BioTune! Let's start your wellness journey.");
}

let steps = 8500;
function updatesteps() {
    steps += Math.floor(Math.random() * 10);
    document.getElementById("steps").innerText = steps;
}
setInterval(updatesteps, 3000); //Every 3 seconds update steps count

const workouts = [
    { name: "Push-ups", sets: "3 sets of 15 reps" },
    { name: "Jumping Jacks", sets: "3 sets of 30 reps" },
    { name: "Burpees", sets: "3 sets of 10 reps" },
];
function updateWorkout() {
    let workoutDivs = Document.querySelectorAll(".exercise");
    workouts.forEach((workout, index) => {
        if (workoutDivs[index]) {
            workoutDivs[index].innerHTML = `<h3>${workout.name}</h3><p>$(workout.sets</p>`
        }
    });
}
setInterval(updateWorkout, 5000);//workout plan updates every 5 seconds

let users = [];
/*signup function*/
document.getElementById("signup-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("signup-email").value;
    let password = document.getElementById("signup-password").value;
    let user = { name, email, password };
    users.push(user);
    localStorage.setItem("users", JSON.stringyfy(users));
    alert("Signup Successful! Please Login.");
    window.location.href = "login.html";
});

//Login Function
document.getElementById("login-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let storedUsers = JSON.parse(localStorage, getItem("users")) || [];
    let validUser = storedUsers.find(user => user.email === email && user.password === password);
    if (validUser) {
        localStorage.setItem("loggedInUser", JSON.stringify(validUser));
        alert("Login Successful!");
        window.location.href = "dashboard.html";
    }
    else {
        alert("Invalid Email or Password.");
    }
});

//Profile Page Data
window.onload = function () {
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    if (user) {
        document.getElementById("user-name").innerText = user.name;
        document.getElementById("user-email").innerText = user.email;
    }
};

//Logout Function
function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged Out Successfully!");
    window.location.href = "login.html";
}
//reset password
document.getElementById("reset-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
    let email = document.getElementById("reset-email").value;
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];
    let user = storedUsers.find(user => user.email === email);

    if (user) {
        let newPassword = prompt("Enter a new password:");
        user.password = newPassword;
        localStorage.setItem("users", JSON.stringify(storedUsers));
        alert("Password Reset Successful! Please login with your new password.");
        window.location.href = "login.html";
    } else {
        alert("Email not found! Please enter a registered email.");
    }
});

//profile update
document.getElementById("edit-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
    let user = JSON.parse(localStorage.getItem("loggedInUser"));
    let storedUsers = JSON.parse(localStorage.getItem("users")) || [];

    user.name = document.getElementById("edit-name").value;
    user.age = document.getElementById("edit-age").value;
    user.weight = document.getElementById("edit-weight").value;

    let userIndex = storedUsers.findIndex(u => u.email === user.email);
    if (userIndex !== -1) {
        storedUsers[userIndex] = user;
        localStorage.setItem("users", JSON.stringify(storedUsers));
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        alert("Profile Updated Successfully!");
        window.location.href = "profile.html";
    }
});
//goal tracking 
document.getElementById("goal-form")?.addEventListener("submit", function (event) {
    event.preventDefault();
    let goal = document.getElementById("goal").value;
    localStorage.setItem("userGoal", goal);
    document.getElementById("saved-goal").innerText = goal;
    alert("Goal Saved Successfully!");
});
window.onload = function () {
    let savedGoal = localStorage.getItem("userGoal");
    if (savedGoal) {
        document.getElementById("saved-goal").innerText = savedGoal;
    }
};
function clearGoal() {
    localStorage.removeItem("userGoal");
    document.getElementById("saved-goal").innerText = "No goal set yet";
}
//reset password
document.addEventListener("DOMContentLoaded", function () {
    let resetForm = document.getElementById("reset-form");
    if (resetForm) {
        resetForm.addEventListener("submit", function (event) {
            event.preventDefault();
            let email = document.getElementById("reset-email").value;
            let message = document.getElementById("message");
            if (email === "test@example.com") {
                message.style.color = "green";
                message.innerText = "Reset link sent to your email.";
            }
            else {
                message.style.color = "red";
                message.innerText = "Email not registered!";
            }
        });
    }
    else {
        console.error("Error:Form not found in the DOM.");
    }
});
//Profile Edit
document.addEventListener("DOMContentLoaded", function () {
    let profileForm = document.getElementById("profile-form");
    let message = document.getElementById("message");

    // Load saved profile data from LocalStorage
    let userProfile = JSON.parse(localStorage.getItem("userProfile")) || {
        name: "",
        email: "test@example.com", // Default email (can be fetched from auth system)
        weight: "",
        age: "",
        goal: ""
    };

    // Pre-fill the form with saved data
    document.getElementById("name").value = userProfile.name;
    document.getElementById("email").value = userProfile.email;
    document.getElementById("weight").value = userProfile.weight;
    document.getElementById("age").value = userProfile.age;
    document.getElementById("goal").value = userProfile.goal;

    // Save profile on form submit
    profileForm.addEventListener("submit", function (event) {
        event.preventDefault();

        let updatedProfile = {
            name: document.getElementById("name").value,
            email: userProfile.email, // Email not editable
            weight: document.getElementById("weight").value,
            age: document.getElementById("age").value,
            goal: document.getElementById("goal").value
        };

        // Save data to LocalStorage
        localStorage.setItem("userProfile", JSON.stringify(updatedProfile));

        message.style.color = "green";
        message.innerText = "Profile updated successfully!";
    });
});
//goal tracking system implementation
document.addEventListener("DOMContentLoaded", function () {
    let goalForm = document.getElementById("goal-form");
    let progressBar = document.getElementById("progress");
    let goalMessage = document.getElementById("goal-message");

    // Load saved goal data
    let goalData = JSON.parse(localStorage.getItem("goalData")) || {
        goalWeight: "",
        currentWeight: ""
    };

    // Pre-fill input fields if data exists
    document.getElementById("goal-weight").value = goalData.goalWeight;
    document.getElementById("current-weight").value = goalData.currentWeight;

    // Function to update progress bar
    function updateProgress() {
        let goalWeight = parseFloat(goalData.goalWeight);
        let currentWeight = parseFloat(goalData.currentWeight);

        if (!isNaN(goalWeight) && !isNaN(currentWeight) && currentWeight > goalWeight) {
            let progress = ((currentWeight - goalWeight) / currentWeight) * 100;
            progressBar.style.width = progress + "%";
            progressBar.innerText = Math.round(progress) + "%";

            if (progress >= 100) {
                goalMessage.style.color = "green";
                goalMessage.innerText = "🎉 Goal Achieved! Keep Going!";
            } else {
                goalMessage.innerText = "Keep pushing! You're on track!";
            }
        }
    }

    // Save goal data on form submit
    goalForm.addEventListener("submit", function (event) {
        event.preventDefault();

        goalData = {
            goalWeight: document.getElementById("goal-weight").value,
            currentWeight: document.getElementById("current-weight").value
        };

        localStorage.setItem("goalData", JSON.stringify(goalData));

        updateProgress();
    });

    // Initial progress update
    updateProgress();
});
//workout page improvement
document.addEventListener("DOMContentLoaded", function () {
    let categorySelect = document.getElementById("category");
    let workoutContainer = document.getElementById("workout-container");

    let workouts = {
        beginner: [
            { name: "Jumping Jacks", video: "jumping-jacks gif.mp4" },
            { name: "Push-ups", video: "push-ups gif.mp4" }
        ],
        intermediate: [
            { name: "Burpees", video: "Burpees gif.mp4" },
            { name: "Squats", video: "Squats gif.mp4" }
        ],
        advanced: [
            { name: "Plank", video: "Plank gif.mp4" },
            { name: "Mountain Climbers", video: "Mountain Climbers gif.mp4" }
        ]
    };

    function loadWorkouts(level) {
        workoutContainer.innerHTML = "";
        workouts[level].forEach(exercise => {
            let div = document.createElement("div");
            div.innerHTML = `<h4>${exercise.name}</h4><video width="200" autoplay loop muted>
            <source src="${exercise.video}"type="video/mp4">Your browser does not support the video tag.</video>`;
            workoutContainer.appendChild(div);
        });
    }

    categorySelect.addEventListener("change", function () {
        loadWorkouts(this.value);
    });

    // Load default workouts
    loadWorkouts(categorySelect.value);

    // Timer Logic
    let timerDisplay = document.getElementById("timer");
    let startButton = document.getElementById("start-timer");
    let resetButton = document.getElementById("reset-timer");

    let seconds = 0, interval;

    function updateTimer() {
        let mins = Math.floor(seconds / 60);
        let secs = seconds % 60;
        timerDisplay.textContent = `${mins < 10 ? "0" : ""}${mins}:${secs < 10 ? "0" : ""}${secs}`;
    }

    startButton.addEventListener("click", function () {
        clearInterval(interval);
        interval = setInterval(() => {
            seconds++;
            updateTimer();
        }, 1000);
    });

    resetButton.addEventListener("click", function () {
        clearInterval(interval);
        seconds = 0;
        updateTimer();
    });

    updateTimer();
});
//calories calculator
document.addEventListener("DOMContentLoaded", function () {
    let totalCalories = 0;
    let calorieElements = document.querySelectorAll(".meal-card span");

    calorieElements.forEach(el => {
        totalCalories += parseInt(el.innerText);
    });

    let totalCaloriesDisplay = document.createElement("p");
    totalCaloriesDisplay.innerHTML = `<strong>Total Calories: ${totalCalories} kcal</strong>`;
    totalCaloriesDisplay.style.fontSize = "18px";
    totalCaloriesDisplay.style.marginTop = "20px";

    document.querySelector(".nutrition-container").appendChild(totalCaloriesDisplay);
});

// // Calories Progress Chart
// const ctx = document.getElementById("caloriesChart").getContext("2d");

// const caloriesChart = new Chart(ctx, {
//     type: "line",  // Line chart for progress tracking
//     data: {
//         labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
//         datasets: [{
//             label: "Calories Intake",
//             data: [1800, 1900, 1750, 2000, 1850, 1950, 1800], // Example data
//             borderColor: "blue",
//             borderWidth: 2,
//             fill: false
//         }]
//     },
//     options: {
//         responsive: true,
//         plugins: {
//             legend: { display: true }
//         }
//     }
// });
// //Theme customization
// const themeToggle = document.getElementById("theme-toggle");
// const body = document.body;

// // Check for saved theme in localStorage
// if (localStorage.getItem("theme") === "dark") {
//     body.classList.add("dark-mode");
// }

// themeToggle.addEventListener("click", () => {
//     body.classList.toggle("dark-mode");

//     // Save preference in localStorage
//     if (body.classList.contains("dark-mode")) {
//         localStorage.setItem("theme", "dark");
//     } else {
//         localStorage.setItem("theme", "light");
//     }
// });