import React from 'react';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="content has-text-centered">
                <p className="is-size-7">
                    See code on{' '}
                    <a
                        href="https://github.com/elisoff/random-episodes"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Github
                    </a>
                </p>
            </div>
            <div className="content has-text-centered">
                <a
                    href="https://bulma.io"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <img
                        src="https://bulma.io/images/made-with-bulma.png"
                        alt="Made with Bulma"
                        width="128"
                        height="24"
                    />
                </a>
            </div>
        </footer>
    );
}
