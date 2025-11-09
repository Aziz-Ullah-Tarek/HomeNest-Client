import Banner from '../components/Home/Banner';
import FeaturedProperties from '../components/Home/FeaturedProperties';
import WhyChooseUs from '../components/Home/WhyChooseUs';
import Statistics from '../components/Home/Statistics';
import HowItWorks from '../components/Home/HowItWorks';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* Banner Slider */}
            <Banner />

            {/* Featured Properties Section */}
            <FeaturedProperties />

            {/* Why Choose Us Section */}
            <WhyChooseUs />

            {/* Statistics Section */}
            <Statistics />

            {/* How It Works Section */}
            <HowItWorks />
        </div>
    );
};

export default Home;
