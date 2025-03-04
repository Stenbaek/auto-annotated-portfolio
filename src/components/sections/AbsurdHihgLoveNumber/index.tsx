import React from 'react';
import Section from '../Section';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import classNames from 'classnames';
import { mapStylesToClassNames } from '@/utils/map-styles-to-class-names';

const getStoredNumber = () => {
    const storedData = localStorage.getItem('highestNumberProd');
    const today = new Date().toDateString();
    if (storedData) {
        const { date, value } = JSON.parse(storedData);
        return date === today ? value : null;
    }
    return null;
};

const storeNumber = (value) => {
    localStorage.setItem(
        'highestNumberProd',
        JSON.stringify({
            date: new Date().toDateString(),
            value
        })
    );
};

const generateHighNumber = (prev) => {
    return prev + Math.floor(Math.random() * 1000000) + 1000000;
};

export default function AbsurdHihgLoveNumber(props) {
    const { type, elementId, title, colors, backgroundSize, styles = {} } = props;

    const [count, setCount] = useState<number | null>(0);

    useEffect(() => {
        const today = new Date().toDateString();
        const storedData = JSON.parse(localStorage.getItem('highestNumberProd') || 'null');

        if (!storedData || storedData.date !== today) {
            const newNumber = generateHighNumber(123122);
            setCount(newNumber);
            storeNumber(newNumber);
        } else {
            const newNumber = generateHighNumber(storedData.value);
            setCount(newNumber);
            storeNumber(newNumber);
        }
    }, []);

    useEffect(() => {
        if (count !== null) {
            localStorage.setItem('count', JSON.stringify(count));
        }
    }, [count]);

    return (
        <Section
            type={type}
            elementId={elementId}
            colors={colors}
            backgroundSize={backgroundSize}
            styles={{
                display: 'flex'
            }}
        >
            {title && <h3 className={classNames(styles.title ? mapStylesToClassNames(styles.title) : null)}>{title}</h3>}
            <div className="flex justify-center items-center bg-black text-white text-6xl font-bold overflow-hidden">
                <motion.div initial={{ y: 200, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 1 }} className="overflow-hidden">
                    <motion.span initial={{ y: '100%' }} animate={{ y: '0%' }} transition={{ duration: 1.5, ease: 'easeOut' }} className="block">
                        {count.toLocaleString()}
                    </motion.span>
                </motion.div>
            </div>
        </Section>
    );
}
