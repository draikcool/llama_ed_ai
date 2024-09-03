// 定义 MD5 工具库的接口
interface WMD5 {
  hex_md5_16: (string: any) => string
  hex_md5_16Upper: (string: any) => string
  hex_md5_32: (string: any) => string
  hex_md5_32Upper: (string: any) => string
}

// 定义 hex_md5 函数的类型
type HexMd5Function = (string: string, bit: number) => string
// 定义一个类型别名 Uint32，用于表示32位无符号整数
type Uint32 = number

// 转换后的 TypeScript 代码
const w_md5: WMD5 = {
  hex_md5_16: (string: string): string => {
    return hex_md5(string, 16)
  },
  hex_md5_16Upper: (string: string): string => {
    return hex_md5(string, 16).toUpperCase()
  },
  hex_md5_32: (string: string): string => {
    return hex_md5(string, 32)
  },
  hex_md5_32Upper: (string: string): string => {
    return hex_md5(string, 32).toUpperCase()
  }
}

// 以下是 hex_md5 函数的其余部分，你需要为函数参数和变量添加类型注解
// ...

// 例如，为 md5_RotateLeft 函数添加类型注解
function md5_RotateLeft(lValue: Uint32, iShiftBits: Uint32): Uint32 {
  return (lValue << iShiftBits) | (lValue >>> (32 - iShiftBits))
}

function md5_AddUnsigned(lX: Uint32, lY: Uint32): Uint32 {
  let lX8 = lX & 0x80000000 // lX 的第31位
  let lY8 = lY & 0x80000000 // lY 的第31位
  let lX4 = lX & 0x40000000 // lX 的第30位
  let lY4 = lY & 0x40000000 // lY 的第30位
  let lResult = (lX & 0x3fffffff) + (lY & 0x3fffffff) // 不包括符号位的加法

  // 处理加法溢出的情况
  if (lX4 & lY4) {
    return lResult ^ 0x80000000 ^ lX8 ^ lY8
  } else {
    if (lX4 | lY4) {
      if (lResult & 0x40000000) {
        return lResult ^ 0xc0000000 ^ lX8 ^ lY8
      } else {
        return lResult ^ 0x40000000
      }
    }
    return lResult ^ lX8 ^ lY8
  }
}
/**
 * md5_F 函数是 MD5 散列算法中的一种基本操作。
 * @param x - 第一个操作数，32位无符号整数。
 * @param y - 第二个操作数，32位无符号整数。
 * @param z - 第三个操作数，32位无符号整数。
 * @returns 函数的结果，32位无符号整数。
 */
function md5_F(x: Uint32, y: Uint32, z: Uint32): Uint32 {
  return (x & y) | (~x & z)
}

/**
 * md5_G 函数是 MD5 散列算法中的一种基本操作。
 * @param x - 第一个操作数。
 * @param y - 第二个操作数。
 * @param z - 第三个操作数。
 * @returns 操作结果。
 */
function md5_G(x: Uint32, y: Uint32, z: Uint32): Uint32 {
  return (x & z) | (y & ~z)
}

/**
 * md5_H 函数是 MD5 散列算法中的一种基本操作。
 * @param x - 第一个操作数。
 * @param y - 第二个操作数。
 * @param z - 第三个操作数。
 * @returns 操作结果。
 */
function md5_H(x: Uint32, y: Uint32, z: Uint32): Uint32 {
  return x ^ y ^ z
}

/**
 * md5_I 函数是 MD5 散列算法中的一种基本操作。
 * @param x - 第一个操作数。
 * @param y - 第二个操作数。
 * @param z - 第三个操作数。
 * @returns 操作结果。
 */
function md5_I(x: Uint32, y: Uint32, z: Uint32): Uint32 {
  return y ^ (x | ~z)
}

// 假设 md5_AddUnsigned 和 md5_RotateLeft 已在 TypeScript 中定义

/**
 * md5_FF 函数是 MD5 算法中的一个变换函数。
 * @param a - 累加器。
 * @param b - 第一个变量。
 * @param c - 第二个变量。
 * @param d - 第三个变量。
 * @param x - 当前处理的数据块。
 * @param s - 旋转次数。
 * @param ac - 加法常量。
 * @returns 累加器的新值。
 */
