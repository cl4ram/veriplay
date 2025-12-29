export const formatMovieYear = (year: string | undefined): string => {
  if (!year) return 'N/A';
  
  const firstYear = year.split(/[-–]/)[0].trim();
  
  return /^\d+$/.test(firstYear) ? firstYear : year;
};

export const formatNA = (value: string | number | undefined | null, fallback = 'No disponible'): string => {
  if (value === null || value === undefined) return fallback;
  
  const stringValue = String(value).trim();
  
  if (stringValue === 'N/A' || stringValue === '') {
    return fallback;
  }
  
  return stringValue;
};