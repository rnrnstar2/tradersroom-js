import type { StringDict } from '../types/index';
const trackerLink =
  'https://avjby6ynal.execute-api.ap-northeast-1.amazonaws.com/dev';

// const handleErrors = (res: Response) => {
//   if (res.ok) return res;
//   switch (res.status) {
//     case 400:
//       throw Error('INVALID_TOKEN');
//     case 401:
//       throw Error('UNAUTHORIZED');
//     case 500:
//       throw Error('INTERNAL_SERVER_ERROR');
//     case 502:
//       throw Error('BAD_GATEWAY');
//     case 404:
//       throw Error('NOT_FOUND');
//     default:
//       throw Error('UNHANDLED_ERROR');
//   }
// };

export async function fetchJSON(
  mode: 'POST' | 'PUT',
  query: string,
  body: StringDict,
  token: string
) {
  try {
    const response = await fetch(`${trackerLink}/${query}`, {
      method: mode,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    });
    // レスポンスの本文を取得
    const data = await response.json();
    if (response.ok) {
      // HTTP ステータスが 200-299 の場合
      console.log('Success: ', data);
      return data;
    } else {
      console.error(data);
    }
  } catch (error) {
    throw error;
  }

  // fetch(`${trackerLink}/${query}`, {
  //   method: mode,
  //   headers: {
  //     'Content-Type': 'application/x-www-form-urlencoded',
  //     Authorization: `Bearer ${token}`,
  //   },
  //   body: JSON.stringify(body),
  // })
  //   // 1. ネットワーク周りなどのリクエスト以前の段階でのエラーを処理する
  //   .catch((e) => {
  //     throw Error(e);
  //   })
  //   // 2. サーバサイドで発行されたエラーステータスを処理する
  //   .then(handleErrors)
  //   // 3. 以上2つをパスした正常なレスポンスからJSONオブジェクトをパースする
  //   .then((res) => res.json())
  //   .then((data) => {
  //     console.log('Success: ', data);
  //   })
  //   .catch((error) => {
  //     console.log('Error: ', error);
  //   });
}
