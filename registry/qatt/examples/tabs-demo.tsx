"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/registry/qatt/ui/tabs"

export default function TabsDemo() {
  return (
    <Tabs defaultValue="rtl" className="w-full max-w-md">
      <TabsList variant="qatt">
        <TabsTrigger value="rtl">العربية أولًا</TabsTrigger>
        <TabsTrigger value="shadcn">
          متوافق مع <bdi>shadcn/ui</bdi>
        </TabsTrigger>
        <TabsTrigger value="open">مفتوح المصدر</TabsTrigger>
      </TabsList>
      <TabsContent value="rtl">
        صُمّم كلّ مكوّن للاتجاه من اليمين إلى اليسار منذ البداية، لا ترجمةً لاحقة. الخصائص المنطقية والخطوط العربية والأرقام
        كلّها في مكانها.
      </TabsContent>
      <TabsContent value="shadcn">
        ثبِّتوا ما تحتاجونه بأمر <bdi>shadcn</bdi> المعتاد، فالشيفرة تصير في مشروعكم، تعدّلونها كما تشاؤون.
      </TabsContent>
      <TabsContent value="open">مجانيٌّ ومفتوح، ونرحّب بمساهماتكم كما يُرحَّب بالضيف.</TabsContent>
    </Tabs>
  )
}
