export function money(num) {
    let text = '';
    let key = `${num}`.length;
    num = Number.parseInt(num);
    if (num < 1000) {
        text = num;
    } else {
        while (num >= 1000) {
            num = num / 1000;
            if (key + 1 - `${num}`.length > 0) {
                for (let i = 0; i <= key - `${num}`.length; i++) {
                    text += '0';
                }
            }
        }

        text = num + text;
    }
    return `${text}.000 đ`;
}

export function total(quanity, price) {
    return money(quanity * price);
}
