import moment from 'moment-timezone';


// Email validation regex pattern
export let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;





export const TimezoneList = () => {
  const tzNames = moment.tz.names();
  return tzNames ? tzNames : [];
};

export const statusArray = [
  { name: "Active", value: "Active" },
  { name: "InActive", value: "Inactive" }
]

export const timeFormateArray = [
  { name: '12-Hours', "value": 'hh:mm:ss A' },
  { name: '24-Hours', "value": 'HH:mm:ss' }
]


export const stateList = [
  { value: 'AL', name: 'AL - Alabama' },
  { value: 'AK', name: 'AK - Alaska' },
  { value: 'AZ', name: 'AZ - Arizona' },
  { value: 'AR', name: 'AR - Arkansas' },
  { value: 'CA', name: 'CA - California' },
  { value: 'CO', name: 'CO - Colorado' },
  { value: 'CT', name: 'CT - Connecticut' },
  { value: 'DE', name: 'DE - Delaware' },
  { value: 'FL', name: 'FL - Florida' },
  { value: 'GA', name: 'GA - Georgia' },
  { value: 'HI', name: 'HI - Hawaii' },
  { value: 'ID', name: 'ID - Idaho' },
  { value: 'IL', name: 'IL - Illinois' },
  { value: 'IN', name: 'IN - Indiana' },
  { value: 'IA', name: 'IA - Iowa' },
  { value: 'KS', name: 'KS - Kansas' },
  { value: 'KY', name: 'KY - Kentucky' },
  { value: 'LA', name: 'LA - Louisiana' },
  { value: 'ME', name: 'ME - Maine' },
  { value: 'MD', name: 'MD - Maryland' },
  { value: 'MA', name: 'MA - Massachusetts' },
  { value: 'MI', name: 'MI - Michigan' },
  { value: 'MN', name: 'MN - Minnesota' },
  { value: 'MS', name: 'MS - Mississippi' },
  { value: 'MO', name: 'MO - Missouri' },
  { value: 'MT', name: 'MT - Montana' },
  { value: 'NE', name: 'NE - Nebraska' },
  { value: 'NV', name: 'NV - Nevada' },
  { value: 'NH', name: 'NH - New Hampshire' },
  { value: 'NJ', name: 'NJ - New Jersey' },
  { value: 'NM', name: 'NM - New Mexico' },
  { value: 'NY', name: 'NY - New York' },
  { value: 'NC', name: 'NC - North Carolina' },
  { value: 'ND', name: 'ND - North Dakota' },
  { value: 'OH', name: 'OH - Ohio' },
  { value: 'OK', name: 'OK - Oklahoma' },
  { value: 'OR', name: 'OR - Oregon' },
  { value: 'PA', name: 'PA - Pennsylvania' },
  { value: 'RI', name: 'RI - Rhode Island' },
  { value: 'SC', name: 'SC - South Carolina' },
  { value: 'SD', name: 'SD - South Dakota' },
  { value: 'TN', name: 'TN - Tennessee' },
  { value: 'TX', name: 'TX - Texas' },
  { value: 'UT', name: 'UT - Utah' },
  { value: 'VT', name: 'VT - Vermont' },
  { value: 'VA', name: 'VA - Virginia' },
  { value: 'WA', name: 'WA - Washington' },
  { value: 'WV', name: 'WV - West Virginia' },
  { value: 'WI', name: 'WI - Wisconsin' },
  { value: 'WY', name: 'WY - Wyoming' }
];

