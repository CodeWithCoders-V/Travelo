document.addEventListener("DOMContentLoaded", function () {
    const wishlist = document.getElementById("wishlist");

    function createConfetti(x, y) {
        for (let i = 0; i < 20; i++) {
            let confetti = document.createElement("div");
            confetti.classList.add("confetti");
            document.body.appendChild(confetti);

            let randomX = x + Math.random() * 50 - 25;
            let randomY = y + Math.random() * 50 - 25;
            let randomSize = Math.random() * 10 + 5;
            let randomRotate = Math.random() * 360;

            confetti.style.left = `${randomX}px`;
            confetti.style.top = `${randomY}px`;
            confetti.style.width = `${randomSize}px`;
            confetti.style.height = `${randomSize}px`;
            confetti.style.transform = `rotate(${randomRotate}deg)`;

            setTimeout(() => confetti.remove(), 1000);
        }
    }

    function removeScrollIfNeeded() {
        if (wishlist.children.length === 0) {
            wishlist.style.overflowY = "hidden"; // Hide scrollbar when empty
        } else {
            wishlist.style.overflowY = "auto"; // Enable if needed
        }
    }

    function addEventListeners() {
        // Delegate event listener for delete buttons
        wishlist.addEventListener("click", function (event) {
            if (event.target && event.target.classList.contains("delete-btn")) {
                let listItem = event.target.parentElement;
                let wishText = listItem.querySelector(".wish-text").textContent;

                let confirmDelete = confirm(`Are you sure you want to delete "${wishText}"?`);
                
                if (confirmDelete) {
                    listItem.remove();
                    removeScrollIfNeeded();
                }
            }
        });

        // Delegate event listener for edit buttons
        wishlist.addEventListener("click", function (event) {
            if (event.target && event.target.classList.contains("edit-btn")) {
                let textElement = event.target.previousElementSibling;
                textElement.focus();
            }
        });

        // Delegate event listener for checkboxes
        wishlist.addEventListener("change", function (event) {
            if (event.target && event.target.type === "checkbox") {
                let status = event.target.parentElement.querySelector(".status");
                if (event.target.checked) {
                    status.textContent = "Done 😊";

                    let rect = event.target.getBoundingClientRect();
                    createConfetti(rect.left, rect.bottom);
                    createConfetti(rect.right, rect.bottom);
                } else {
                    status.textContent = "";
                }
            }
        });
    }

    document.querySelector("#addWish").addEventListener("click", function () {
        let ul = document.querySelector("#wishlist");
        let li = document.createElement("li");

        li.innerHTML = `
            <input type="checkbox">
            <span contenteditable="true" class="wish-text">New Wishlist Item</span>
            <button class="edit-btn">✏️</button>
            <button class="delete-btn">❌</button>
            <span class="status"></span>
        `;

        ul.appendChild(li);
        removeScrollIfNeeded();
    });

    addEventListeners();
    removeScrollIfNeeded();
});

 // Show loader on page load
 window.addEventListener('load', function() {
    // Wait a few seconds before hiding the loader to simulate slow loading if required
    setTimeout(function() {
        const loader = document.getElementById('page-loader');
        loader.style.visibility = 'hidden';
    }, 2000); // Adjust this timeout as necessary (in milliseconds)
});

// Optionally, you can show the loader if the internet is slow, using the "navigator.connection" API
if (navigator.connection) {
    const connection = navigator.connection;
    if (connection.downlink < 1.5) { // Slow network speed (adjust as necessary)
        document.getElementById('page-loader').style.visibility = 'visible';
    }
}