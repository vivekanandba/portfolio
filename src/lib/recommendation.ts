/** Attribution line for a recommendation: "Title, Company" (company omitted when unknown). */
export function attribution(r: { title: string; company?: string }): string {
  return r.company ? `${r.title}, ${r.company}` : r.title;
}
