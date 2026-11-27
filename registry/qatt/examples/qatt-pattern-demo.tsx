import { QattPattern } from "@/registry/qatt/ui/qatt-pattern"

export default function QattPatternDemo() {
  return (
    <div className="grid w-full max-w-2xl gap-4 sm:grid-cols-3">
      <QattPattern motif="balsanah" colors={["ink", "red"]} className="h-32 rounded-md border" />
      <QattPattern motif="shabakah" variant="lattice" colors={["ink", "blue"]} scale="lg" className="h-32 rounded-md border" />
      <QattPattern preset="full" scale="sm" surface="gypsum" className="h-32 rounded-md border" />
    </div>
  )
}
