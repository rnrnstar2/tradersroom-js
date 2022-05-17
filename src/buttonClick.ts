const buttonClick = () => {
  const btn = <HTMLButtonElement>document.getElementById("btn");
  btn.addEventListener(
    "click",
    function () {
      console.log("クリックされました！");
    },
    false
  );
};

export default buttonClick;
