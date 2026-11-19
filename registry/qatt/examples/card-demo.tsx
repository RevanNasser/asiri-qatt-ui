import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/registry/qatt/ui/card"

export default function CardDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>العربية أولًا</CardTitle>
          <CardDescription>لماذا قَطّ؟</CardDescription>
        </CardHeader>
        <CardContent>
          صُمّم كلّ مكوّن للاتجاه من اليمين إلى اليسار منذ البداية، لا ترجمةً لاحقة. الخصائص المنطقية والخطوط العربية
          والأرقام كلّها في مكانها.
        </CardContent>
      </Card>
      <Card variant="framed">
        <CardHeader>
          <CardTitle>فاتحٌ وداكن</CardTitle>
          <CardDescription>لماذا قَطّ؟</CardDescription>
        </CardHeader>
        <CardContent>
          ألوانٌ مستوحاة من أصباغ عسير الطبيعية: أبيض الجصّ، وأحمر المَشقة، وأصفر الصَّفرة، وأسود الفحم.
        </CardContent>
      </Card>
    </div>
  )
}
