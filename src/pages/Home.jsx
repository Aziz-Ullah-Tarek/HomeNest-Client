import Banner from '../components/Home/Banner';
import Categories from '../components/Home/Categories';
import FeaturedProperties from '../components/Home/FeaturedProperties';
import Services from '../components/Home/Services';
import WhyChooseUs from '../components/Home/WhyChooseUs';
import Highlights from '../components/Home/Highlights';
import Statistics from '../components/Home/Statistics';
import HowItWorks from '../components/Home/HowItWorks';
import Testimonials from '../components/Home/Testimonials';
import RecentBlogs from '../components/Home/RecentBlogs';
import Newsletter from '../components/Home/Newsletter';
import FAQ from '../components/Home/FAQ';
import CTA from '../components/Home/CTA';

const Home = () => {
    return (
        <div className="min-h-screen">
            {/* 1. Hero/Banner Slider - Interactive with auto/manual controls */}
            <Banner />

            {/* 2. Categories Section - Browse by property type */}
            <Categories />

            {/* 3. Featured Properties Section - Showcase top listings */}
            <FeaturedProperties />

            {/* 4. Services Section - What we offer */}
            <Services />

            {/* 5. Why Choose Us Section - Our advantages */}
            <WhyChooseUs />

            {/* 6. Highlights Section - Platform features */}
            <Highlights />

            {/* 7. Statistics Section - Numbers that matter */}
            <Statistics />

            {/* 8. How It Works Section - Step-by-step guide */}
            <HowItWorks />

            {/* 9. Testimonials Section - Client reviews */}
            <Testimonials />

            {/* 10. Recent Blogs Section - Latest insights */}
            <RecentBlogs />

            {/* 11. Newsletter Section - Stay updated */}
            <Newsletter />

            {/* 12. FAQ Section - Common questions */}
            <FAQ />

            {/* 13. CTA Section - Final call to action */}
            <CTA />
        </div>
    );
};

export default Home;
