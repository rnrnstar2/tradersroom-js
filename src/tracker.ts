// 辞書オブジェクトを作成する
interface StringDict {
  [name: string]: string;
}

const trackerLink = "https://foqvtm7n5rx6fkp3do73q3d6nm0hswmu.lambda-url.ap-northeast-1.on.aws/";
export default class Tracker {
  programId: string;
  constructor(programId: string) {
    this.programId = programId;
  }

  user(name: string) {
    console.log("user: ", name);
    console.log(document.cookie);
  }

  track() {
    console.log("track");
    console.log(this.programId);
  }

  // API送信
  postApi(sendData: any) {
    console.log(">>> postApi <<<");
    return new Promise((resolve, reject) => {
      fetch(trackerLink, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: JSON.stringify({
          ...sendData,
          programId: this.programId,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          resolve(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          reject("fail");
        });
    });
  }

  // トラッキングIDを取得
  getTradersRoomId() {
    const cookies = document.cookie;
    const cookiesArray = cookies.split(";");
    let cookieDict: StringDict = {};
    for (var c of cookiesArray) {
      const cArray = c.split("=");
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
      if (!this.programId) return;

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
      this.postApi(sendData);
    });
  }
}
