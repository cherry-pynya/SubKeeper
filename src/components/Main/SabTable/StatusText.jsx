export default function StatusText({text}) {
    return(
        <div style={{ textTransform: "uppercase", marginTop: '20px', width: '90%'}}>
            <span>{text}</span>
        </div>
    );
}