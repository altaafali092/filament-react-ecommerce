import { type SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import Navbar from './layout/Navbar';

import AuthLayout from './layout/AuthLayout';
import ShopByCategory from './index/ShopByCatregory';
import Trending from './index/Trending';

import NewsAndBlogs from './index/NewsAndBlog';
import CustomerReviews from './index/Review';
import NewArrivial from './index/NewArrivial';
import { IFrontProduct } from '@/types/frontend';
import Slider from './index/Slider';


export default function Welcome() {
    const { auth  } = usePage<SharedData>().props;
    const{products}=usePage<{products:IFrontProduct[]}>().props;

    return (
        <>
            <Head title="Home">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600" rel="stylesheet" />
            </Head>

            <div className="relative">
                <AuthLayout >
                <div className="relative z-10 mt-5">
                    <Slider />
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
                    <NewsAndBlogs />
                </div>
                <div className="relative z-10">
                    <CustomerReviews />
                </div>
                </AuthLayout>


            </div>
        </>
    );
}
