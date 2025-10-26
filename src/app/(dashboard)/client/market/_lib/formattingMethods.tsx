export const formatCurrency = (value: number | string) => {
    return parseFloat(value.toString()).toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
    });
};

export const formatPercentage = (value: number | string) => {
    return parseFloat(value.toString()).toFixed(2) + '%';
};

export const formatVolume = (value: number | string) => {
    return parseInt(value.toString()).toLocaleString();
};