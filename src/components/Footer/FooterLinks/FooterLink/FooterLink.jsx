import PropTypes from 'prop-types';

export default function FooterLink({item}) {
    const { link, name } = item;
    return (
        <li className='address-links-list-item'>
            <a href={link} className={`address-links-list-link ${name}`} type='mail' target="_blank" rel="noreferrer">
                <span className='address-links-list-text'>{name}</span>
            </a>
        </li>
    );
}

FooterLink.propTypes = {
    item: PropTypes.object.isRequired,
};
