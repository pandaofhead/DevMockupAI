export const validatePersonalDetails = (data) => {
  const errors = {};
  
  if (!data.firstName?.trim()) errors.firstName = 'First name is required';
  if (!data.lastName?.trim()) errors.lastName = 'Last name is required';
  if (!data.email?.trim()) errors.email = 'Email is required';
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }
  if (!data.phone?.trim()) errors.phone = 'Phone number is required';
  if (!data.address?.trim()) errors.address = 'Address is required';

  return { isValid: Object.keys(errors).length === 0, errors };
};

export const validateEducation = (data) => {
  if (!Array.isArray(data)) return { isValid: false, errors: { general: 'Invalid education data' } };
  
  const errors = data.map(edu => {
    const eduErrors = {};
    if (!edu.universityName?.trim()) eduErrors.universityName = 'University name is required';
    if (!edu.degree?.trim()) eduErrors.degree = 'Degree is required';
    if (!edu.major?.trim()) eduErrors.major = 'Major is required';
    if (!edu.startDate) eduErrors.startDate = 'Start date is required';
    return eduErrors;
  });

  return {
    isValid: errors.every(err => Object.keys(err).length === 0),
    errors
  };
};

export const validateExperience = (data) => {
  if (!Array.isArray(data)) return { isValid: false, errors: { general: 'Invalid experience data' } };
  
  const errors = data.map(exp => {
    const expErrors = {};
    if (!exp.title?.trim()) expErrors.title = 'Position title is required';
    if (!exp.companyName?.trim()) expErrors.companyName = 'Company name is required';
    if (!exp.startDate) expErrors.startDate = 'Start date is required';
    if (!exp.endDate && !exp.currentlyWorking) {
      expErrors.endDate = 'End date is required unless currently working';
    }
    const workSummary = String(exp.workSummary || '');
    if (!workSummary.trim()) expErrors.workSummary = 'Work summary is required';
    return expErrors;
  });

  return {
    isValid: errors.every(err => Object.keys(err).length === 0),
    errors
  };
};

export const validateSkills = (data) => {
  if (!Array.isArray(data)) return { isValid: false, errors: { general: 'Invalid skills data' } };
  
  const errors = data.map(skill => {
    const skillErrors = {};
    if (!skill.name?.trim()) skillErrors.name = 'Skill name is required';
    if (!skill.list?.trim()) skillErrors.list = 'Skills list is required';
    return skillErrors;
  });

  return {
    isValid: errors.every(err => Object.keys(err).length === 0),
    errors
  };
}; 