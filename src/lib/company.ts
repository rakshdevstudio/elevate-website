export const CORPORATE_OFFICE_ADDRESS = "Koramangala, Bangalore, Karnataka, India";
export const REGISTERED_OFFICE_ADDRESS = "Tiruchirappalli, Tamil Nadu, India";

export const COMPANY_ADDRESS = CORPORATE_OFFICE_ADDRESS;

const COMPANY_ADDRESS_QUERY = encodeURIComponent(CORPORATE_OFFICE_ADDRESS);

export const COMPANY_MAPS_PLACE_URL = `https://www.google.com/maps/search/?api=1&query=${COMPANY_ADDRESS_QUERY}`;
export const COMPANY_MAPS_EMBED_URL = `https://maps.google.com/maps?q=${COMPANY_ADDRESS_QUERY}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

export const COMPANY_OFFICES = [
	{ label: "Corporate Office", address: CORPORATE_OFFICE_ADDRESS },
	{ label: "Registered Office", address: REGISTERED_OFFICE_ADDRESS },
];
