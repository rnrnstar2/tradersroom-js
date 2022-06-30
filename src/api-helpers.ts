import type { StringDict } from '../types/index';
const trackerLink =
  'https://avjby6ynal.execute-api.ap-northeast-1.amazonaws.com/dev';

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
        'Content-Type': 'application/json', // これにしないとlambdaでbodyがnullになる!!
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
}
