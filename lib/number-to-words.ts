export function numberToWords(num: number): string {
    const units = [
      "",
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Eleven",
      "Twelve",
      "Thirteen",
      "Fourteen",
      "Fifteen",
      "Sixteen",
      "Seventeen",
      "Eighteen",
      "Nineteen",
    ]
    const tens = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"]
  
    function convertLessThanOneThousand(num: number): string {
      if (num === 0) {
        return ""
      }
  
      if (num < 20) {
        return units[num]
      }
  
      const ten = Math.floor(num / 10) % 10
      const unit = num % 10
  
      return ten > 0 ? tens[ten] + (unit > 0 ? "-" + units[unit] : "") : units[unit]
    }
  
    if (num === 0) {
      return "Zero"
    }
  
    // For Nigerian budget figures, we'll use a simplified approach for large numbers
    if (num >= 1_000_000_000_000) {
      const trillions = Math.floor(num / 1_000_000_000_000)
      const billions = Math.floor((num % 1_000_000_000_000) / 1_000_000_000)
  
      let result = `${trillions} Trillion`
      if (billions > 0) {
        result += ` ${billions} Billion`
      }
      return result
    }
  
    if (num >= 1_000_000_000) {
      const billions = Math.floor(num / 1_000_000_000)
      const millions = Math.floor((num % 1_000_000_000) / 1_000_000)
  
      let result = `${billions} Billion`
      if (millions > 0) {
        result += ` ${millions} Million`
      }
      return result
    }
  
    if (num >= 1_000_000) {
      const millions = Math.floor(num / 1_000_000)
      const thousands = Math.floor((num % 1_000_000) / 1_000)
  
      let result = `${millions} Million`
      if (thousands > 0) {
        result += ` ${thousands} Thousand`
      }
      return result
    }
  
    if (num >= 1_000) {
      const thousands = Math.floor(num / 1_000)
      const remainder = num % 1_000
  
      let result = `${thousands} Thousand`
      if (remainder > 0) {
        result += ` ${convertLessThanOneThousand(remainder)}`
      }
      return result
    }
  
    return convertLessThanOneThousand(num)
  }
  
  export function formatCurrencyInWords(amount: number): string {
    return `${numberToWords(amount)} Naira`
  }
  
  