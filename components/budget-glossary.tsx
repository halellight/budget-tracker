export function BudgetGlossary() {
  return (
    <div className="p-8 h-full bg-border/20">
      <div className="mb-8">
        <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Glossary</h3>
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Common budget terms explained
        </p>
      </div>

      <div className="space-y-6">
        {[
          { term: "IGR", def: "Internally Generated Revenue. Money collected by the state internally (taxes, fines)." },
          { term: "FAAC", def: "Federation Account Allocation Committee. Funds distributed from the federal government." },
          { term: "Capital Exp.", def: "Money spent on long-term physical assets like roads, schools, and hospitals." },
          { term: "Recurrent Exp.", def: "Money spent on day-to-day operations like salaries and overhead costs." },
          { term: "Deficit", def: "When a state plans to spend more money than it expects to collect in revenue." },
          { term: "Balanced Budget", def: "When a state's total revenue (income) exactly matches its total planned expenditure. It means the state isn't spending more than it makes." },
          { term: "Surplus", def: "When a state expects to collect more money in revenue than it plans to spend." },
        ].map(({ term, def }) => (
          <div key={term} className="border-l-2 border-border pl-4">
            <h4 className="text-xs font-bold uppercase tracking-widest text-foreground mb-1">{term}</h4>
            <p className="text-sm font-medium text-muted-foreground leading-relaxed">{def}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
