import { useState } from "react";

type URLInputProps = {
  onSubmit: (url: string, strategy: string) => void
}



export default function URLInput( {onSubmit}: URLInputProps){

    const [url, setUrl] = useState("");

    const [strategy, setStrategy] = useState("mobile")

    function handleSubmit(){
    if(!url) return
    onSubmit(url, strategy)
}


    return(
        <div className="flex flex-col gap-2 " >

        <input value={url} onChange={(e) => setUrl(e.target.value)} required placeholder="Enter your website URL"  className=" border border-blue-500 p-2"/>

        <button onClick={() => setStrategy("mobile")} className=" border-2 border-blue-500 hover:bg-blue-700 text-blue-400 font-bold py-2 px-4 rounded" > Mobile</button>
        <button onClick={ () => setStrategy("desktop")}className=" border-2 border-blue-500 hover:bg-blue-700 text-blue-400 font-bold py-2 px-4 rounded"  > Desktop</button>
        <button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Audit </button>

        </div>
    )
}
