import { AlertCircle, ExternalLink, Newspaper, Scale } from "lucide-react"
import { corruptionArticles } from "@/lib/corruption-data"

interface StateNewsProps {
  stateName: string
}

function getArticlesForState(stateName: string) {
  // Normalize by removing " state" if it exists at the end
  let rawName = stateName.toLowerCase();
  if (rawName.endsWith(' state')) {
    rawName = rawName.substring(0, rawName.length - 6);
  }

  // Normalize FCT for matching
  const normalizedStateName = rawName === 'fct' 
    ? 'federal capital territory' 
    : rawName;

  // Find articles specifically about this state
  const stateSpecific = corruptionArticles.filter(
    (article) => article.state.toLowerCase() === normalizedStateName
  );

  // If the user hasn't uploaded specific state data or it mismatches, fallback deterministically
  if (stateSpecific.length < 3) {
    const otherArticles = corruptionArticles.filter(
      (article) => article.state.toLowerCase() !== normalizedStateName
    );
    let hash = 0;
    for (let i = 0; i < stateName.length; i++) {
      hash = stateName.charCodeAt(i) + ((hash << 5) - hash);
    }
    for (let i = 0; stateSpecific.length < 3 && i < otherArticles.length; i++) {
      const index = Math.abs((hash + i * 17) % otherArticles.length);
      if (!stateSpecific.includes(otherArticles[index])) {
         stateSpecific.push(otherArticles[index]);
      }
    }
  }

  // Format the data to match the UI requirements
  return stateSpecific.slice(0, 6).map((article, i) => ({
    id: `${article.state.toLowerCase()}-${i}`,
    title: article.title,
    excerpt: article.excerpt,
    link: article.link !== "#" ? article.link : null,
    source: "Transparency Archive",
    date: "Case Record"
  }));
}

export function StateNews({ stateName }: StateNewsProps) {
  const newsItems = getArticlesForState(stateName);

  if (!newsItems || newsItems.length === 0) {
    return null;
  }

  return (
    <div className="mb-16">
      <div className="flex items-center gap-3 mb-8">
        <h2 className="text-3xl font-black uppercase tracking-tight">Accountability Watch</h2>
        <div className="bg-destructive/10 text-destructive px-3 py-1 text-xs font-bold uppercase tracking-widest flex items-center gap-2">
          <Scale className="w-3 h-3" />
          Corruption & Fraud Tracker
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border sharp-border">
        {newsItems.map((news) => (
          <div key={news.id} className="bg-card p-6 flex flex-col hover:bg-card/80 transition-colors group">
            <div className="flex justify-between items-start mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                <Newspaper className="w-3 h-3" />
                {news.source}
              </span>
              <span className="text-xs font-bold text-muted-foreground">{news.date}</span>
            </div>
            
            <h3 className="text-lg font-black leading-tight mb-3 group-hover:text-primary transition-colors line-clamp-3">
              {news.title}
            </h3>
            
            {news.excerpt && (
              <p className="text-sm font-medium text-muted-foreground mb-6 flex-grow">
                {news.excerpt}
              </p>
            )}
            
            {news.link ? (
              <a 
                href={news.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary hover:text-foreground transition-colors mt-auto pt-4"
              >
                Read Source <ExternalLink className="w-3 h-3" />
              </a>
            ) : (
              <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-foreground mt-auto pt-4">
                Internal Record
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
