
const formatsMoney = (x) => {
    return new Intl.NumberFormat('it-IT', {style: 'currency', currency: 'VND'}).format(x*1000);
};

export default formatsMoney;