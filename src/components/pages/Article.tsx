"use client"

import { AuthorResponseTypeAPI, ResourceResponseCustomType } from "@/types/api-types";
import React, { useEffect, useState } from "react";
import ContentRenderer from "@/components/content-renderer";
import Image from "next/image";
import ShareComponent from "@/components/ShareComponent";
import MuxPlayer from "@mux/mux-player-react";
import { authorsEndpoint } from "@/utils/endpoints";

type ArticleProps = {
    article: ResourceResponseCustomType;
};

const Article: React.FC<ArticleProps> = ({ article }) => {
    const [author, setAuthor] = useState<AuthorResponseTypeAPI | undefined>(undefined);

    useEffect(() => {
        const fetchAuthor = async () => {
            // 🔒 article.author.id varsa fetch yap
            if (!article?.author?.id) return;

            try {
                const response = await fetch(`${authorsEndpoint}/${article.author.id}?populate=*`);
                if (response.ok) {
                    const data = await response.json();
                    console.log("author:", data);
                    setAuthor(data as AuthorResponseTypeAPI);
                } else {
                    console.error("Failed to fetch author");
                }
            } catch (error) {
                console.error("Error fetching author:", error);
            }
        };

        fetchAuthor();
    }, [article?.author?.id]);

    return (
        <article className="w-full max-w-3xl mx-auto space-y-4 px-4 md:px-0">
            <div className="prose prose-gray mx-auto space-y-6 dark:prose-invert">

                <div className="space-y-4 not-prose">
                    <Image
                        src={article?.image?.url || "/placeholder.jpg"} // ✅ Güvenli kullanım
                        width={1400}
                        height={700}
                        alt="Blog post cover image"
                        className="rounded-lg object-cover aspect-[5/3]"
                    />
                    <h1 className="text-4xl font-bold tracking-tight prose-gray mx-auto dark:prose-invert">
                        {article.title}
                    </h1>
                </div>

                <ShareComponent author={author} date={article.updatedAt} />
                <ContentRenderer content={article.content} />

                {article?.video?.url && (
                    <div className="space-y-4 not-prose">
                        <MuxPlayer src={article.video.url} className="mx-auto my-4" />
                    </div>
                )}

                <div className="hidden md:flex">
                    <ShareComponent author={author} date={article.updatedAt} />
                </div>
            </div>
        </article>
    );
};

export default Article;
