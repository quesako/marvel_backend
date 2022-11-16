const express = require('express')
const cors = require('cors')

const app = express()

app.use(cors())
app.use(express.json())

/*
 * * Routes
 */
const allComicsRoutes = require('./route/comics')
const allCharactersRoutes = require('./route/characters')

app.use(allComicsRoutes)
app.use(allCharactersRoutes)

/*
 * * Default routing
 */

app.all('*', (req, res) => {
    res.json({
        message:
            '👋hi! Go to ./characters/** or ./comics/** to use this api. Good luck ...',
    })
})

/*
 * * Listen
 */

app.listen(process.env.PORT, () => {
    console.log('Server has start')
})
