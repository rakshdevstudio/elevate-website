export const COMPANY_ADDRESS = "No. 4/94, Ground Floor, 2nd Main Rd, 6th Cross, K.K.Nagar (Tiruchirappalli), Tiruchirappalli, Tiruchirappalli, Tamil Nadu, India, 620021";

const COMPANY_ADDRESS_QUERY = encodeURIComponent(COMPANY_ADDRESS);

export const COMPANY_MAPS_PLACE_URL = `https://www.google.com/maps/search/?api=1&query=${COMPANY_ADDRESS_QUERY}`;
export const COMPANY_MAPS_EMBED_URL = `https://maps.google.com/maps?q=${COMPANY_ADDRESS_QUERY}&t=&z=16&ie=UTF8&iwloc=&output=embed`;
