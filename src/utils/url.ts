export const getUrlParameter = (name: string) => {
  const search = window.location.search;

  const param = search?.split(`${name}=`)?.[1]?.split("&")[0];
  return param;
};
