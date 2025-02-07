import {EventResponseTypeAPI, Location, StoryResponseTypeAPI} from "@/types/api-types";

export const isEventWithImage = (story: StoryResponseTypeAPI)  => {

    return story.data.attributes.storyMedia.data.attributes.provider_metadata.resource_type == "image";
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

export function formatDate(dateString: string): string {
    const date = new Date(dateString);

    const months = [
        "Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran",
        "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım","Aralık"]
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();

    return `${month} ${day}, ${year}`;
}

export function extractTimeFromISO(dateString : string) {
    // Ensure the input is parsed to a Date object
    const date = new Date(dateString);

    // Extract hours and minutes
    const hours = date.getHours().toString().padStart(2, '0'); // Pad with zero if needed
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Return time in HH:MM format
    return `${hours}:${minutes}`;
}

export function getLocationDescription(location: Location) {
    const loc = location[0];
    console.log("location", loc);

    if (!loc) {
        return "Unknown location";
    }

    if (loc.__component === "shared.online-location" && "platform" in loc) {
        return loc.platform; // Safe to access `platform`
    } else if (loc.__component === "shared.online-location" && "city" in loc) {
        return loc.city; // Safe to access `city`
    }
}
