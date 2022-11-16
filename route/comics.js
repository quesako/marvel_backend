require('dotenv').config()
const express = require('express')
const axios = require('axios')
const router = express.Router()

/**
 * Get a list of comics
 */
router.get('/comics', async (req, res) => {
    try {
        const { limit, skip, title } = req.query
        console.log(limit)

        /* Build the url to fetch */
        const queryOptions = []
        if (limit) {
            queryOptions.push(`&limit=${limit}`)
        }
        if (skip) {
            queryOptions.push(`&skip=${skip}`)
        }
        if (title) {
            queryOptions.push(`&title=${title}`)
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
 * Get a list of comics containing a specific character
 */
router.get('/comics/:id', async (req, res) => {
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
