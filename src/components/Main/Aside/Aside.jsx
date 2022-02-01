import StatsWidget from './StatsWidget/StatsWidget';

// обертка для виджета с диаграмой
export default function Aside() {
    return (
        <aside className='widget-container'>
            <StatsWidget />
        </aside>
    )
}
