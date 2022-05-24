/*
 * @Descripttion:
 * @version:
 * @Author: guowh
 * @Date: 2022-05-24 09:41:01
 */

// 获取随机验证码
export function randomCode(size: number = 6): string {
  let s = "ABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890";
  let randomCode = "";
  for (let i = 0; i < size; i++) {
    let index = Math.random() * 36 | 0;
    randomCode += s[index];
  }
  return randomCode;
}
