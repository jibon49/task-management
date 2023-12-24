import Banner from "../Banner/Banner";
import Faq from "../Faq/Faq";
import Profession from "../Profession/Profession";


const Home = () => {
    return (
        <div className="max-w-7xl mx-auto">
            <Banner></Banner>
            <Profession></Profession>
            <Faq></Faq>
        </div>
    );
};

export default Home;