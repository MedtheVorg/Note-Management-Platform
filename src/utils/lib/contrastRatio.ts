import hexRgb from 'hex-rgb';
import ratio from 'contrast-ratio';

export function contrastRatio(hex: string) {
    const { red, green, blue } = hexRgb(hex);
    const calculatedRatio = ratio([red, green, blue], [0, 0, 0]);
    return calculatedRatio > 4.5 ? '#000' : '#fff';
}
