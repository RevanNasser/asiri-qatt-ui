import { Input } from "@/registry/qatt/ui/input"

export default function InputDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <div className="grid gap-1.5">
        <label htmlFor="demo-email" className="text-sm font-medium">
          البريد الإلكتروني
        </label>
        <Input id="demo-email" type="email" dir="ltr" placeholder="name@example.com" />
      </div>
      <div className="grid gap-1.5">
        <label htmlFor="demo-password" className="text-sm font-medium">
          كلمة المرور
        </label>
        <Input id="demo-password" type="password" dir="ltr" variant="qatt" />
      </div>
    </div>
  )
}
