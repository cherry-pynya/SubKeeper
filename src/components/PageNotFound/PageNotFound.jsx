import Page from "../Page/Page";
import ToMainBtn from "./ToMainBtn/ToMainBtn";

// страница 404
export default function PageNotFound() {
    return (
        <Page>
            <section className='page-not-found'>
                <h1>{'4(>_<)4'}</h1>
                <ToMainBtn />
            </section>
        </Page>
    );
}