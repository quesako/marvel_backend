require('dotenv').config()
const express = require('express')
const axios = require('axios')
const router = express.Router()

/**
 * Get a list of comics
 */
router.get('/allComics', async (req, res) => {
    try {
        const { limit, skip, term } = req.query
        console.log(limit)

        /* Build the url to fetch */
        const queryOptions = []
        if (limit) {
            queryOptions.push(`&limit=${limit}`)
        }
        if (skip) {
            queryOptions.push(`&skip=${skip}`)
        }
        if (term) {
            queryOptions.push(`&title=${term}`)
        }
        const urlToFetch = `${
            process.env.REACTEUR_MARVEL_API_URL
        }/comics?apiKey=${
            process.env.REACTEUR_MARVEL_API_KEY
        }${queryOptions.join('')}`

        /* Fetch data */
        const response = await axios.get(urlToFetch)

        res.status(200).json(response.data)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

/**
 * Get the infos of a specific comics
 */
router.get('/singleComics/:id', async (req, res) => {
    try {
        const { id } = req.params

        // is all comics
        const urlToFetch = `${process.env.REACTEUR_MARVEL_API_URL}/comics?apiKey=${process.env.REACTEUR_MARVEL_API_KEY}`

        /* Fetch data */
        const response = await axios.get(urlToFetch)

        /*build response*/
        const findSingleComics = response.data.results.find((singleComics) =>
            singleComics._id.includes(id)
        )
        if (findSingleComics) {
            response.data = findSingleComics
        } else {
            response.data = null
        }
        res.status(200).json(response.data)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

/**
 * Get a list of comics containing a specific character
 */
router.get('/comicsByCharacters/:id', async (req, res) => {
    try {
        const { id } = req.params

        /* Build the url to fetch */
        const urlToFetch = `${process.env.REACTEUR_MARVEL_API_URL}/comics/${id}?apiKey=${process.env.REACTEUR_MARVEL_API_KEY}`
        console.log(urlToFetch)

        /* Fetch data */
        const response = await axios.get(urlToFetch)
        res.status(200).json(response.data)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router
