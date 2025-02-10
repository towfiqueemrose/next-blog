import Image from "next/image";
import Link from "next/link";
import { auth } from "@/auth";

export default async function BecomeAnAuthor() {
    const session = await auth();

    return (
        <div className="mt-10">
            <div className="create-author-main">
                <div className="w-full md:w-1/2 mt-10">
                    <h3 className="h3">Supper change your planning powers</h3>
                    <h1 className="h1">Become an author and share your great stories 🎉</h1>
                    <p className="p-lg">Become an author you can earn extra income by writing articles. Read and share new perspectives on just about any topic. Everyone's welcome.</p>
                    
                    {!session?.user && (
                        <Link href="/auth/signin" className="create-author-btn">
                            Become an author
                        </Link>
                    )}
                </div>
                <div className="w-full md:w-1/2">
                    <Image 
                        src="/becomeAuthor.webp" 
                        alt="auth-cov" 
                        width={600} 
                        height={600} 
                        priority 
                    />
                </div>
            </div>
        </div>
    );
}
