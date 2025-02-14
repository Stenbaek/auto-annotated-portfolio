import React, { useEffect, useRef, useState } from 'react';
import Section from '../Section';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import classNames from 'classnames';

const calculateElapsedPercentage = (startDate: Date, endDate: Date): number => {
    const now = new Date().getTime();
    const start = startDate.getTime();
    const end = endDate.getTime();

    if (now <= start) return 0;
    if (now >= end) return 100;

    return Math.ceil((now - start) / (end - start)) * 100;
};

const ProgressBar = (props) => {
    const { type, elementId, colors, quote, name, title, subtitle, styles = {} } = props;

    const [progress, setProgress] = useState(0);
    const progressBarRef = useRef<HTMLDivElement>(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const startDate = new Date('2025-02-14');
        const endDate = new Date('2025-07-26');
        const handleScroll = () => {
            if (!progressBarRef.current) return;

            const rect = progressBarRef.current.getBoundingClientRect();
            const windowHeight = window.innerHeight || document.documentElement.clientHeight;

            if (rect.top <= windowHeight + 500 && !visible) {
                setVisible(true);
                setProgress(calculateElapsedPercentage(startDate, endDate));
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll(); // Run once on mount

        return () => window.removeEventListener('scroll', handleScroll);
    }, [visible]);

    return (
        <>
            <Section type={type} elementId={elementId} colors={colors} styles={styles.self}>
                {title && <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)}>{title}</h2>}
                {subtitle && (
                    <p className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, { 'mt-6': title })}>{subtitle}</p>
                )}
                <div ref={progressBarRef} style={{ width: '100%', paddingTop: '40px' }}>
                    <div style={{ width: '100%', background: '#ddd', borderRadius: '10px', overflow: 'hidden' }}>
                        <div
                            style={{
                                height: '30px',
                                width: visible ? `${progress}%` : '0%',
                                background: 'linear-gradient(90deg, #4caf50, #81c784)',
                                transition: 'width 1.5s ease-out',
                                textAlign: 'right',
                                lineHeight: '30px',
                                color: 'white',
                                fontWeight: 'bold',
                                paddingRight: '35px',
                                paddingLeft: '15px',
                                borderRadius: '10px'
                            }}
                        >
                            {visible ? `${Math.round(progress)}%` : '0%'}
                        </div>
                    </div>
                </div>
            </Section>
            <Section type={type} elementId={elementId} colors={colors} styles={styles.self}>
                <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)}>Love meter</h2>
                <div ref={progressBarRef} style={{ width: '100%', paddingTop: '40px' }}>
                    <div style={{ width: '100%', background: '#ddd', borderRadius: '10px', overflow: 'visible' }}>
                        <div
                            style={{
                                height: '30px',
                                width: visible ? `100%` : '0%',
                                background: 'linear-gradient(90deg, #4caf50, #81c784)',
                                transition: 'width 1.5s ease-out',
                                textAlign: 'right',
                                lineHeight: '30px',
                                color: 'white',
                                fontWeight: 'bold',
                                paddingRight: '35px',
                                paddingLeft: '15px',
                                borderRadius: '10px'
                            }}
                        >
                            {visible ? `100%` : '0%'}
                        </div>
                    </div>
                </div>
            </Section>
        </>
    );
};

export default ProgressBar;
