
const formatsMoney = (x) => {
    return new Intl.NumberFormat('it-IT', {style: 'currency', currency: 'VND'}).format(x);
};

export default formatsMoney;