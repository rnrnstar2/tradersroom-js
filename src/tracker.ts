// interface SendData {
//   email: string;
//   name?: string;
// }

export default class Tracker {
  publicKey: string;
  constructor(publicKey: string) {
    this.publicKey = publicKey;
  }

  user(name: string) {
    console.log("user: ", name);
    console.log(document.cookie);
  }

  track() {
    console.log("track");
    console.log(this.publicKey);
  }

  // API送信
  postApi(sendData: any) {
    fetch("https://ett62q7csgeatvki2ajoegwyoe0cnpoa.lambda-url.ap-northeast-1.on.aws/ ", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify({
        ...sendData,
        publicKey: this.publicKey,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  }

  // トラッキングIDを取得
  getTrackingId() {
    const cookies = document.cookie;
    const cookiesArray = cookies.split(";");
    for (var c of cookiesArray) {
      const cArray = c.split("=");
      const key = cArray[0];
      const value = cArray[1];
      if (key == "trackingId") return value;
    }
    return "";
  }

  // 証券会社に登録
  form() {
    const formElement = <HTMLFormElement>document.getElementById("tr-form");
    formElement.addEventListener("submit", (event) => {
      console.log("フォームがsubmitされました");
      event.preventDefault();

      // トラッキングIDを取得
      const trackingId = this.getTrackingId();
      if (!trackingId) return;
      console.log("trackingId: ", trackingId);

      // フォームデータを解析
      const target = event.target;
      if (!target) return;
      const arr = Array.from(target as any) as HTMLInputElement[];
      let sendData: any = {};
      arr.map((e) => {
        const value = e.value;
        const attribute = e.attributes as any;
        const key = attribute["data-tr-form"]?.value;
        if (key) sendData[key] = value;
      });
      console.log("sendData: ", sendData);

      // チェック
      if (!sendData.email) return;

      // API送信
      this.postApi(sendData);
    });
  }
}
