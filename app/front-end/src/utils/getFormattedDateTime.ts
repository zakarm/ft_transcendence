export default function getFormattedDateTime(): string {
  const date: Date = new Date();
  const optionsDate: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const optionsTime: Intl.DateTimeFormatOptions = {
    hour: 'numeric',
    minute: 'numeric',
    hour12: true,
  };
  const formattedDate: string = date.toLocaleDateString('en-US', optionsDate);
  const formattedTime: string = date.toLocaleTimeString('en-US', optionsTime);
  const formattedDateTime: string = `${formattedDate}, ${formattedTime}`;
  return formattedDateTime;
}
