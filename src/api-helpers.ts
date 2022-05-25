// 辞書オブジェクトを作成する
interface StringDict {
  [name: string]: string;
}

// const trackerLink = "https://foqvtm7n5rx6fkp3do73q3d6nm0hswmu.lambda-url.ap-northeast-1.on.aws/";
const trackerLink = "https://ip6w7iphheabxfu7clkxg7zxkq0kpmgj.lambda-url.ap-northeast-1.on.aws";

export async function fetchJSON(mode: "POST" | "PUT", query: string, body: StringDict) {
  return new Promise((resolve, reject) => {
    fetch(`${trackerLink}/${query}`, {
      method: mode,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: JSON.stringify(body),
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
