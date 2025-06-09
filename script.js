const container = document.getElementById("resourceList");

function loadResources() {
  fetch("http://localhost:4000/resources")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((resource) => {
        const div = document.createElement("div");
        const link = document.createElement("a");
        link.href = resource.url;
        link.textContent = resource.name;
        link.target = "_blank";

        div.appendChild(link);
        div.appendChild(document.createTextNode(""));
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.marginLeft = "10px";

        deleteButton.addEventListener("click", () => {
            const confirmDelete = confirm(`Are you sure you want to delete "${resource.name}"?`);
            if (!confirmDelete) return;
        
            fetch(`http://localhost:4000/resources/${resource.id}`, {
                method: "DELETE"
            })
            .then(response => response.json())
            .then(() => {
                container.innerHTML = "";
                loadResources();
            })
            .catch(error => {
                console.error("Error deleting resource:", error);
            });
        });
        

        div.appendChild(deleteButton);

        container.appendChild(div);
      });
    })
    .catch((error) => {
      console.error("Error fetching resources:", error);
    });
}

loadResources();

const form = document.getElementById("resourceForm");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent page reload

  const name = document.getElementById("name").value;
  const url = document.getElementById("url").value;

  fetch("http://localhost:4000/resources", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, url }),
  })
    .then((response) => response.json())
    .then(() => {
      form.reset(); // Clear the form
      container.innerHTML = ""; // Clear the list
      loadResources(); // Re-load the list
    })
    .catch((error) => {
      console.error("Error adding resource:", error);
    });
});
