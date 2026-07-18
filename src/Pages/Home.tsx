import { useState } from "react";
import { fetchPageSpeed } from "../lib/pagespeed";
import ScoreGauge from "../components/ScoreGauge";
import MetricCard from "../components/MetricCard";
import SuggestionList from "../components/SuggestionList";
import URLInput from "../components/URLInput";
import { saveAudit } from "../lib/firebase";

type AuditResult = {
    score: number
    metrics: { label: string; value: string; category: string }[]
    suggestions: { title: string; value: string; score: number }[]
}

export default function Home() {

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState<AuditResult | null>(null);
    const [error, setError] = useState('');


    async function handleAudit(url: string, strategy: string) {

        setLoading(true);
        setResult(null);
        setError('');

        try {
            const data = await fetchPageSpeed(url, strategy);
            setResult(data);
            await saveAudit(data);
        }
        catch (err) {

            if (err instanceof Error) {
                setError(err.message);
            }

        } finally {
            setLoading(false)
        }

    }
    return (
        <div className=" p-5 flex  flex-col gap-5">

            <URLInput onSubmit={handleAudit}/>
             {loading && <p>Loading....</p>}
            {error && <p>{error}</p>}

            {result &&

                (
                    <>
                    <h2 className="text-2xl font-bold">Overall Score</h2>
                        <ScoreGauge score={result.score} />
                        <h2 className="text-2xl font-bold">Metrics</h2>
                        <div className="flex gap-2 flex-wrap">
                            {result.metrics.map((metric) => (
                                <MetricCard 
                                key={metric.label}
                                label={metric.label}
                                value={metric.value}
                                category={metric.category}
                                />

                            ))}

                        </div>
                        <SuggestionList suggestions={result.suggestions}/>

                       
                    </>

                )}

        </div>
    )
}

