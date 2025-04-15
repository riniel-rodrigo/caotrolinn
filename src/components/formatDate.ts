export function formatDate(dateInput: string | Date) {
  if (!dateInput) return "-";
  const data = typeof dateInput === "string" ? new Date(dateInput) : dateInput;

  if (isNaN(data.getTime())) return "-";
  return data.toLocaleDateString("pt-BR");
}
