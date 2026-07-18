import { useState } from "react";
import { fetchPageSpeed } from "../lib/pagespeed";

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
        <div>
            <button onClick={() => handleAudit("https://alldigitech.com", "desktop")}> Audit</button>

            {loading && <p>Loading....</p>}
            {error && <p>{error}</p>}
            
            {result && <pre>{JSON.stringify(result, null, 2)}</pre>}

        </div>
    )
}

