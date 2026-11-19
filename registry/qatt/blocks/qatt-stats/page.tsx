import { QattStats } from "@/registry/qatt/blocks/qatt-stats/qatt-stats"

// Labels from Heritage copy (blocks.qatt-stats.*); the figures are fictional samples.
export default function QattStatsPage() {
  return (
    <QattStats
      title="أرقامٌ تحكي القصة"
      note="أرقامٌ افتراضية للعرض، فاستبدلوها بأرقامكم."
      stats={[
        { value: 12000, suffix: "+", label: "مستخدمٌ نشِط" },
        { value: 98, suffix: "%", label: "نسبة رضا العملاء" },
        { value: 450, label: "فريقٌ يعتمد علينا" },
        { value: 99.9, suffix: "%", label: "جاهزية الخدمة", format: { maximumFractionDigits: 1 } },
      ]}
    />
  )
}
