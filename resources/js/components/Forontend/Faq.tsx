"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"


interface FAQItem {
  id: string
  question: string
  answer: string
}

// Props interface for the FAQ component
interface FAQProps {
  title?: string
  description?: string
  items: FAQItem[]
}

export function FAQ({ title = "Frequently Asked Questions", description, items }: FAQProps) {
  return (
    <div className="w-full max-w-3xl mx-auto py-12 px-4">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
        {description && <p className="mt-4 text-muted-foreground">{description}</p>}
      </div>

      <Accordion type="single" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left text-md">{item.question}</AccordionTrigger>
            <AccordionContent>
              <div
                className="text-muted-foreground text-md"
                dangerouslySetInnerHTML={{ __html: item.answer }}
              ></div>

            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
