const FormatName = (input) => {
  // If input is an object with email property, use that
  const name = typeof input === 'object' && input.email ? input.email : String(input || '');
  
  // If empty string, return it
  if (!name) return '';

  return name
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export default FormatName;
