import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Modal from './common/Modal';

import API from '../api';
import useRequestState from '../hooks/useRequestState';
import { DEFAULT_ERROR_MESSAGE } from '../constants';
import { DateTime } from 'luxon';
import Image from './common/Image';

function EpisodeInfoCard({ show, episode }) {
    function EmptyInfoCard() {
        return (
            <div
                className="columns is-centered is-vcentered episode-modal"
                data-testid="emptyEpisodeInfoCard"
            >
                <div className="column is-7">
                    <div className="card">
                        <div className="card-image">
                            <div className="image is-16by9 has-background-light"></div>
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
        const airDate = episode.airdate
            ? DateTime.fromISO(episode.airdate).toLocaleString(
                  DateTime.DATE_MED
              )
            : null;

        return (
            <div className="columns is-centered is-vcentered episode-modal">
                <div className="column is-7">
                    <div className="card">
                        <div className="card-image">
                            <Image imageSize="16by9" info={episode} />
                        </div>
                        <div className="card-content">
                            <p className="title is-4">{episode.name}</p>

                            <p className="subtitle is-6">
                                {`Season ${episode.season}, episode ${episode.number}`}
                                <span className="heading">{airDate}</span>
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

function SuggestionButton({
    buttonText,
    onGetSuggestionClick,
    isLoading,
    isDisabled,
}) {
    const isLoadingClass = isLoading ? 'is-loading' : '';

    return (
        <button
            type="button"
            className={`button is-primary ${isLoadingClass}`}
            onClick={onGetSuggestionClick}
            disabled={isDisabled}
        >
            {buttonText}
        </button>
    );
}

SuggestionButton.defaultProps = {
    buttonText: 'Get suggestion',
};

function OverlaySuggestionButton({
    onGetSuggestionClick,
    isLoading,
    isButtonDisabled,
}) {
    return (
        <div className="level is-overlay is-mobile">
            <div className="level-item">
                <SuggestionButton
                    onGetSuggestionClick={onGetSuggestionClick}
                    isLoading={isLoading}
                    isDisabled={isButtonDisabled}
                />
            </div>
        </div>
    );
}

OverlaySuggestionButton.propTypes = {
    onGetSuggestionClick: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    isOverlaySuggestionButtonDisabled: PropTypes.bool,
};

export default function RandomizeEpisodeModal({ show, onClose }) {
    const { getEpisodesByShowId } = API();
    const [episodesByShowId, setEpisodesByShowId] = useState(new Map());
    const [randomEpisode, setRandomEpisode] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [modalErrorMessage, setModalErrorMessage] = useState(null);
    const [
        isOverlaySuggestionButtonDisabled,
        setIsOverlaySuggestionButtonDisabled,
    ] = useState(false);

    const { createErrorNotification } = useRequestState();

    function getRandomEpisode(episodes) {
        const episodeQuantity = episodes.length;
        const randomNumber = Math.floor(Math.random() * episodeQuantity);

        return episodes[randomNumber];
    }

    function handleOnCloseModal() {
        onClose();
    }

    async function handleGetEpisodeClick() {
        setIsLoading(true);

        if (episodesByShowId.has(show.id)) {
            const episodes = episodesByShowId.get(show.id);

            if (episodes.length > 0) {
                const episode = getRandomEpisode(episodes);
                setRandomEpisode(episode);
            }
        } else {
            try {
                const episodes = await getEpisodesByShowId(show.id);

                if (episodes.length > 0) {
                    const episode = getRandomEpisode(episodes);
                    setRandomEpisode(episode);
                } else {
                    setModalErrorMessage(
                        'No episodes found. Please try another show.'
                    );
                    setIsOverlaySuggestionButtonDisabled(true);
                }

                const episodesByShowIdCopy = episodesByShowId;
                episodesByShowIdCopy.set(show.id, episodes);

                setEpisodesByShowId(episodesByShowIdCopy);
            } catch {
                createErrorNotification(DEFAULT_ERROR_MESSAGE, false);
            }
        }

        setIsLoading(false);
    }

    return (
        <Modal onClose={handleOnCloseModal}>
            <div data-testid="randomizeEpisodeModal">
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
                            <SuggestionButton
                                onGetSuggestionClick={handleGetEpisodeClick}
                                isLoading={isLoading}
                                buttonText="Another suggestion"
                            />
                        )}
                    </div>
                </div>

                {modalErrorMessage && (
                    <div className="notification is-danger">
                        <span className="is-size-7">{modalErrorMessage}</span>
                    </div>
                )}

                <EpisodeInfoCard episode={randomEpisode} show={show} />

                {!randomEpisode && (
                    <OverlaySuggestionButton
                        isButtonDisabled={isOverlaySuggestionButtonDisabled}
                        onGetSuggestionClick={handleGetEpisodeClick}
                        isLoading={isLoading}
                    />
                )}
            </div>
        </Modal>
    );
}

RandomizeEpisodeModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    // TODO add object shape
    show: PropTypes.object.isRequired,
};
