import React from 'react';
import Section from '../Section';

import { mapStylesToClassNames as mapStyles } from '../../../utils/map-styles-to-class-names';
import classNames from 'classnames';

export default function BoyfriendTicketsSection(props) {
    const { type, elementId, colors, tickets, title, subtitle, redeemed, styles = {} } = props;
    return (
        <Section type={type} elementId={elementId} colors={colors} styles={styles.self}>
            {title && <h2 className={classNames(styles.title ? mapStyles(styles.title) : null)}>{title}</h2>}
            {subtitle && (
                <p className={classNames('text-lg', 'sm:text-xl', styles.subtitle ? mapStyles(styles.subtitle) : null, { 'mt-6': title })}>{subtitle}</p>
            )}
            <ul className="mt-10 overflow-x-hidden">
                {tickets.map((ticket, index) => (
                    <BoyfriendTicket key={index} {...ticket} />
                ))}
            </ul>
            <div className="mt-16">
                <h3>Something missing? We take requests.</h3>
                <p>
                    Here at TheBoyfriend™️ we take our mission seriously. Send a mail to our{' '}
                    <a className="underline hover:no-underline" href="mailto:hey@sstenbaek.dk?subject=Request%20for%20boyfriend%20ticket">
                        sales department
                    </a>{' '}
                    to hear about our offers, or find us on <a href="https://wa.me/34639375369?text=Request%20for%20boyfriend%20ticket!"> WhatsApp</a>. Looking
                    forward to stay in touch!
                </p>
            </div>
        </Section>
    );
}

function BoyfriendTicket(props) {
    const { type, elementId, colors, quote, name, title, subtitle, redeemed, styles = {} } = props;
    return (
        <li className={'items-stretch text-4xl mb-4'}>
            {!redeemed ? '☑️ ' : '✅ '}
            {title}
        </li>
    );
}
