export default function Page(props) {
    return (
        <main className='main' style={{minHeight: '80vh'}}>
            {props.children}
        </main>
    );
}