import React, { useState } from 'react';
import { DateTime } from 'luxon';

import Modal from './common/Modal';
import RandomizeEpisodeModal from './RandomizeEpisodeModal';
import Image from './common/Image';

export default function ShowsList({ list }) {
    const [modalInfo, setModalInfo] = useState(null);
    const [selectedShow, setSelectedShow] = useState(null);

    function handleReadMoreClick(textContent, title) {
        setModalInfo({
            textContent,
            title,
        });
    }

    function handleModalClose() {
        setModalInfo(null);
    }

    function handleRandomizeModalClose() {
        setSelectedShow(null);
    }

    function handleSelectShowClick(show) {
        setSelectedShow(show);
    }

    function buildShowCardHeader(show) {
        return (
            <div
                className="card-image is-centered show-image"
                onClick={handleSelectShowClick.bind(this, show)}
            >
                <Image info={show} />
            </div>
        );
    }

    function buildShowCardTitle(show) {
        const premiereDate = show.premiered
            ? DateTime.fromISO(show.premiered).toLocaleString(DateTime.DATE_MED)
            : null;

        return (
            <div className="show-title">
                <p className="title is-6">{show.name}</p>
                <p className="heading">{show.status}</p>
                <p className="subtitle is-size-7">
                    {premiereDate && `Premiered on ${premiereDate}`}
                </p>
            </div>
        );
    }

    function buildShowCardContent(show) {
        return (
            <>
                <p
                    className="show-summary"
                    dangerouslySetInnerHTML={{
                        __html: show.summary,
                    }}
                ></p>

                <button
                    type="button"
                    className="button is-text is-small"
                    onClick={handleReadMoreClick.bind(
                        this,
                        show.summary,
                        show.name
                    )}
                >
                    See full summary
                </button>
            </>
        );
    }

    function buildShowCardFooter(show) {
        const { externals } = show;
        const imdbUrl = 'https://www.imdb.com/title/';
        let imdbButton = null;

        if (externals && externals.imdb) {
            const showImdbUrl = `${imdbUrl}${externals.imdb}`;

            imdbButton = (
                <div className="card-footer-item">
                    <span className="is-size-7">
                        View on{' '}
                        <a
                            href={showImdbUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            IMDb
                        </a>
                    </span>
                </div>
            );
        }

        return (
            <footer className="card-footer">
                {imdbButton}
                <div className="card-footer-item">
                    <button
                        type="button"
                        className="button is-primary is-small"
                        onClick={handleSelectShowClick.bind(this, show)}
                    >
                        Select
                    </button>
                </div>
            </footer>
        );
    }

    return (
        <div className="columns is-multiline">
            {list &&
                list.map(({ show }) => {
                    return (
                        <div className="column is-2-fullhd is-3-desktop is-4-tablet" key={show.id}>
                            <div className="card my-3">
                                {buildShowCardHeader(show)}
                                <div className="card-content">
                                    <div className="content">
                                        {buildShowCardTitle(show)}
                                    </div>
                                    <div className="content is-small">
                                        {buildShowCardContent(show)}
                                    </div>
                                </div>
                                {buildShowCardFooter(show)}
                            </div>
                        </div>
                    );
                })}

            {modalInfo && (
                <Modal
                    textContent={modalInfo.textContent}
                    title={modalInfo.title}
                    onClose={handleModalClose}
                />
            )}
            {selectedShow && (
                <RandomizeEpisodeModal
                    show={selectedShow}
                    onClose={handleRandomizeModalClose}
                />
            )}
        </div>
    );
}
