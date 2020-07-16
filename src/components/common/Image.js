import React from 'react';
import PropTypes from 'prop-types';

export default function Image({ info, imageSize }) {
    return (
        <figure
            className={`image is-${imageSize} has-background-light has-text-grey-lighter`}
        >
            {info.image ? (
                <img src={info.image.medium} alt={info.name} />
            ) : (
                <div className="level is-overlay is-mobile">
                    <div className="level-item">
                        <span className="icon is-large">
                            <i className="far fa-6x fa-image"></i>
                        </span>
                    </div>
                </div>
            )}
        </figure>
    );
}

Image.defaultProps = {
    imageSize: '3by4',
};

Image.propTypes = {
    imageSize: PropTypes.oneOf(['16by9', '3by4']),
};
