export default function loaidng() {

    
    
       return (
    <div className="min-h-[400px] w-full flex flex-col justify-center items-center gap-4">
      <div className="relative">
        
        <div className="h-16 w-16 rounded-full border-4 border-primary/20"></div>
       
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-t-primary border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
      </div>
      
      <div className="flex flex-col items-center">
        <h2 className="text-xl font-bold text-foreground animate-pulse">
          Skillbridge
        </h2>
        <p className="text-sm text-muted-foreground italic">
          Preparing your learning path...
        </p>
      </div>
    </div>
    )
}