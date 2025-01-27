document.addEventListener('DOMContentLoaded', loadData);

function loadData() {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            const storeitem = document.getElementById("data-list");
            storeitem.innerHTML = ""; // Clear existing data

            data.forEach(item => {
                const anchor = document.createElement('a');
                anchor.href = item.link;

                const dataDiv = document.createElement('div');
                dataDiv.className = 'data';

                const img = document.createElement('img');
                img.src = item.image;
                dataDiv.appendChild(img);

                const infoDiv = document.createElement('div');
                infoDiv.className = 'info';

                const h2 = document.createElement('h2');
                h2.textContent = item.unit;
                infoDiv.appendChild(h2);

                const h3 = document.createElement('h3');
                h3.textContent = item.name;
                infoDiv.appendChild(h3);

                dataDiv.appendChild(infoDiv);
                anchor.appendChild(dataDiv);
                storeitem.appendChild(anchor);
            });
        })
        .catch(error => console.error('Error loading data:', error));
}
const search = () => {
    const searchbox = document.getElementById("search-item").value.toUpperCase();
    const storeitem = document.getElementById("data-list");
    const data = document.querySelectorAll(".data");
    const anchors = storeitem.getElementsByTagName("a");
    const dname = storeitem.getElementsByTagName("h3");

    let exactMatches = [];
    let similarMatches = [];

    for (let i = 0; i < dname.length; i++) {
        let match = dname[i].textContent || dname[i].innerText;
        let anchor = anchors[i];

        if (match) {
            if (match.toUpperCase() === searchbox) {
                exactMatches.push(anchor);
            } else if (match.toUpperCase().includes(searchbox)) {
                similarMatches.push(anchor);
            } else {
                anchor.style.display = "none";
            }
        }
    }

    // Show exact matches first
    exactMatches.forEach(anchor => {
        anchor.style.display = "";
        storeitem.appendChild(anchor);
    });

    // Show similar matches after
    similarMatches.forEach(anchor => {
        anchor.style.display = "";
        storeitem.appendChild(anchor);
    });
};

// Add event listener to handle typing
document.getElementById("search-item").addEventListener("keyup", function(event) {
    search();
});

// Add event listener to handle Enter key press
document.getElementById("search-item").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent the form from submitting and page from refreshing
        search();
    }
});