function md5_FF(
  a: Uint32,
  b: Uint32,
  c: Uint32,
  d: Uint32,
  x: Uint32,
  s: number,
  ac: Uint32
): Uint32 {
  a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_F(b, c, d), x), ac))
  return md5_AddUnsigned(md5_RotateLeft(a, s), b)
}

// 类似地，转换剩余的 GG、HH 和 II 函数
/**
 * md5_GG 函数是 MD5 算法中的一个变换函数。
 */
function md5_GG(
  a: Uint32,
  b: Uint32,
  c: Uint32,
  d: Uint32,
  x: Uint32,
  s: number,
  ac: Uint32
): Uint32 {
  a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_G(b, c, d), x), ac))
  return md5_AddUnsigned(md5_RotateLeft(a, s), b)
}

/**
 * md5_HH 函数是 MD5 算法中的一个变换函数。
 */
function md5_HH(
  a: Uint32,
  b: Uint32,
  c: Uint32,
  d: Uint32,
  x: Uint32,
  s: number,
  ac: Uint32
): Uint32 {
  a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_H(b, c, d), x), ac))
  return md5_AddUnsigned(md5_RotateLeft(a, s), b)
}

/**
 * md5_II 函数是 MD5 算法中的一个变换函数。
 */
function md5_II(
  a: Uint32,
  b: Uint32,
  c: Uint32,
  d: Uint32,
  x: Uint32,
  s: number,
  ac: Uint32
): Uint32 {
  a = md5_AddUnsigned(a, md5_AddUnsigned(md5_AddUnsigned(md5_I(b, c, d), x), ac))
  return md5_AddUnsigned(md5_RotateLeft(a, s), b)
}

/**
 * md5_ConvertToWordArray 函数将字符串转换为 MD5 算法所需的字数组。
 * @param string 要转换的字符串。
 * @returns 转换后的字数组。
 */
function md5_ConvertToWordArray(string: string): Uint32[] {
  let lMessageLength = string.length
  let lNumberOfWords_temp1 = lMessageLength + 8
  let lNumberOfWords_temp2 = Math.floor(lNumberOfWords_temp1 / 64)
  let lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16
  let lWordArray: Uint32[] = new Array(lNumberOfWords - 1)
  let lBytePosition = 0
  let lByteCount = 0
  let lWordCount = 0

  for (lByteCount; lByteCount < lMessageLength; lByteCount++) {
    lWordCount = Math.floor((lByteCount - (lByteCount % 4)) / 4)
    lBytePosition = (lByteCount % 4) * 8
    lWordArray[lWordCount] =
      lWordArray[lWordCount] | (string.charCodeAt(lByteCount) << lBytePosition)
  }

  lWordCount = Math.floor((lByteCount - (lByteCount % 4)) / 4)
  lBytePosition = (lByteCount % 4) * 8
  lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80 << lBytePosition)
  lWordArray[lNumberOfWords - 2] = lMessageLength << 3
  lWordArray[lNumberOfWords - 1] = lMessageLength >>> 29
  return lWordArray
}

/**
 * md5_WordToHex 函数将一个字（32位无符号整数）转换为十六进制字符串。
 * @param lValue 要转换的字。
 * @returns 转换后的十六进制字符串。
 */
function md5_WordToHex(lValue: Uint32): string {
  let WordToHexValue = '',
    WordToHexValue_temp = '',
    lByte: number,
    lCount: number = 0

  for (lCount; lCount <= 3; lCount++) {
    lByte = (lValue >>> (lCount * 8)) & 255
    WordToHexValue_temp = lByte.toString(16)
    WordToHexValue +=
      (WordToHexValue_temp.length === 1 ? '0' : '') + WordToHexValue_temp
  }
  return WordToHexValue
}

/**
 * md5_Utf8Encode 函数将字符串编码为 UTF-8 格式。
 * @param string 要编码的字符串。
 * @returns UTF-8 编码后的字符串。
 */
