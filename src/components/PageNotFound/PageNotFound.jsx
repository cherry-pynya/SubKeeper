import Page from "../Page/Page";
import { useHistory } from "react-router";

export default function PageNotFound() {
    const history = useHistory();

    const click = () => {
        history.push('/');
    };

    return (
        <Page>
            <section className='page-not-found'>
                <h1>{'4(>_<)4'}</h1>
                <button type='button' 
                className='btn primary-color' 
                onClick={click}>На главную!</button>
            </section>
        </Page>
    );
}