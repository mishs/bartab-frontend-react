module.exports = date => {
    if(typeof date === 'string') date = new Date(date);
    const d = date.getDate();
    const m = date.getMonth()+1;
    const y = date.getFullYear();
    return `${m < 10 ? `0${m}` : m}-${d < 10 ? `0${d}` : d}-${y}`
}