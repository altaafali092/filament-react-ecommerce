import AuthLayout from '@/pages/layout/AuthLayout'
import { IFrontBlogs } from '@/types/frontend'
import { Head, Link, usePage } from '@inertiajs/react'

export default function BlogsIndex() {
    const {
        props: { blogs = [] },
    } = usePage<{ blogs?: IFrontBlogs[] }>()

    return (
        <AuthLayout>
            <Head title='Blogs'/>
            <div className=" w-full bg-gradient-to-r from-gray-300 to-purple-300 dark:from-blue-700 dark:to-purple-700 py-10">
                <div className="mx-auto px-4 max-w-5xl mt-30">
                    <h1 className="text-2xl font-extrabold text-center text-white mb-8 tracking-widest uppercase md:text-3xl">
                        Blogs
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {blogs.map((blog) => (
                            <article
                                key={blog.id}
                                className="group bg-white rounded-md overflow-hidden border border-gray-200 hover:border-neon-400 transition-all duration-300 hover:shadow-[0_0_10px_rgba(34,197,94,0.3)]"
                            >
                                <img
                                    src={blog.image}
                                    alt={blog.title}
                                    className="w-full h-36 object-cover group-hover:brightness-105 transition-all duration-200"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-neon-400 transition-colors">
                                        {blog.title}
                                    </h2>
                                    <p className="text-gray-500 text-xs mt-1 line-clamp-2">
                                        {blog.excerpt}
                                    </p>
                                    <Link

                                        href={route('blogs.show',blog.slug)}
                                        className="mt-2 inline-block text-xs font-medium text-gray-600 group-hover:text-neon-400 uppercase tracking-wide hover:text-red-500"
                                    >
                                        Read Now →
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                </div>
            </div>
        </AuthLayout>
    )
}
