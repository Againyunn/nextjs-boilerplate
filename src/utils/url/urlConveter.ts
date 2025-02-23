/**
 * @param url
 * @returns
 */
export const urlConvertor = (url: string) => {
  let prefixUrl = '';

  if (process.env.NEXT_PUBLIC_MODE === 'production') {
    if (process.env.NEXT_PUBLIC_TEST_BUILD === 'true') {
      prefixUrl = '/'; // 테스트용
    } else {
      prefixUrl = ''; // 배포용
    }
  }

  return prefixUrl + url;
};
