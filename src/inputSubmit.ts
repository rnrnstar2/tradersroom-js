const inputSubmit = () => {
  const text1 = <HTMLInputElement>document.getElementById("text1");
  const button1 = <HTMLButtonElement>document.getElementById("button1");
  const div2 = <HTMLDivElement>document.getElementById("div2");
  button1.addEventListener("click", () => {
    console.log(`入力された文字列は「${text1.value}」です`);
    div2.innerText = `入力された文字列は「${text1.value}」です`;
  });
};

export default inputSubmit;
