import Page from "../Page/Page";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

//лоадер, показывается во время выполнения асинхронных запросов
export default function Loader() {
  return (
    <Page>
      <section className='loader-page'>
        <Box sx={{ display: "flex", color: '#1DA1F2'}}>
          <CircularProgress color='inherit' />
        </Box>
      </section>
    </Page>
  );
}
