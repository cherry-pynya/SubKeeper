import PropTypes from 'prop-types';

//мейн секция для главной страницы
export default function Page(props) {
    return (
        <main className='main'>
            {props.children}
        </main>
    );
}

Page.propTypes= {
    props: PropTypes.node
};
