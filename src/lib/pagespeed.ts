


const BASE_URL = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

   const metricDefs = [
  { key: "largest-contentful-paint", label: "LCP" },
  { key: "cumulative-layout-shift", label: "CLS" },
  { key: "total-blocking-time", label: "TBT" },
  { key: "first-contentful-paint", label: "FCP" },
  { key: "server-response-time", label: "TTFB" },
]

export async function fetchPageSpeed(url: string, strategy: string) {


    const apiKey = import.meta.env.VITE_PAGESPEED_API_KEY

    const params = new URLSearchParams({
        url,
        strategy,
        category : "performance",
        key: apiKey

    })

    try{

         const response = await fetch(`${BASE_URL}?${params}`);

    if(!response.ok){
        throw new Error("API Error:" + response.status)

    }

    const data =  await response.json();    
    console.log(data);

    const score = getScore(data);
    const metrics = getMetrics(data);
    const suggestions = getSuggestions(data);

    



    return {score, metrics, suggestions};

    }catch (err) {
        if( err instanceof Error){
            
        console.log("pagespeed fetch failed: ", err.message)

        }

        throw err;

    }
}

export function getScore(data: any){

    const score = data?.lighthouseResult?.categories?.performance?.score ?? 0

    const finalScore = Math.round(score * 100)
    
    console.log(finalScore);

    return finalScore

    
}

function scoreToCategory(score: number): string {

    if( score >= 0.9){
        return "good"
    }else if(score >= 0.5){

        return "needs-improvement"
    }else{
        return "poor"
    }
} 

const suggestionKeys = [
  "render-blocking-insight",
  "unused-javascript",
  "unminified-css",
  "redirects",
  "document-latency-insight",
  "image-delivery-insight",
  "duplicated-javascript-insight",
  "cache-insight",
]
function getMetrics( data: any){

    const metrics = metricDefs.map( (metricDef ) => {
        
        const audit = data?.lighthouseResult?.audits?.[metricDef.key] 

    const displayValue = audit?.displayValue ?? "-"
    const score = audit?.score ?? 0;

    const category = scoreToCategory(score);

    console.log({ label: metricDef.label, value: displayValue, category: category})

    return {
        label: metricDef.label, value: displayValue, category: category
    }
    })

    // this retun statement retun a values of the metrics 

    return metrics

    // this return statement return the whoile code like puch of this code 

}

function getSuggestions(data: any){
    console.log(Object.keys(data?.lighthouseResult?.audits))



    const suggestions = suggestionKeys.map( (key) => {
        const audit = data?.lighthouseResult?.audits?.[key]

        const title = audit?.title ?? "-"
        const value = audit?.displayValue ?? "-"
        const score = audit?.score

        return{title, value, score}
    })
    .filter((item) => item.score !== undefined && item.score !== 1)

    console.log(suggestions)
    return suggestions
}



// "I built a service layer that calls Google's PageSpeed Insights API, parses the raw Lighthouse JSON into clean objects 
// — score, metrics, suggestions — and handles errors at two levels: network failures with try/catch, and bad responses with response.ok. 
// I used optional chaining throughout because real API responses can have missing fields, and I learned that the difference between 
// fetch throwing and response.ok being false is something you have to handle separately."