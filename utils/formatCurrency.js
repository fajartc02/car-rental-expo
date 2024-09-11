const formatCurrency = (number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "IDR",
        maximumFractionDigits: 0,
    }).format(number);
};

export default formatCurrency;