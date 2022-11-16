require('dotenv').config()
const express = require('express')
const axios = require('axios')
const router = express.Router()

/**
 * Get a list of characters
 */
router.get('/characters', async (req, res) => {
    try {
        const { limit, skip, title } = req.body

        // Control rules of API usages
        if (limit && typeof limit !== 'number') {
            return res.status(400).json({ message: 'limit must be a number' })
        }
        if (skip && typeof skip !== 'number') {
            return res.status(400).json({ message: 'skip must be a number' })
        }
        if (skip && !limit) {
            return res
                .status(400)
                .json({ message: `skip must be use with "limit"` })
        }

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
router.get('/character/:id', async (req, res) => {
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
