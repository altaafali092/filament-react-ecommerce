
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Instagram,  Youtube, CreditCard, Truck, ShieldCheck, Facebook } from "lucide-react"
import { Link, usePage } from "@inertiajs/react"
import { IFrontOfficeSetting } from "@/types/frontend"

// Custom TikTok icon since it's not in Lucide by default
function TikTok() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path>
    </svg>
  )
}



export function Footer() {

const { officeSettings } = usePage<{ officeSettings: IFrontOfficeSetting | null }>().props;
// console.log(officeSettings)
  return (
    <footer className="bg-black text-white">
      {/* Newsletter Section with Gradient */}
      <div className="bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400">
        <div className="container px-4 py-10 mx-auto">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {/* Newsletter */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Stay in the loop 👀</h3>
              <p className="text-white/80">Get exclusive drops, discount codes and more straight to your inbox!</p>
              <div className="flex w-full max-w-sm space-x-2">
                <Input
                  type="email"
                  placeholder="Your email"
                  className="bg-white/20 border-0 placeholder:text-white/60 text-white focus-visible:ring-white"
                />
                <Button type="submit" className="bg-white text-black hover:bg-white/90 font-medium">
                  Join
                </Button>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div className="flex items-center space-x-2 bg-white/10 p-3 rounded-lg">
                <Truck className="w-5 h-5" />
                <span className="text-sm font-medium">Free shipping on $50+</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 p-3 rounded-lg">
                <CreditCard className="w-5 h-5" />
                <span className="text-sm font-medium">Buy now, pay later</span>
              </div>
              <div className="flex items-center space-x-2 bg-white/10 p-3 rounded-lg">
                <ShieldCheck className="w-5 h-5" />
                <span className="text-sm font-medium">30-day easy returns</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-4">
          {/* Shop */}
          <div className="space-y-5">
          <h4 className="text-lg font-bold">{officeSettings?.office_name}</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/trending" className="text-white/70 hover:text-pink-400 transition-colors">
                  Trending Now 🔥
                </Link>
              </li>
              <li>
                <Link href="/new-drops" className="text-white/70 hover:text-pink-400 transition-colors">
                  New Drops
                </Link>
              </li>
              <li>
                <Link href="/collections/bestsellers" className="text-white/70 hover:text-pink-400 transition-colors">
                  Bestsellers
                </Link>
              </li>
              <li>
                <Link href="/collections/sale" className="text-white/70 hover:text-pink-400 transition-colors">
                  Sale & Outlet
                </Link>
              </li>
            </ul>
          </div>

          {/* About */}
          <div className="space-y-5">
            <h4 className="text-lg font-bold">About Us</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/our-story" className="text-white/70 hover:text-pink-400 transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/sustainability" className="text-white/70 hover:text-pink-400 transition-colors">
                  Sustainability Pledge
                </Link>
              </li>
              <li>
                <Link href="/community" className="text-white/70 hover:text-pink-400 transition-colors">
                  Community
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-white/70 hover:text-pink-400 transition-colors">
                  Join Our Team
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div className="space-y-5">
            <h4 className="text-lg font-bold">Help</h4>
            <ul className="space-y-3">
              <li>
                <Link href={route('faqs.index')} className="text-white/70 hover:text-pink-400 transition-colors">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-white/70 hover:text-pink-400 transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-white/70 hover:text-pink-400 transition-colors">
                  Returns & Exchanges
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-white/70 hover:text-pink-400 transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div className="space-y-5">
            <h4 className="text-lg font-bold">Connect</h4>
            <div className="flex flex-wrap gap-3">
              <Link
                href={officeSettings?.office_instagram ??''}
                className="bg-white/10 p-3 rounded-full hover:bg-pink-500 transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link
                href={officeSettings?.office_tiktok??''}
                className="bg-white/10 p-3 rounded-full hover:bg-pink-500 transition-colors"
              >
                <TikTok />
                <span className="sr-only">TikTok</span>
              </Link>
              <Link
                href={officeSettings?.office_facebook??''}
                className="bg-white/10 p-3 rounded-full hover:bg-pink-500 transition-colors"
              >
                <Facebook className="w-5 h-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link
                href={officeSettings?.office_youtube??''}
                className="bg-white/10 p-3 rounded-full hover:bg-pink-500 transition-colors"
              >
                <Youtube className="w-5 h-5" />
                <span className="sr-only">YouTube</span>
              </Link>
            </div>

            <div className="pt-2">

              <Button className="bg-gradient-to-r from-blue-500 to-purple-500">
                <Link href={route('vendor.registerPage')}>
                Become a vendor
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-white/10">
        <div className="container px-4 py-6 mx-auto">
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            {/* Copyright */}
            <div className="flex flex-col items-center md:items-start space-y-2">
              <p className="text-sm text-white/60">© {new Date().getFullYear()} Your Brand. All rights reserved.</p>
              <div className="flex space-x-4 text-xs text-white/60">
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms
                </Link>
                <Link href="/accessibility" className="hover:text-white transition-colors">
                  Accessibility
                </Link>
              </div>
            </div>

            {/* Payment Methods */}
            <div className="flex items-center space-x-2">
              <div className="flex space-x-1">
                {/* Modern payment method icons with gradients */}
                <div
                  className="w-12 h-7 bg-gradient-to-r from-blue-500 to-purple-500 rounded-md"
                  aria-label="Visa"
                ></div>
                <div
                  className="w-12 h-7 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-md"
                  aria-label="Mastercard"
                ></div>
                <div
                  className="w-12 h-7 bg-gradient-to-r from-green-400 to-emerald-500 rounded-md"
                  aria-label="Apple Pay"
                ></div>
                <div
                  className="w-12 h-7 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-md"
                  aria-label="PayPal"
                ></div>
                <div
                  className="w-12 h-7 bg-gradient-to-r from-pink-500 to-rose-500 rounded-md"
                  aria-label="Klarna"
                ></div>
                <div
                  className="w-12 h-7 bg-gradient-to-r from-purple-500 to-indigo-500 rounded-md"
                  aria-label="Afterpay"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

