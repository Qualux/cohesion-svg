export function generateStyles(styleId, styles) {
    const filteredStyles = Object.entries(styles)
        .filter(([key, value]) => value !== "") // Filter out properties with empty values
        .map(([key, value]) => `${key}:${value};`)
        .join(' ');

    return `
        .block-cohesion-svg-${styleId} svg {
            ${filteredStyles}
        }
    `;
}
