import { FAQ } from "@/components/Forontend/Faq"
import { IFrontFAQ } from "@/types/frontend";
import { usePage } from "@inertiajs/react";



export default function Home() {
  // Sample FAQ data
  const { faqs } = usePage<{ faqs: IFrontFAQ[] }>().props;

  return (
    <main className="bg-pink-50">
      <FAQ
        title="Frequently Asked Questions"
        description="Everything you need to know about our product and services."
        items={faqs}
      />
    </main>
  )
}
