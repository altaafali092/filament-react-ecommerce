import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';

import AuthLayout from './layout/AuthLayout';
import ShopByCategory from './index/ShopByCatregory';
import Trending from './index/Trending';

import NewsAndBlogs from './index/NewsAndBlog';
import CustomerReviews from './index/Review';
import NewArrivial from './index/NewArrivial';
import FrquentlyAskQues from './index/FrequentlyAskQues';
import { IFrontBlogs, IFrontFAQ, IFrontProduct, IFrontSlider } from '@/types/frontend';
import Slider from './index/Slider';


export default function Welcome() {
    const { auth  } = usePage<SharedData>().props;
    const{products}=usePage<{products:IFrontProduct[]}>().props;
    const{blogs}=usePage<{blogs:IFrontBlogs[]}>().props;
    const {sliders}=usePage<{sliders:IFrontSlider[]}>().props;
    const {faqs}=usePage<{faqs:IFrontFAQ[]}>().props;

    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="relative">
                <AuthLayout >
                <div className="relative z-10 mt-5">
                    <Slider  sliders={sliders}/>
                </div>
                <div className="relative z-10">
                    <ShopByCategory />
                </div>
                <div className="relative z-10">
                <NewArrivial products={products?.data ?? []} />
                </div>
                <div className="relative z-10">
                    <Trending />
                </div>
                <div className="relative z-10">
                    <NewsAndBlogs  blogs={blogs}/>
                </div>
                  
                <div className="relative z-10">
                    <FrquentlyAskQues  faqs={faqs}/>
                </div>
                <div className="relative z-10">
                    <CustomerReviews />
                </div>
                </AuthLayout>


            </div>
        </>
    );
}
