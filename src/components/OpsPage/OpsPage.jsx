import Page from "../Page/Page";
import ToMainBtn from "../PageNotFound/ToMainBtn/ToMainBtn";

//страница выдаваемая при ошибке с сервера
export default function OpsPage() {
    return (
        <Page>
            <section className='ops-page'>
                <h1>Упс, что-то пошло не так:((((</h1>
                <ToMainBtn />
            </section>
        </Page>
    );
}