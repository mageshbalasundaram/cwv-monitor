import { useEffect, useState } from "react"
import { getAudits } from "../lib/firebase";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

 

export default function History(){

    const [audits, setAudits] = useState<any[]>([]);

    const chartData = audits.map((audit) => ({
        date: audit.savedAt.slice(0, 10) ?? "unknown",
        score: audit.score
    }))

    useEffect(() => {

        async function fetchData(){


            const data = await getAudits()
            setAudits(data);
            
        }

        fetchData();

    }, [])

    return(
        <div>
            <h1>Audit History</h1>
            <ResponsiveContainer width="100%" height={300}>

                <LineChart data={chartData}>

                    <XAxis dataKey="date"/>
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line dataKey="score" stroke="#6366f1" strokeWidth={2} dot={true} />
                </LineChart>


            </ResponsiveContainer>


        </div>
    )

}