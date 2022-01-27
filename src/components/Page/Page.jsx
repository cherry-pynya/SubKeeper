import PropTypes from 'prop-types';

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
