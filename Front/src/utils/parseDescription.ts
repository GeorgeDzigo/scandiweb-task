export const parseDescription = (description: string) => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(description, 'text/html');
    return parsedHtml.body.childNodes;
};