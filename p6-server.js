// Server files with the required minimum four routes for the the four different HTTP verbs
// In-memory array of objects


// express setup
const express = require("express");
const app = express();
const PORT = 4000;

// routes
app.use(express.json());
app.use(express.static("public"));

const resources = [
    {
        id: 1,
        name: "DuckWeb",
        url: "https://duckweb.uoregon.edu"

    },
    {
        id: 2,
        name: "Canvas",
        url: "https://canvas.uoregon.edu/"

    },
    {
        id: 3,
        name: "Navigate",
        url: "https://uoregon.navigate.eab.com/app/#/my/priority-feed/",

    }
]
// testing 
app.get("/test", (req, res) => {
    res.json({ message: "server works" });
});

app.get("/resources", (req, res) => {
    res.json(resources);
});

app.post("/resources", (req, res) => {
    const newResource = req.body;
    const highestId = resources.reduce((max, item) => {
        return item.id > max ? item.id : max;
    }, 0);
    const newId = highestId + 1;
    newResource.id = newId;
    resources.push(newResource);
    res.json({ message: "Resource added!", data: newResource });

});

app.put("/resources/:id", (req, res) => {
    const idToUpdate = parseInt(req.params.id);
    const resource = resources.find(r => r.id === idToUpdate);
    if (!resource) {
        return res.status(404).json({ error: "Resource not found" });
    }

    resource.name = req.body.name;
    resource.url = req.body.url;
    resource.category = req.body.category;
    res.json({ message: "Resource updated", data: resource });


});

app.delete("/resources/:id", (req, res) => {
    const idToDelete = parseInt(req.params.id);
    const index = resources.findIndex(r => r.id === idToDelete);
    if (index === -1) {
        res.status(404).json({ error: "Resource not found" });
    }
    resources.splice(index, 1);
    res.json({ message: "Resource deleted" });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});