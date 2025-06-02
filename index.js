import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://api.animechan.io/v1";
const ANOTHER_URL = "https://api.jikan.moe/v4"

app.use(express.static("public"));
app.set('view engine', 'ejs');


app.get("/", async (req, res) => {
    res.render("index", { activePage: "home" });
});

// This generates a random quote from a random anime
app.get("/quote", async (req, res) => {
    try {
        const result = await axios.get(API_URL + "/quotes/random");
        res.render("randomQuote", {
            quote: result.data.data.content,
            animeName: result.data.data.anime.name,
            altName: result.data.data.anime.altName,
            character: result.data.data.character.name,
            activePage: "quote"
        });
    } catch (error) {
        res.render("index", { content: "Sorry, could not fetch a quote at this time.", activePage: "home" });
    }
});

// Gives a random anime
app.get("/anime", async (req, res) => {
    try {
        const result = await axios.get(ANOTHER_URL + "/random/anime");
        res.render("anime", {
            title: result.data.data.title,
            episodes: result.data.data.episodes,
            images: result.data.data.images,
            trailer: result.data.data.trailer,
            rating: result.data.data.rating,
            score: result.data.data.score,
            rank: result.data.data.rank,
            popularity: result.data.data.popularity,
            synopsis: result.data.data.synopsis,
            studios: result.data.data.studios,
            genres: result.data.data.genres,
            themes: result.data.data.themes,
            activePage: "anime"
        });
    } catch (error) {
        res.render("index", { content: "Sorry, could not fetch anime at this time.", activePage: "home" });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).render("404", { activePage: null });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});