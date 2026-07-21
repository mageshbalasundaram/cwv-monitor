import { useState } from "react";

type URLInputProps = {
    onSubmit: (url: string, strategy: string) => void;
    showStrategyButtons: boolean;
}



export default function URLInput({ onSubmit, showStrategyButtons, }: URLInputProps) {

    const [url, setUrl] = useState("");

    const [strategy, setStrategy] = useState("mobile")

    function handleSubmit() {
        if (!url) return
        onSubmit(url, strategy)
    }


    return (
        <div className="flex flex-col  gap-5 w-full " >

            <div className="flex  gap-5 w-full " >



                <input value={url} onChange={(e) => setUrl(e.target.value)} required placeholder="Enter your website URL" className=" border border-blue-500 p-2 w-[80%]" />

                <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Audit </button>

            </div>

            

                {showStrategyButtons && (
                    <div className="flex gap-2.5 w-full items-center justify-center">

                <button onClick={() => setStrategy("mobile")} className=" border-2 border-blue-500 hover:bg-blue-700 text-blue-400 font-bold py-2 px-4 rounded" > Mobile</button>
                <button onClick={ () => setStrategy("desktop")}className=" border-2 border-blue-500 hover:bg-blue-700 text-blue-400 font-bold py-2 px-4 rounded"  > Desktop</button>

                </div>
                )}

            

        </div>
    )
}
