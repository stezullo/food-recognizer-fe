export default class Utilities {
    static isFileAImage(file: File): boolean {
        return file && file['type'].split('/')[0] === 'image';
    }
}
