import { BABY_STEPS } from '@/lib/babySteps'

export function BabyStepLadder({ currentStep }: { currentStep: string }) {
  const currentIndex = BABY_STEPS.findIndex(s => s.value === currentStep)

  return (
    <div className="overflow-x-auto">
      <div className="flex items-center min-w-max px-1 py-2">
        {BABY_STEPS.map((step, i) => {
          const isDone = i < currentIndex
          const isCurrent = i === currentIndex
          return (
            <div key={step.value} className="flex items-center">
              <div className="flex flex-col items-center gap-1.5 w-16">
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${
                    isDone
                      ? 'bg-primary text-primary-foreground'
                      : isCurrent
                        ? 'bg-primary text-primary-foreground ring-4 ring-primary/20'
                        : 'bg-background border-2 border-border text-muted-foreground'
                  }`}
                >
                  {isDone ? '✓' : i + 1}
                </div>
                <span
                  className={`text-[10px] text-center leading-tight ${
                    isCurrent ? 'text-foreground font-medium' : 'text-muted-foreground'
                  }`}
                >
                  BS{step.value}
                </span>
              </div>
              {i < BABY_STEPS.length - 1 && (
                <div className={`h-0.5 w-6 -mt-4 shrink-0 ${isDone ? 'bg-primary' : 'bg-border'}`} />
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
