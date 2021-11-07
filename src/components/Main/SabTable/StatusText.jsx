export default function StatusText({text}) {
    return(
        <div style={{ textTransform: "uppercase", marginTop: '20px'}}>
            <span>{text}</span>
        </div>
    );
}