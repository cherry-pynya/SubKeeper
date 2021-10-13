import optionConverter from "../../../utils/optionConverter";
import currencyConverter from "../../../utils/currensyConverter";

export default function SubTableItem({item}) {
    let {letter, name, cost, currency, option, date} = item;
    option = optionConverter(option);
    currency = currencyConverter(currency);

    return(
        <div className='sabTable-item'>
            <h3 className='sabTable-item-letter'>{letter}</h3>
            <div className='sabTable-item-name'>
                <span>{name}</span>
            </div>
            <div className='sabTable-item-name'>
                <span>{`${cost} ${currency}`}</span>
            </div>
            <div className='sabTable-item-cost'>
                <span>
                    списание
                </span>
                <span>
                    {option}
                </span>
            </div>
            <div className='sabTable-item-date'>
                <span>{date}</span>
            </div>
            <div className='sabTable-item-buttons'>
                <button className='sabTable-item-button'>X</button>
                <button className='sabTable-item-button'>X</button>
            </div>
        </div>
    )
}