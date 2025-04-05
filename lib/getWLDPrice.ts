const getWLDPrice = async () => {
    const res = await fetch(
        `https://app-backend.worldcoin.dev/public/v1/miniapps/prices?cryptoCurrencies=WLD&fiatCurrencies=USD`, {
        method: 'GET',
    })
    const data = await res.json()
    const amount = data.result.prices.WLD.USD.amount
    const decimals = data.result.prices.WLD.USD.decimals
    const price = convertPrice(amount, decimals)
    return price;
}
function convertPrice(amount: string, decimals: number): number {
    // 將字符串轉換為數字
    const numericAmount = parseFloat(amount);

    // 根據 decimals 值計算實際價格
    // 例如：如果 amount 是 1510763，decimals 是 6
    // 則實際價格是 1510763 / 10^6 = 1.510763
    return numericAmount / Math.pow(10, decimals);
}
export default getWLDPrice

