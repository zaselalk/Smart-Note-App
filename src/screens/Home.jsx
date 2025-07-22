import Footer from "../components/Footer";
import Header from "../components/Header";
import NoteList from "../components/NoteList";

function Home() {
  
  return (
    <div className="h-screen flex flex-col">
      <Header />
      <NoteList/>
      <Footer/>
    </div>
  );
}

export default Home;
