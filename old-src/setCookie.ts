const setCookie = (name: string, value: string, days: number) => {
  console.log(name, value);
  let expires;
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  } else {
    expires = "";
  }
  const cookie = name + "=" + value + expires + "; path=/";
  document.cookie = cookie;
};

export default setCookie;
