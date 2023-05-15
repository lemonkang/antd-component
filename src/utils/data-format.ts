export const formatCardNumber = (cardNumber: string) => {
  let newStr = ''
  for (let i = 0; i < cardNumber.length; i++) {
    if (i % 4 === 0 && i !== 0) {
      newStr += ` ${cardNumber[i]}`
    } else {
      newStr += cardNumber[i]
    }
  }
  return newStr
}