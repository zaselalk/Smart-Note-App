import addBtn from "../assets/images/add-button.png"

function Footer() {
  return (
  
    <div style={{backgroundImage: `url(${addBtn})`}} 
         className="bg-cover h-16 w-16 rounded-full absolute right-5 bottom-2"
    ></div>

  );
}

export default Footer;
