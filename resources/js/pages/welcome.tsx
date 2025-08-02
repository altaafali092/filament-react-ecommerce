
import { Head, usePage } from '@inertiajs/react';

import AuthLayout from './layout/AuthLayout';
import ShopByCategory from './index/ShopByCatregory';
import Trending from './index/Trending';

import NewsAndBlogs from './index/NewsAndBlog';
import CustomerReviews from './index/Review';
import NewArrivial from './index/NewArrivial';
import MostOdered from './index/MostOdered';
import FrquentlyAskQues from './index/FrequentlyAskQues';
import { IFrontBlogs, IfrontCategory, IFrontFAQ, IFrontProduct, IFrontSlider } from '@/types/frontend';
import Slider from './index/Slider';
import MostOrdered from './index/MostOdered';


export default function Welcome() {
    // const { auth  } = usePage<SharedData>().props;
    const {
        products,
        mostOrderedProducts,
        blogs,
        sliders,
        faqs,
        categories
    } = usePage<{
        products: { data: IFrontProduct[] },
        mostOrderedProducts: { data: IFrontProduct[] },
        blogs: IFrontBlogs[],
        sliders: IFrontSlider[],
        faqs: IFrontFAQ[],
        categories: IfrontCategory[]
    }>().props;



    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="relative">
                <AuthLayout >
                    <div className="relative z-10 mt-5">
                        <Slider sliders={sliders} />
                    </div>
                    <div className="relative z-10">

                        <ShopByCategory categories={categories} />

                    </div>
                    <div className="relative z-10">
                        <NewArrivial products={products?.data ?? []} />
                    </div>
                    {
                        mostOrderedProducts?.data?.length > 0 && (
                            <div className="relative z-10">
                                <MostOdered mostOrderedProducts={mostOrderedProducts?.data ?? []} />
                            </div>
                        )
                    }
                    <div className="relative z-10">
                        <Trending />
                    </div>
                    <div className="relative z-10">
                        <NewsAndBlogs blogs={blogs} />
                    </div>

                    {/* <div className="relative z-10">
                    <FrquentlyAskQues  faqs={faqs}/>
                </div> */}
                    <div className="relative z-10">
                        <CustomerReviews />
                    </div>
                </AuthLayout>


            </div>
        </>
    );
}
