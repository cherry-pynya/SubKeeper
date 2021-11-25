import FooterBrand from "./FooterBrand/FooterBrand";
import FooterLinks from "./FooterLinks/FooterLinks";

export default function Footer() {
    return (
        <footer className='footer'>
            <div className='footer-container'>
                <FooterBrand />
                <FooterLinks />
            </div>
        </footer>
    );
}