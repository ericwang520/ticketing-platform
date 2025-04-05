import axios from 'axios';

const fetchWLDPriceData = async () => {
    try {
        const response = await axios.get(
            'https://app-backend.worldcoin.dev/public/v1/miniapps/prices',
            {
                params: {
                    cryptoCurrencies: 'WLD,USDCE',
                    fiatCurrencies: 'USD',
                },
            }
        );

        return response.data;
    } catch (error) {
        console.error('Error fetching WLD price data:', error);
        throw error;
    }
};

const parseWLDPrice = (data: any): number => {
    try {
        if (!data?.result?.prices?.WLD?.USD?.amount || !data?.result?.prices?.WLD?.USD?.decimals) {
            throw new Error('Invalid response format');
        }

        const amount = data.result.prices.WLD.USD.amount;
        const decimals = data.result.prices.WLD.USD.decimals;

        console.log(`Fetched WLD Price - Amount: ${amount}, Decimals: ${decimals}`);

        return convertPrice(amount, decimals);
    } catch (error) {
        console.error('Error parsing WLD price:', error);
        throw error;
    }
};

const getWLDPrice = async (): Promise<number> => {
    const data = await fetchWLDPriceData();
    return parseWLDPrice(data);
};

function convertPrice(amount: string, decimals: number): number {
    const numericAmount = parseFloat(amount);
    return numericAmount / Math.pow(10, decimals);
}

export default getWLDPrice;
