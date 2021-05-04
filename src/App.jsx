import "./App.css";
import Sidebar from "./components/Sidebar/Sidebar";
import Footer from "./components/Footer/Footer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Content from "./components/Content/Content";
import styled from "styled-components";

const AppWrapper = styled.div`
  background-color: rgb(236, 236, 236);
  z-index: 100;
  min-height: 100%;
  display: grid;
  grid-template-rows: 6vh 1fr 6vh;
  grid-template-columns: 1fr minmax(150px, 1fr) minmax(800px, 7fr) 1fr;
  grid-template-areas:
    "header header  header  header"
    ".      side    content ."
    "footer footer  footer  footer";
`;

function App() {
  return (
    <AppWrapper>
      <HeaderContainer />
      <Sidebar />
      <Content />
      <Footer />
    </AppWrapper>
  );
}

export default App;
