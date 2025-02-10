"use client";

import Image from "next/image";
import { useState, useOptimistic, useTransition } from "react";
import { toggleLike } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

interface LikeButtonProps {
    articleId: string;
    initialIsLiked: boolean;
    initialLikesCount: number;
}

export default function LikeButton({
    articleId,
    initialIsLiked,
    initialLikesCount
}: LikeButtonProps) {
    const router = useRouter();
    const { data: session } = useSession();
    const [isPending, startTransition] = useTransition();
    const [isLiked, setIsLiked] = useState(initialIsLiked);
    const [optimisticLikes, addOptimisticLike] = useOptimistic(
        initialLikesCount,
        (state: number, liked: boolean) => liked ? state + 1 : state - 1
    );

    const handleLike = async () => {
        if (!session?.user) {
            router.push("/auth/signin");
            return;
        }

        startTransition(async () => {
            try {
                const newLikeState = !isLiked;
                setIsLiked(newLikeState);
                addOptimisticLike(newLikeState);
                const result = await toggleLike(articleId);
                router.refresh();
                setIsLiked(result.isLiked);

            } catch (error) {
                setIsLiked(isLiked);
                addOptimisticLike(!isLiked);
                console.error("Failed to update like status:", error);
            }
        });
    };

    return (
        <div className="flex items-center gap-2 border-2 bg-white dark:bg-exDark border-logo py-2 px-3 rounded-2xl">
            <button
                onClick={handleLike}
                disabled={isPending}
                aria-label={isLiked ? "Unlike article" : "Like article"}
                className="focus:outline-none focus:ring-2 focus:ring-logo rounded-full"
                title={!session?.user ? "Sign in to like this article" : undefined}
            >
                <Image
                    src={isLiked ? "/love-red.svg" : "/unlike.svg"}
                    alt={isLiked ? "Liked" : "Not liked"}
                    width={30}
                    height={30}
                />
            </button>
            <p className="text-logo font-semibold text-xl">|</p>
            <h2 className="text-logo font-semibold text-xl">
                {optimisticLikes} likes
            </h2>
        </div>
    );
}