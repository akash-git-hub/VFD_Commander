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


export const statusArrayEdit = [
  { name: "Active", value: "Active" },
  { name: "InActive", value: "Inactive" },
  { name: "Removed", value: "Removed" }
]

export const CategoryArray = [
  { name: "Issue", value: "Issue" },
  { name: "Maintenance", value: "Maintenance" },
  { name: "Repairs", value: 'Repairs' },
  { name: "Other", value: "Other" },

]
export const selectFormOption = [
  { name: "User Profile", value: "User" },
  { name: "Event", value: "Event" },
  { name: "Gear and Apparatus", value: "GearApparatus" },
  { name: "Qualifications", value: "Qualifications" },
  
  // { name: "Add New Tracking Information", value: "AddNewTrackingInformation" },
]



export const GAPoptions = [
  { name: "Apparatus", value: "apparatus" },
  { name: "Gear", value: "gear" },
]

export const itemsStatus = [
  { name: "In Service", value: "in_service" },
  { name: "Out of Service", value: "out_of_service" }
]

export const FilterItemsStatus = (data) => {
  if(data){
  let resp = itemsStatus.find((e) => e.value === data);
  return resp.name;
}else return;
}

export const StatusFilter = (data) => {
  if(data){
  let resp = statusArrayEdit.find((e) => e.value === data);
  return resp.name;
}else return ;
}

export const timeFormateArray = [
  { name: '12-Hours', "value": 'hh:mm A' },
  { name: '24-Hours', "value": 'HH:mm' }
]

export const statusOP = [{ "name": "Active", "value": "Active" }, { "name": "Inactive", "value": "Inactive" }];


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



export const removeAllLeadingZeros = (input) => {
  const trimmedInput = input.trim();
  const cleanedInput = trimmedInput.replace(/^0+/, '');
  return cleanedInput === '' ? '0' : cleanedInput;
};



export const eventStatus = [
  { "value": "cancelled", "name": "Cancelled" },
  { "value": "completed", "name": "Completed" },
  { "value": "did_not_attend", "name": "Did Not Attend" },
  { "value": "planning_to_attend", "name": "Planning to Attend" },
  { "value": "removed", "name": "Removed" },
  { "value": "cannot_attend", "name": "Will Not Attend" },
]

export const orderby = [
  { "value": "asc", name: "Ascending" },
  { "value": "desc", name: "Descending" }
]


export const getTotalHoursAndUserNames = (data) => {
  const userRecords = {};
  data.forEach(record => {
    const user_id = record.user_id;
    const userName = record.user_name;
    const duration = parseFloat(record.credit_duration);
    // Initialize or update user record
    if (!userRecords[user_id]) {
      userRecords[user_id] = {
        userName: userName,
        totalDuration: duration
      };
    } else {
      const sum = duration + userRecords[user_id].totalDuration;
      userRecords[user_id].totalDuration = Math.round(sum * 100) / 100; // Round to 2 decimal places
    }
  });

  const result = Object.keys(userRecords).map(user_id => {
    const userRecord = userRecords[user_id];

    return {
      userId: user_id,
      user_name: userRecord.userName,
      total_hours: userRecord.totalDuration, // Return total duration
      fullData: data.filter(record => record.user_id === user_id), // Filter full data for the user
    };
  });

  return result;
};



export const sortEventName = (data, order) => {
  const sortedUsers = [...data].sort((a, b) => {
    if (a.name < b.name) return order ? -1 : 1;
    if (a.name > b.name) return order ? 1 : -1;
    return 0;
  });
  return sortedUsers;
};

export const sortAccountName = (data, order) => {
  const sortedUsers = [...data].sort((a, b) => {
    if (a.accountName < b.accountName) return order ? -1 : 1;
    if (a.accountName > b.accountName) return order ? 1 : -1;
    return 0;
  });
  return sortedUsers;
};

export const sortEventByDate = (data, order) => {
  const sortedUsers = [...data].sort((a, b) => {
    if (a.date < b.date) return order ? -1 : 1;
    if (a.date > b.date) return order ? 1 : -1;
    return 0;
  });
  return sortedUsers;
};



export const pointerExpiration = /^\d*(\.\d{0,2})?$/;


