type ScoreGaugeProps ={
    score: number
}

function getScoreColor( score: number): string {

    if( score >= 90) return "text-green-600 border-green-600"
    if( score >= 50) return "text-amber-500 border-amber-500"
    return "text-red-600 border-red-600 "
}

export default function ScoreGauge( {score}: ScoreGaugeProps){





    return(
        
            <div className={`${getScoreColor(score)} w-32 h-32 rounded-full border-4 flex items-center justify-center text-3xl font-bold`}>
                {score}

            </div>
            


    
    )
}