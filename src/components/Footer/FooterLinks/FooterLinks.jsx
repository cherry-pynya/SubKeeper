import FooterLink from "./FooterLink/FooterLink";

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
                {links.map((el) => <FooterLink item={el} />)}
            </ul>
        </address>
    );
}
