import { nanoid } from "@reduxjs/toolkit";
import FooterLink from "./FooterLink/FooterLink";


//список ссылок с контактами
export default function FooterLinks() {
    const links = [
        {
            name: 'github',
            link: 'https://github.com/cherry-pynya'
        },
        {
            name: 'telegram',
            link: 'https://t.me/Cherry_pinya',
        },
        {
            name: 'gmail',
            link: 'mailto:nikita.cherepnya@gmail.com',
        }
    ];
    return (
        <address className='address'>
            <ul className='address-links-list'>
                {links.map((el) => <FooterLink item={el} key={nanoid()}/>)}
            </ul>
        </address>
    );
}
