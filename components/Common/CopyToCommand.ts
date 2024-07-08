export const copyToCommand = (value: string, cb?: () => void) => {
  const input = document.createElement("input");
  document.body.appendChild(input);
  input.setAttribute("value", value);
  input.select();
  if (document.execCommand("copy")) {
    document.execCommand("copy");
    cb && cb();
  }
  document.body.removeChild(input);
};
