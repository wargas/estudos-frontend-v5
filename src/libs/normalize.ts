export default function normalize(text: string): string {
    return text;
    try {
        return decodeURIComponent(escape(text))
    } catch (error) {
        return text
    }
}