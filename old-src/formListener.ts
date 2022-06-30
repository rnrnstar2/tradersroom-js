import { fetchJSON } from "./api-helpers";

// 辞書オブジェクトを作成する
interface StringDict {
  [name: string]: string;
}
export default class FormListener {
  token: string;
  constructor(token: string) {
    this.token = token;
  }

  // トラッキングIDを取得
  getTradersRoomId() {
    const cookies = document.cookie;
    const cookiesArray = cookies.split(";");
    let cookieDict: StringDict = {};
    for (var c of cookiesArray) {
      const cArray = c.trim().split("=");
      const key = cArray[0] as string;
      const value = cArray[1] as string;
      if (["memberId", "projectId", "trackingId"].includes(key)) cookieDict[key] = value;
    }
    console.log("cookieDict: ", cookieDict);
    return cookieDict;
  }

  // 証券会社に登録
  form() {
    console.log("formのリスナーを起動しました。");
    const formElement = <HTMLFormElement>document.getElementById("tr-form");
    formElement.addEventListener("submit", (event) => {
      console.log("フォームがsubmitされました");
      event.preventDefault();
      if (!this.token) return;

      // トラッキングIDを取得
      const cookieDict = this.getTradersRoomId();
      if (!cookieDict.memberId) return;

      // フォームデータを解析
      const target = event.target;
      if (!target) return;
      const arr = Array.from(target as any) as HTMLInputElement[];
      let sendData: StringDict = {
        ...cookieDict,
      };
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
      fetchJSON(
        "POST",
        "trader",
        {
          ...sendData,
        },
        this.token
      );
    });
  }
}
