export const getDeviceInfo = (userAgent: string) => {
  if (userAgent.includes('iPhone') || userAgent.includes('iPad')) {
    return 'iOS Device';
  } else if (userAgent.includes('Android')) {
    return 'Android Device';
  } else if (userAgent.includes('Windows')) {
    return 'Windows Device';
  } else if (userAgent.includes('Mac')) {
    return 'Mac Device';
  } else if (userAgent.includes('Linux')) {
    return 'Linux Device';
  }
  return 'Unknown Device';
};
