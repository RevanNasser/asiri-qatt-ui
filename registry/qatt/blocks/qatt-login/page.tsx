"use client"

import { QattLogin } from "@/registry/qatt/blocks/qatt-login/qatt-login"

// Arabic defaults are built in (blocks.qatt-login.*); wire onSubmit to your auth.
export default function QattLoginPage() {
  return (
    <QattLogin
      description="حيّاكم من جديد. أدخلوا بياناتكم للمتابعة."
      forgotHref="#"
      signUpHref="#"
      providers={[{ id: "github", label: "GitHub" }]}
      onSubmit={async () => {
        await new Promise((resolve) => setTimeout(resolve, 600))
      }}
    />
  )
}
