import AuthLayout from '@/pages/layout/AuthLayout'
import { IFrontBlogs } from '@/types/frontend'
import { Head, Link, usePage } from '@inertiajs/react'
import { ArrowLeft, ArrowRight, ArrowUpLeft } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function BlogsDetail() {
    const {props: { blog },} = usePage<{ blog: IFrontBlogs }>()

    const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    })

    return (
        <AuthLayout>
            <Head title={blog.title} />
            <div className="min-h-screen w-full bg-gradient-to-r from-gray-300 to-purple-300 dark:from-blue-700 dark:to-purple-700 py-10 px-4">

                <div className="max-w-3xl mx-auto mt-30">
                    <Card className="border-0 shadow-none bg-white">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-xl font-medium text-gray-900">
                                {blog.title}
                            </CardTitle>
                            <div className="text-xs text-gray-400">
                                <span>{formattedDate}</span>
                                <span className="mx-1">·</span>
                                <span>{blog.published_by}</span>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                            <img
                                src={blog.image}
                                alt={blog.title}
                                className="w-full h-90 object-cover  mb-4"
                            />
                            <article
                                className="prose prose-sm text-gray-800 leading-normal"
                                dangerouslySetInnerHTML={{ __html: blog.description }}
                            />

                            <div className="mt-8 flex justify-between items-center">

                                    <Button variant="outline" size="sm" asChild>
                                        <Link href={route('blogs.index')} className="flex items-center gap-2">
                                            <ArrowLeft className="w-4 h-4" />
                                            <span>Back</span>
                                        </Link>
                                    </Button>


                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AuthLayout>
    )
}
