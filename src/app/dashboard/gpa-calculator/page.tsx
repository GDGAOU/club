import { GPACalculator } from "@/components/dashboard/gpa-calculator/gpa-calculator"

export default function GPACalculatorPage() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/60 bg-clip-text text-transparent">
          GPA Calculator
        </h2>
      </div>
      <GPACalculator />
    </div>
  )
}
