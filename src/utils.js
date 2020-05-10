// Formats the number to the US and vice-versa.
export const formatPhoneNumber = phoneNumberString => {
  if (!phoneNumberString) return "";
  if (phoneNumberString.length < 14 && phoneNumberString.length > 10)
    return phoneNumberString.split("").filter(e => (!isNaN(e) && e !== " ")).join("");
  const cleaned = String(phoneNumberString).replace(/\D/g, '')
  const match = cleaned.match(/^(\d{3})(\d{3})(\d{4})$/);
  if (match) return `(${match[1]}) ${match[2]}-${match[3]}`;
  return phoneNumberString;
};