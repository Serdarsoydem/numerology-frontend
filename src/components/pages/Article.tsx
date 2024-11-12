"use client"

import { CustomResourceResponse} from "@/types/api-types";
import React from "react";
import ArticleRenderer from "@/components/article-renderer";

type BlogProps = {
    article: CustomResourceResponse; // Allow undefined
};

const Article: React.FC<BlogProps>= ({article} ) => {
    return (
        <article className="w-full max-w-3xl mx-auto space-y-4 px-4 md:px-0">
            <ArticleRenderer article={article}/>
        </article>
    );
};

export default Article;

