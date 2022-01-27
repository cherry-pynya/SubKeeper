import PropTypes from 'prop-types';

export default function WidgetText({text}) {
    return (
        <div className="widget-text">
            <span>{text}</span>
        </div>
    );
}

WidgetText.propTypes = {
    text: PropTypes.string,
};
