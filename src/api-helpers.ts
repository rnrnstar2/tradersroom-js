import type { StringDict } from '../types/index';

const trackerLink =
  'https://avjby6ynal.execute-api.ap-northeast-1.amazonaws.com/dev';
export async function fetchJSON(
  mode: 'POST' | 'PUT',
  query: string,
  body: StringDict,
  token: string
) {
  return new Promise((resolve, reject) => {
    fetch(`${trackerLink}/${query}`, {
      method: mode,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        // 通信が成功したか確認
        if (!response.ok) {
          console.error('esponse.status:', response.status);
        }
        return response.json();
      })
      .then((data) => {
        resolve(data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
