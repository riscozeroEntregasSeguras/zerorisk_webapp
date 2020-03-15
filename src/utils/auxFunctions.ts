import Capitalize from 'lodash/capitalize';

/**
 * Convert File to base64 string.
 * Always resolves: either returns the string or null
 * @param file
 */
export default function toBase64(file: File): Promise<null | string> {
  return new Promise((resolve) => {
    if (!FileReader) resolve(null);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    // @ts-ignore
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => resolve(null);
  });
}

/**
 * Creates a string of random chars with 'positions' length
 * @param positions
 */
export function randomChars(positions: number): string {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  const randomString = [];
  for (let i = 0; i < positions; i += 1) {
    randomString.push(characters.charAt(Math.floor(Math.random() * charactersLength)));
  }
  return randomString.join('');
}

/**
 * Normalizes the string when we want to quick print a enum/const/etc...
 * @param name
 */
export function NormalizeString(name: string): string {
  return name
    .replace(/_/g, ' ')
    .split(' ')
    .map(Capitalize)
    .join(' ');
}

/**
 * Creates a file to download on the browser.
 * @param param0
 */
export function downloadFile({ content, fileName }: { content: string, fileName: string }): void {
  const text = `data:text/bim;charset=utf-8,${content}`;
  const encodedContent = encodeURI(text);
  const element = document.createElement('a');

  element.setAttribute('href', encodedContent);
  element.setAttribute('download', fileName);
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
}
