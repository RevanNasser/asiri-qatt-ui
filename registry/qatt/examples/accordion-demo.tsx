"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/registry/qatt/ui/accordion"

export default function AccordionDemo() {
  return (
    <Accordion variant="qatt" defaultValue={["rtl"]} className="w-full max-w-md">
      <AccordionItem value="rtl">
        <AccordionTrigger>العربية أولًا</AccordionTrigger>
        <AccordionContent>
          صُمّم كلّ مكوّن للاتجاه من اليمين إلى اليسار منذ البداية، لا ترجمةً لاحقة. الخصائص المنطقية والخطوط العربية
          والأرقام كلّها في مكانها.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="a11y">
        <AccordionTrigger>سهولة الوصول</AccordionTrigger>
        <AccordionContent>
          مبنيٌّ على <bdi>Base UI</bdi>، يدعم لوحة المفاتيح وقارئات الشاشة، وألوانه مختبَرة للتباين.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="open">
        <AccordionTrigger>مفتوح المصدر</AccordionTrigger>
        <AccordionContent>مجانيٌّ ومفتوح، ونرحّب بمساهماتكم كما يُرحَّب بالضيف.</AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
