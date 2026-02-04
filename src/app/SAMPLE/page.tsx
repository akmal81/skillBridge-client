

export default async function SamplePage() {

await new Promise((resolve)=> setTimeout(resolve, 4000))

    // throw new Error("Something went wrong");
    
    return(
        <div>
            <h1>This is sample page</h1>
        </div>
    )
}