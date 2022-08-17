export default function normalize(text: string): string {
    try {
        return decodeURIComponent(escape(text))
    } catch (error) {
        return text
    }
}