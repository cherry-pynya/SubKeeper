import NavBrand from "../../Header/HeaderNav/NavBrand/Navbrand";

//логотип в футере
export default function FooterBrand() {
    return (
        <div className='footer-brand'>
            <NavBrand />
            <span style={{fontSize: '0.8rem'}}>made by Cherepnya Nikita</span>
        </div>
    );
}