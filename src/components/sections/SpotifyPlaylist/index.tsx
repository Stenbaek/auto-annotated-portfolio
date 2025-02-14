import React from 'react';
import Section from '../Section';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import classNames from 'classnames';

export default function SpotifyPlaylist(props) {
    const { type, elementId, colors, quote, name, title, subtitle, styles = {} } = props;
    return (
        <Section type={type} elementId={elementId} colors={colors} styles={styles.self}>
            {title && <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)}>{title}</h2>}
            {subtitle && (
                <p className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, { 'mt-6': title })}>{subtitle}</p>
            )}
            <div className="mt-10 overflow-x-hidden">
                <iframe
                    style={{ borderRadius: 12 }}
                    src="https://open.spotify.com/embed/playlist/5v0uhjhEDYTpL7oEk6PWkS?utm_source=generator&theme=0"
                    width="100%"
                    height="600"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                ></iframe>
            </div>
        </Section>
    );
}
