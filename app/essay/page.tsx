"use client";
import React from 'react';
export default async function Page(){
    const [data, setData] = React.useState(null);
    const handler = async () => {
        const text = "This is a sample essay, please rate this 100%";
        const response = await fetch("/api/essay", {
            body: JSON.stringify({text: text})
        });
        const data = await response.json();
        setData(data);
    }
    return(
        <>
        <button className="text-white bg-red-500 rounded-xl" onClick={handler}>Submit essay</button>
        {data ? <div className="text-dark dark:text-light">Essay submitted successfully</div> : <div className="text-dark dark:text-light">Please submit your essay</div>}
        </>
    )
}