type SuggestionProps = {
     suggestions: { title: string; value: string; score: number }[]


}

export default function SuggestionList( {suggestions}: SuggestionProps){

    return(

        <div className="flex  flex-col gap-5">
            <h2 className="text-2xl font-bold">Suggestions</h2>
            {suggestions.map((suggestion) =>(
                <div key={suggestion.title} className=" rounded-xl p-3 border-amber-400 border-2 mb-2 flex justify-between items-center gap-2 ">
                    <p className="text-xl text-black">{suggestion.title}</p>
                    <p className="text-xs text-gray-700">{suggestion.value}</p>

                </div>
            ) )}
        </div>
    )

}