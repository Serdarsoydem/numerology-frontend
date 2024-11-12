"use client"
import { BlocksContent, BlocksRenderer } from "@strapi/blocks-react-renderer";
import Image from "next/image";
import React, {useEffect, useState} from "react";
import ShareComponent from "@/components/ShareComponent";
import {
    AuthorData,
    CustomResourceResponse,
} from "@/types/api-types";
import MuxPlayer from '@mux/mux-player-react';
import {authorsEndpoint} from "@/utils/endpoints";

interface ArticleProps {
    article : CustomResourceResponse
}

const ArticleRenderer: React.FC<ArticleProps> = ({ article }) => {
    const [author, setAuthor] = useState<AuthorData | undefined>(undefined);

    useEffect(() => {
        const fetchAuthor = async () => {
            try {
                const response = await fetch(`${authorsEndpoint}/${article.author.id}?populate=*`);
                if (response.ok) {
                    const data = await response.json();
                    setAuthor(data.data as AuthorData);
                    console.log("set author", data);
                    console.log("article", article);
                } else {
                    console.error("Failed to fetch author");
                }
            } catch (error) {
                console.error("Error fetching author:", error);
            }
        };

        fetchAuthor()
    }, [article.author.id]);

    const renderHeading = (children: React.ReactNode, level: number) => {
        const HeadingTag = `h${level}` as keyof JSX.IntrinsicElements;

        return (
            <>
                <HeadingTag
                    className={
                        level === 1
                            ? "text-2xl font-bold tracking-tight prose-gray mx-auto dark:prose-invert"
                            : "text-xl font-semibold prose-gray mx-auto dark:prose-invert"
                    }
                >
                    {children}
                </HeadingTag>
            </>
        );
    };

    return (
        <div className="prose prose-gray mx-auto space-y-6 dark:prose-invert">
            <div className="space-y-4 not-prose">
                <Image
                    src={article.image.url}
                    width={1400}
                    height={700}
                    alt="Blog post cover image"
                    className="rounded-lg object-cover aspect-[5/3]"
                />
                <h1 className="text-4xl font-bold tracking-tight prose-gray mx-auto dark:prose-invert">
                    {article.title}
                </h1>
            </div>
            <ShareComponent author={author} date={article.updatedAt}/>
            <BlocksRenderer
                content={article.content}
                blocks={{
                    paragraph: ({children}) => {
                        console.log("Rendering paragraph");
                        return <p className="prose prose-gray mx-auto dark:prose-invert">{children}</p>;
                    },
                    heading: ({children, level}) => {
                        console.log("Rendering heading", level);
                        return renderHeading(children, level);
                    },
                    image: ({image}) => {
                        console.log("Rendering image", JSON.stringify(image.name, null, 2));
                        if (!image || !image.url) {
                            console.error("Invalid image data", image);
                            return null;
                        }
                        const {url, alternativeText, width, height} = image;
                        return (
                            <Image
                                src={url}
                                alt={alternativeText || ""}
                                width={width || 500}
                                height={height || 300}
                                layout="responsive"
                                className="prose-image mx-auto"
                            />
                        );
                    },
                    quote: (props) => (
                        <blockquote className="border-l-4 border-gray-500 pl-4 italic my-4">
                            <p>{props.children}</p>
                        </blockquote>
                    ),
                    list: ({children, format}) => {
                        return format === "ordered" ? (
                            <ol className="list-decimal list-inside my-4 pl-5 space-y-2">
                                {children}
                            </ol>
                        ) : (
                            <ul className="list-disc list-inside my-4 pl-5 space-y-2">
                                {children}
                            </ul>
                        );
                    },
                    "list-item": ({children}) => (
                        <li className="ml-2">{children}</li>
                    ),
                }}
                modifiers={{
                    bold: ({children}) => <strong className="font-bold">{children}</strong>,
                    italic: ({children}) => <span className="italic">{children}</span>,
                    strikethrough: ({children}) => <span className="line-through">{children}</span>,
                }}
            />
            {article.video
                && (
                    // Render this if level is 1 and article.video exists
                    <>
                        <div className="space-y-4 not-prose">
                            <MuxPlayer src={article.video.url} className="mx-auto my-4" />
                        </div>
                    </>
                )}
            <div className="hidden md:flex">
                <ShareComponent author={author} date={article.updatedAt}/>
            </div>
        </div>
    );
};


export default ArticleRenderer;
