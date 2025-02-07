"use client"
import {BlocksContent, BlocksRenderer} from "@strapi/blocks-react-renderer";
import Image from "next/image";
import React from "react";

interface ArticleProps {
    content : BlocksContent
}

const ContentRenderer: React.FC<ArticleProps> = ({ content }) => {


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

            <BlocksRenderer
                content={content}
                blocks={{
                    paragraph: ({ children }) => {
                        console.log("Rendering paragraph with children:", children);

                        // Check if `children` already contains block-level elements
                        const hasBlockElements = React.Children.toArray(children).some(
                            (child) =>
                                React.isValidElement(child) &&
                                (child.type === 'h1' || child.type === 'h2' || child.type === 'div')
                        );

                        // If block elements are present, don't wrap in <p>
                        if (hasBlockElements) {
                            return <>{children}</>;
                        }

                        // Safe to wrap inline content in <p>
                        return <p className="text-gray-600 text-lg leading-relaxed max-w-3xl">{children}</p>;
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
    );
};

export default ContentRenderer;
