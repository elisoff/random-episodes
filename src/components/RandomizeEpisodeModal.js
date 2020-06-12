import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './common/Modal';
import API from '../api';

export default function RandomizeEpisodeModal({ show, onClose }) {
    const { getEpisodesByShowId } = API();
    const [content, setContent] = useState(null);
    const [episodes, setEpisodes] = useState([]);

    useEffect(() => {
        getEpisodesByShowId(show.id).then((eps) => {
            setEpisodes(eps);
        });
    }, [getEpisodesByShowId, show]);

    useEffect(() => {
        if (episodes.length > 0) {
            const chosenEpisode = getRandomEpisode(episodes);

            const { season, number, name } = chosenEpisode;

            setContent(<h1>{`${season}x${number} - ${name}`}</h1>);
        }
    }, [episodes]);

    function getRandomEpisode(episodes) {
        const episodeQuantity = episodes.length;
        const randomNumber = Math.floor(Math.random() * episodeQuantity);

        return episodes[randomNumber];
    }

    function handleOnCloseModal() {
        onClose();
    }

    return (
        <>
            <Modal onClose={handleOnCloseModal}>{content}</Modal>
        </>
    );
}

RandomizeEpisodeModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    // TODO add object shape
    show: PropTypes.object,
};
