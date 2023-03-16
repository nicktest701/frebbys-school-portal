export const isMobile = () => {
  const isTrue = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  return isTrue;
};
