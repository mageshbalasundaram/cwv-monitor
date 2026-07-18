type MetricCardProps = {
     label: string; value: string; category: string 
}


function getCategoryColor(category: string): string {

    if (category === "good") return " text-green-600 border-green-500"
    if (category === "needs-improvement") return "text-amber-500 border-amber-400"
    return "text-red-600 border-red-500"



}


export default function MetricCard({ label, value, category }: MetricCardProps) {


    return (

        <div className="flex flex-col justify-center " > 
            <div className={`${getCategoryColor(category)} border-2 rounded-2xl p-3 flex gap-2 `}>
                <h2>{label}</h2>
                <h3>{value}</h3>
                <p>{category}</p>
            </div>
        </div>
    )

}