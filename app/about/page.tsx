import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about ngtrak., our mission, and our data sources.",
}

export default function AboutPage() {
  return (
    <div className="container mx-auto px-4 sm:px-6 py-16 lg:py-24 max-w-4xl">
      <div className="mb-16">
        <p className="text-primary text-xs font-bold uppercase tracking-widest mb-4">Mission</p>
        <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter leading-none mb-8">
          Data for <br/>The Public<span className="text-primary">.</span>
        </h1>
        <p className="text-xl md:text-2xl text-muted-foreground font-medium leading-relaxed">
          ngtrak. was built to close the gap between citizens and state governments. 
          We believe fiscal transparency is the baseline for accountability.
        </p>
      </div>

      <div className="sharp-border bg-card mb-16">
        <div className="p-8 border-b border-border">
          <h2 className="text-2xl font-black uppercase tracking-tight mb-2">Our Principles</h2>
          <p className="text-sm font-bold uppercase tracking-widest text-muted-foreground">What guides this project</p>
        </div>
        <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border">
          <div className="p-8">
            <div className="text-primary font-black text-4xl mb-4">01</div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-3">Accuracy First</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">
              We do not aggregate or estimate. Every figure reflects an official, signed appropriation bill from a state government.
            </p>
          </div>
          <div className="p-8">
            <div className="text-primary font-black text-4xl mb-4">02</div>
            <h3 className="text-lg font-black uppercase tracking-widest mb-3">Accessibility</h3>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Government PDFs are opaque by design. We structure, digitize, and present this data so anyone can understand it in seconds.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-3xl font-black uppercase tracking-tight mb-8">Data Sources</h2>
        <div className="space-y-4">
          {[
            { 
              name: "State Governments", 
              desc: "Direct downloads of signed Appropriation Acts from official state portals." 
            },
            { 
              name: "Open Treasury", 
              desc: "Cross-referenced with the Federal Government's Open Treasury Portal for FAAC allocations." 
            },
            { 
              name: "NBS", 
              desc: "Population and demographic estimates from the National Bureau of Statistics." 
            }
          ].map((source, i) => (
            <div key={i} className="sharp-border bg-card p-6 flex flex-col sm:flex-row gap-4 sm:items-center">
              <div className="w-48 flex-shrink-0 text-sm font-bold uppercase tracking-widest text-foreground">
                {source.name}
              </div>
              <div className="text-muted-foreground font-medium">
                {source.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-10 border-t border-border">
        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground text-center">
          Open Source. Open Data.
        </p>
      </div>
    </div>
  )
}
