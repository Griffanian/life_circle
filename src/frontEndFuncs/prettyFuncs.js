function getBritishDateFormat(item) {
    const date = new Date(item); // Create a Date object with the current date/time
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month starts from 0, so add 1
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
}

export { getBritishDateFormat }