import AppLogoIcon from '@/components/app-logo-icon';
import { type SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { Home } from 'lucide-react';
import { type PropsWithChildren } from 'react';

interface AuthLayoutProps {
    title?: string;
    description?: string;
}

export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
    const { name, quote } = usePage<SharedData>().props;

    return (
        <div className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0">
            <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r overflow-hidden">
                {/* Background Image with Enhanced Clarity */}
                <div className="absolute inset-0">
                    <img
                        src="https://i.pinimg.com/736x/fa/c5/ba/fac5ba7857b1bdebe54b08be0c2282b9.jpg"
                        alt="Fashion Background"
                        className="h-full w-full object-cover object-center transform scale-105 transition-transform duration-[2s] hover:scale-110"
                    />
                    {/* Lighter Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-transparent" />
                    {/* Subtle Animated Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-500/10 via-purple-500/10 to-blue-500/10 mix-blend-overlay animate-gradient" />
                </div>

                {/* Logo Section with Enhanced Contrast */}
                <div className='flex justify-between items-center w-full'>
                    <Link
                        href={route('home')}
                        className="relative z-20 flex items-center text-lg font-medium hover:scale-105 transition-transform duration-300"
                    >
                        <AppLogoIcon className="mr-2 size-8 fill-current text-white drop-shadow-lg" />
                        <span className="bg-gradient-to-r from-white via-white to-purple-100 bg-clip-text text-transparent font-bold drop-shadow-lg">
                            Xyz Fashion hub
                        </span>
                    </Link>

                    <Link
                        href={route('index')}
                        className="relative z-20 flex items-center text-lg bg-green-300  px-4 py-2 rounded-full font-medium hover:scale-105 transition-transform duration-300 text-white"
                    >
                     <Home className='h-4'/>
                    </Link>
                </div>

                {/* Quote Section with Enhanced Glass Effect */}
                {quote && (
                    <div className="relative z-20 mt-auto">
                        <blockquote className="space-y-2 backdrop-blur-md bg-white/10 p-6 rounded-2xl border border-white/20 shadow-xl">
                            <p className="text-lg font-light italic drop-shadow-lg">
                                &ldquo;{quote.message}&rdquo;
                            </p>
                            <footer className="text-sm text-white font-medium drop-shadow-lg">
                                — {quote.author}
                            </footer>
                        </blockquote>
                    </div>
                )}

                {/* Refined Decorative Elements */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
            </div>
            <div className="w-full lg:p-8">
                <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                    <Link href={route('home')} className="relative z-20 flex items-center justify-center lg:hidden">
                        <AppLogoIcon className="h-10 fill-current text-black sm:h-12" />
                    </Link>
                    <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
                        <h1 className="text-xl font-medium">{title}</h1>
                        <p className="text-muted-foreground text-sm text-balance">{description}</p>
                    </div>
                    {children}
                </div>
            </div>
        </div>
    );
}
