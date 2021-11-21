import LoginButton from '../../LoginButton/LoginButton';

export default function NotLogedIn() {
    return(
        <section>
            <div>
                <h2>Добро пожаловать в SubKeeper!</h2>
                <span>SubKeeper это простое и удобное приложение для отслеживания подписок. Просто добавь активную подписку и приложение само подсчитает сколько ты тратишь ежемесячно и соберет полезную статистику.</span>
                <span>Чтобы начать нужно иметь аккаунт в <a href='https://www.google.com/'>Google</a>.</span>
            </div>
            <LoginButton />
        </section>
    );
}