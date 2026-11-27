import { QattMural, QattMuralStrip, QattNiche } from "@/registry/qatt/ui/qatt-mural"

export default function QattMuralDemo() {
  return (
    <div className="flex w-full max-w-2xl flex-col gap-8">
      <div
        data-qatt-surface="gypsum"
        className="relative isolate grid min-h-80 place-items-center overflow-hidden border-4 border-qatt-black bg-qatt-white px-10 py-12"
      >
        <QattMural className="absolute inset-0" />
        <QattNiche className="relative px-8 py-6 text-center">
          <p className="font-heading text-2xl font-bold">جدارية قَطّ</p>
        </QattNiche>
      </div>
      <QattMuralStrip bands="mahareeb" />
    </div>
  )
}
