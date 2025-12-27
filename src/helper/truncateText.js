export const truncateText = (text, maxLength = 60) => {
    return text.length > maxLength
        ? text.slice(0, maxLength) + '...'
        : text;
};