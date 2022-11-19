require('dotenv').config()
const express = require('express')
const axios = require('axios')
const router = express.Router()

/**
 * Get a list of characters
 */
router.get('/allCharacters', async (req, res) => {
    try {
        const { limit, skip, term } = req.query

        /* Build the url to fetch */
        const queryOptions = []
        if (limit) {
            queryOptions.push(`&limit=${limit}`)
        }
        if (skip) {
            queryOptions.push(`&skip=${skip}`)
        }
        if (term) {
            queryOptions.push(`&name=${term}`)
        }
        const urlToFetch = `${
            process.env.REACTEUR_MARVEL_API_URL
        }/characters?apiKey=${
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
 * Get the infos of a specific character
 */
router.get('/singleCharacter/:id', async (req, res) => {
    try {
        const { id } = req.params

        /* Build the url to fetch */
        const urlToFetch = `${process.env.REACTEUR_MARVEL_API_URL}/character/${id}?apiKey=${process.env.REACTEUR_MARVEL_API_KEY}`
        console.log(urlToFetch)

        /* Fetch data */
        const response = await axios.get(urlToFetch)
        res.status(200).json(response.data)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router
