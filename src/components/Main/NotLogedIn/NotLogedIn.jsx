import { Link } from 'react-router-dom';
import LoginButton from '../../LoginButton/LoginButton';

export default function NotLogedIn() {
    return(
        <section>
            <div>
                <h2>Добро пожаловать в SubKeeper!</h2>
                <span>SubKeeper это простое и удобное приложение для отслеживания подписок. Просто добавь активную подписку и приложение само подсчитает сколько ты тратишь ежемесячно и соберет полезную статистику.</span>
                <span>Чтобы начать нужно иметь аккаунт в <Link to='https://www.google.com/'>Google</Link>.</span>
            </div>
            <LoginButton />
        </section>
    );
}