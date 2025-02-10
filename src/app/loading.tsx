export default function Loading() {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <video autoPlay loop muted playsInline className="w-[200px] h-[200px]">
          <source src="/loading.webm" type="video/webm" />
        </video>
      </div>
    )
  }
  
  