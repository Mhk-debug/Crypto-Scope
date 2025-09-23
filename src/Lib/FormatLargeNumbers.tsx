export default function formatLargeNumber(num: number): string {
    if (num >= 1_000_000_000_000) {
      return (num / 1_000_000_000_000).toFixed(2) + " Trillion";
    } else if (num >= 1_000_000_000) {
      return (num / 1_000_000_000).toFixed(2) + " Billion";
    } else if (num >= 1_000_000) {
      return (num / 1_000_000).toFixed(2) + " Million";
    } else {
      return `${num}`; // fallback
    }
  }