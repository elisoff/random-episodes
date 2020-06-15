const express = require('express');
const app = express();
const path = require('path');

const port = process.env.PORT || 5000;

const Shows = require('./server/shows');
const Episodes = require('./server/episodes');
const constants = require('./server/constants');

app.use(express.json());

app.get('/api/shows', async (req, res) => {
    const { getShowsByQuery } = Shows();

    try {
        const result = await getShowsByQuery(req.query);
        res.status(200).send(result);
    } catch (error) {
        console.log(error)
        if (!error.status) {
            res.status(500).send(
                formatErrorMessage(constants.DEFAULT_ERROR_MESSAGE)
            );
        } else {
            res.status(error.status).send(formatErrorMessage(error.message));
        }
    }
});

app.get('/api/shows/:showId/episodes', async (req, res) => {
    const { getEpisodesByShowId } = Episodes();

    try {
        const result = await getEpisodesByShowId(req.params);
        res.status(200).send(result);
    } catch (error) {
        if (!error.status) {
            res.status(500).send(
                formatErrorMessage(constants.DEFAULT_ERROR_MESSAGE)
            );
        } else {
            res.status(error.status).send(formatErrorMessage(error.message));
        }
    }
});

app.use(express.static(path.join(__dirname, 'build')));

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

app.use(function (req, res, next) {
    res.status(404).send(formatErrorMessage('Not found.'));
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

function formatErrorMessage(message) {
    return {
        message,
    };
}