function md5_Utf8Encode(string: string): string {
  string = string.replace(/\r\n/g, '\n')
  let utftext: string = ''
  for (let n = 0; n < string.length; n++) {
    let c = string.charCodeAt(n)
    if (c < 128) {
      utftext += String.fromCharCode(c)
    } else if (c > 127 && c < 2048) {
      utftext += String.fromCharCode((c >> 6) | 192)
      utftext += String.fromCharCode((c & 63) | 128)
    } else {
      utftext += String.fromCharCode(
        (c >> 12) | 224,
        ((c >> 6) & 63) | 128,
        (c & 63) | 128
      )
    }
  }
  return utftext
}

const hex_md5: HexMd5Function = (string, bit = 32) => {
  let x: number[] = []
  let k: number,
    AA: number,
    BB: number,
    CC: number,
    DD: number,
    a: number,
    b: number,
    c: number,
    d: number
  const S11 = 7,
    S12 = 12,
    S13 = 17,
    S14 = 22
  const S21 = 5,
    S22 = 9,
    S23 = 14,
    S24 = 20
  const S31 = 4,
    S32 = 11,
    S33 = 16,
    S34 = 23
  const S41 = 6,
    S42 = 10,
    S43 = 15,
    S44 = 21

  string = md5_Utf8Encode(string)
  x = md5_ConvertToWordArray(string)
  a = 0x67452301
  b = 0xefcdab89
  c = 0x98badcfe
  d = 0x10325476

  for (k = 0; k < x.length; k += 16) {
    AA = a
    BB = b
    CC = c
    DD = d
    a = md5_FF(a, b, c, d, x[k + 0], S11, 0xd76aa478)
    d = md5_FF(d, a, b, c, x[k + 1], S12, 0xe8c7b756)
    c = md5_FF(c, d, a, b, x[k + 2], S13, 0x242070db)
    b = md5_FF(b, c, d, a, x[k + 3], S14, 0xc1bdceee)
    a = md5_FF(a, b, c, d, x[k + 4], S11, 0xf57c0faf)
    d = md5_FF(d, a, b, c, x[k + 5], S12, 0x4787c62a)
    c = md5_FF(c, d, a, b, x[k + 6], S13, 0xa8304613)
    b = md5_FF(b, c, d, a, x[k + 7], S14, 0xfd469501)
    a = md5_FF(a, b, c, d, x[k + 8], S11, 0x698098d8)
    d = md5_FF(d, a, b, c, x[k + 9], S12, 0x8b44f7af)
    c = md5_FF(c, d, a, b, x[k + 10], S13, 0xffff5bb1)
    b = md5_FF(b, c, d, a, x[k + 11], S14, 0x895cd7be)
    a = md5_FF(a, b, c, d, x[k + 12], S11, 0x6b901122)
    d = md5_FF(d, a, b, c, x[k + 13], S12, 0xfd987193)
    c = md5_FF(c, d, a, b, x[k + 14], S13, 0xa679438e)
    b = md5_FF(b, c, d, a, x[k + 15], S14, 0x49b40821)
    a = md5_GG(a, b, c, d, x[k + 1], S21, 0xf61e2562)
    d = md5_GG(d, a, b, c, x[k + 6], S22, 0xc040b340)
    c = md5_GG(c, d, a, b, x[k + 11], S23, 0x265e5a51)
    b = md5_GG(b, c, d, a, x[k + 0], S24, 0xe9b6c7aa)
    a = md5_GG(a, b, c, d, x[k + 5], S21, 0xd62f105d)
    d = md5_GG(d, a, b, c, x[k + 10], S22, 0x2441453)
    c = md5_GG(c, d, a, b, x[k + 15], S23, 0xd8a1e681)
    b = md5_GG(b, c, d, a, x[k + 4], S24, 0xe7d3fbc8)
    a = md5_GG(a, b, c, d, x[k + 9], S21, 0x21e1cde6)
    d = md5_GG(d, a, b, c, x[k + 14], S22, 0xc33707d6)
    c = md5_GG(c, d, a, b, x[k + 3], S23, 0xf4d50d87)
    b = md5_GG(b, c, d, a, x[k + 8], S24, 0x455a14ed)
    a = md5_GG(a, b, c, d, x[k + 13], S21, 0xa9e3e905)
    d = md5_GG(d, a, b, c, x[k + 2], S22, 0xfcefa3f8)
    c = md5_GG(c, d, a, b, x[k + 7], S23, 0x676f02d9)
    b = md5_GG(b, c, d, a, x[k + 12], S24, 0x8d2a4c8a)
    a = md5_HH(a, b, c, d, x[k + 5], S31, 0xfffa3942)
    d = md5_HH(d, a, b, c, x[k + 8], S32, 0x8771f681)
    c = md5_HH(c, d, a, b, x[k + 11], S33, 0x6d9d6122)
    b = md5_HH(b, c, d, a, x[k + 14], S34, 0xfde5380c)
    a = md5_HH(a, b, c, d, x[k + 1], S31, 0xa4beea44)
    d = md5_HH(d, a, b, c, x[k + 4], S32, 0x4bdecfa9)
    c = md5_HH(c, d, a, b, x[k + 7], S33, 0xf6bb4b60)
    b = md5_HH(b, c, d, a, x[k + 10], S34, 0xbebfbc70)
    a = md5_HH(a, b, c, d, x[k + 13], S31, 0x289b7ec6)
    d = md5_HH(d, a, b, c, x[k + 0], S32, 0xeaa127fa)
    c = md5_HH(c, d, a, b, x[k + 3], S33, 0xd4ef3085)
    b = md5_HH(b, c, d, a, x[k + 6], S34, 0x4881d05)
    a = md5_HH(a, b, c, d, x[k + 9], S31, 0xd9d4d039)
    d = md5_HH(d, a, b, c, x[k + 12], S32, 0xe6db99e5)
    c = md5_HH(c, d, a, b, x[k + 15], S33, 0x1fa27cf8)
    b = md5_HH(b, c, d, a, x[k + 2], S34, 0xc4ac5665)
    a = md5_II(a, b, c, d, x[k + 0], S41, 0xf4292244)
    d = md5_II(d, a, b, c, x[k + 7], S42, 0x432aff97)
    c = md5_II(c, d, a, b, x[k + 14], S43, 0xab9423a7)
    b = md5_II(b, c, d, a, x[k + 5], S44, 0xfc93a039)
    a = md5_II(a, b, c, d, x[k + 12], S41, 0x655b59c3)
    d = md5_II(d, a, b, c, x[k + 3], S42, 0x8f0ccc92)
    c = md5_II(c, d, a, b, x[k + 10], S43, 0xffeff47d)
    b = md5_II(b, c, d, a, x[k + 1], S44, 0x85845dd1)
    a = md5_II(a, b, c, d, x[k + 8], S41, 0x6fa87e4f)
    d = md5_II(d, a, b, c, x[k + 15], S42, 0xfe2ce6e0)
    c = md5_II(c, d, a, b, x[k + 6], S43, 0xa3014314)
    b = md5_II(b, c, d, a, x[k + 13], S44, 0x4e0811a1)
    a = md5_II(a, b, c, d, x[k + 4], S41, 0xf7537e82)
    d = md5_II(d, a, b, c, x[k + 11], S42, 0xbd3af235)
    c = md5_II(c, d, a, b, x[k + 2], S43, 0x2ad7d2bb)
    b = md5_II(b, c, d, a, x[k + 9], S44, 0xeb86d391)
    a = md5_AddUnsigned(a, AA)
    b = md5_AddUnsigned(b, BB)
    c = md5_AddUnsigned(c, CC)
    d = md5_AddUnsigned(d, DD)
  }

  if (bit === 32) {
    return (
      md5_WordToHex(a) +
      md5_WordToHex(b) +
      md5_WordToHex(c) +
      md5_WordToHex(d)
    ).toLowerCase()
  }
  return (md5_WordToHex(b) + md5_WordToHex(c)).toLowerCase()
}

export default w_md5
