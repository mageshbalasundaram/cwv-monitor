import { useEffect, useState } from "react"
import { getAudits } from "../lib/firebase";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";



export default function History() {

    const [audits, setAudits] = useState<any[]>([]);


    const chartData = audits.map((audit) => ({
        date: audit.savedAt.slice(0, 10) ?? "unknown",
        score: audit.score
    }))

    useEffect(() => {

        async function fetchData() {


            const data = await getAudits()
            setAudits(data);

        }

        fetchData();

    }, [])

    return (
        <div>
            <h1>Audit History</h1>
            <ResponsiveContainer width="100%" height={300}>

                <LineChart data={chartData}>

                    <XAxis dataKey="date" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line dataKey="score" stroke="#6366f1" strokeWidth={2} dot={true} />
                </LineChart>


            </ResponsiveContainer>
            <div>
                {audits.map((audit) => (
                    <div key={audit.id} className="flex justify-between border-b py-3">
                        <span className="text-sm text-gray-500"> {audit.savedAt?.slice(0, 10)}</span>
                        <span className="text-sm font-medium">{audit.url}</span>
                        <span className="text-sm">{audit.strategy}</span>
                        <span className="font-bold">{audit.score}</span>

                    </div>
                ))}
            </div>


        </div>
    )

}