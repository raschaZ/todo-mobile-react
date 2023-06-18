 export default function extractErrorMessage(input: string): string {
    const regex = /\(([^)]+)\)/;
    const matches = regex.exec(input);
    if (matches && matches.length >= 2) {
      return matches[1];
    }
    return '';
  }