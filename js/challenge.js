let counter = 0;
let likes = {};
let paused = false;
let intervalId = null;

document.addEventListener("DOMContentLoaded", function() {
  intervalId = setInterval(incrementCounter, 1000);
  setupEventListeners();
});

function incrementCounter() {
  if (!paused) {
    counter++;
    document.getElementById("counter").textContent = counter;
  }
}

function setupEventListeners() {
  document.getElementById("plus").addEventListener("click", function() {
    counter++;
    document.getElementById("counter").textContent = counter;
  });

  document.getElementById("minus").addEventListener("click", function() {
    counter--;
    document.getElementById("counter").textContent = counter;
  });

  document.getElementById("heart").addEventListener("click", function() {
    let currentCount = likes[counter] || 0;
    likes[counter] = currentCount + 1;
    let likesList = document.querySelector(".likes");
    let likeItem = document.createElement("li");
    likeItem.textContent = `Likes for ${counter}: ${currentCount + 1}`;
    likesList.appendChild(likeItem);
  });

  document.getElementById("pause").addEventListener("click", function() {
    if (paused) {
      paused = false;
      intervalId = setInterval(incrementCounter, 1000);
      this.textContent = "pause";
      enableButtons();
    } else {
      paused = true;
      clearInterval(intervalId);
      this.textContent = "resume";
      disableButtons();
    }
  });

  document.getElementById("submit").addEventListener("click", function(event) {
    event.preventDefault();
    let commentInput = document.getElementById("comment-input");
    let commentText = commentInput.value;
    let commentsList = document.getElementById("list");
    let commentItem = document.createElement("div");
    commentItem.textContent = commentText;
    commentsList.appendChild(commentItem);
    commentInput.value = "";
  });
}

function disableButtons() {
  let buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    if (buttons[i].id!== "pause") {
      buttons[i].disabled = true;
    }
  }
}

function enableButtons() {
  let buttons = document.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    buttons[i].disabled = false;
  }
}