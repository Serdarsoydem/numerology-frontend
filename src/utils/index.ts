import {StoryType} from "@/types/api-types";

export const isStoryWithImage = (story: StoryType): story is Extract<StoryType, { image: string }>  => {
    return story.image !== undefined;
}

export const extractText = (text : string, maxLength : number) => {

    if (text.length <= maxLength) {
        return text;
    }

    const trimmedText = text.substring(0, maxLength + 1); // Get the text up to the 41st character
    const lastSpaceIndex = trimmedText.lastIndexOf(' '); // Find the last space within this range

    if (lastSpaceIndex === -1) {
        return text.substring(0, maxLength); // If no space is found, just return the first 40 characters
    }

    return text.substring(0, lastSpaceIndex); // Return text up to the last space
}
