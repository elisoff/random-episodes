import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Modal from './common/Modal';
import API from '../api';

function EpisodeInfoCard({ show, episode }) {
    function EmptyInfoCard() {
        return (
            <div className="columns is-centered episode-modal">
                <div className="column is-7">
                    <div className="card">
                        <div className="card-image">
                            <div className="image-placeholder"></div>
                        </div>
                        <div className="card-content">
                            <div className="placeholder p-title"></div>

                            <div className="placeholder p-subtitle"></div>

                            <div className="content">
                                <div className="placeholder p-summary"></div>
                            </div>
                        </div>
                        <footer className="card-footer"></footer>
                    </div>
                </div>
            </div>
        );
    }

    function InfoCard() {
        return (
            <div className="columns is-centered episode-modal">
                <div className="column is-7">
                    <div className="card">
                        <div className="card-image">
                            {episode.image && (
                                <figure className="image">
                                    <img
                                        src={episode.image.medium}
                                        alt={episode.name}
                                    />
                                </figure>
                            )}
                        </div>
                        <div className="card-content">
                            <p className="title is-4">{episode.name}</p>

                            <p className="subtitle is-6">
                                {`Season ${episode.season}, episode ${episode.number}`}
                            </p>

                            <div className="content">
                                <span
                                    dangerouslySetInnerHTML={{
                                        __html: episode.summary,
                                    }}
                                ></span>
                            </div>
                        </div>
                        <footer className="card-footer">
                            <a
                                href={`https://www.google.com/search?q=${show.name} ${episode.name}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card-footer-item is-size-7"
                            >
                                Where to watch
                            </a>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            {episode && <InfoCard />}
            {!episode && <EmptyInfoCard />}
        </>
    );
}

function OverlaySuggestionButton({ onGetSuggestionClick }) {
    return (
        <div className="level is-overlay is-mobile">
            <div className="level-item">
                <button
                    type="button"
                    className="button is-primary"
                    onClick={onGetSuggestionClick}
                >
                    Get suggestion
                </button>
            </div>
        </div>
    );
}

OverlaySuggestionButton.propTypes = {
    onGetSuggestionClick: PropTypes.func.isRequired,
};

export default function RandomizeEpisodeModal({ show, onClose }) {
    const { getEpisodesByShowId } = API();
    const [episodesByShowId, setEpisodesByShowId] = useState(new Map());
    const [randomEpisode, setRandomEpisode] = useState(null);

    function getRandomEpisode(episodes) {
        const episodeQuantity = episodes.length;
        const randomNumber = Math.floor(Math.random() * episodeQuantity);

        return episodes[randomNumber];
    }

    function handleOnCloseModal() {
        onClose();
    }

    function handleGetEpisodeClick() {
        if (episodesByShowId.has(show.id)) {
            const episodes = episodesByShowId.get(show.id);

            if (episodes.length > 0) {
                const episode = getRandomEpisode(episodes);
                setRandomEpisode(episode);
            }
        } else {
            getEpisodesByShowId(show.id).then((episodes) => {
                if (episodes.length > 0) {
                    const episode = getRandomEpisode(episodes);
                    setRandomEpisode(episode);
                }

                const episodesByShowIdCopy = episodesByShowId;
                episodesByShowIdCopy.set(show.id, episodes);

                setEpisodesByShowId(episodesByShowIdCopy);
            });
        }
    }

    return (
        <>
            <Modal onClose={handleOnCloseModal}>
                <div className="columns">
                    <div className="column is-8">
                        <p className="title is-5">
                            Find a random episode to watch
                        </p>
                        <p className="subtitle is-7">
                            Click the button to receive an episode suggestion
                            for <strong>{show.name}</strong>
                        </p>
                    </div>
                    <div className="column">
                        {randomEpisode && (
                            <button
                                type="button"
                                className="button is-primary"
                                onClick={handleGetEpisodeClick}
                            >
                                Another suggestion
                            </button>
                        )}
                    </div>
                </div>

                <EpisodeInfoCard episode={randomEpisode} show={show} />

                {!randomEpisode && (
                    <OverlaySuggestionButton
                        onGetSuggestionClick={handleGetEpisodeClick}
                    />
                )}

                <div className="field is-grouped is-grouped-right">
                    <div className="control">
                        <button
                            type="button"
                            className="button is-light"
                            onClick={handleOnCloseModal}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

RandomizeEpisodeModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    // TODO add object shape
    show: PropTypes.object,
};
