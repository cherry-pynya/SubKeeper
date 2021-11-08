import { useState } from 'react';

export default function Widget() {
    const [data, setData] = useState({})
    return (
        <aside className='widget-container'>
            <div className='widget border'>

            </div>
        </aside>
    )
}
