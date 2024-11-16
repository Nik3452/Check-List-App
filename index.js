$(document).ready(function() {
    const storedItems = JSON.parse(localStorage.getItem('items')) || [];
    const currentDate = new Date().toISOString().slice(0, 10);

    storedItems.forEach((item, index) => {
        if (item.date < currentDate) {
            storedItems.splice(index);
        }
    });
    localStorage.setItem('items', JSON.stringify(storedItems));

    $('#clearBtn').click(function() {
        $('#itemList').empty();
        localStorage.clear();
    });

    $('#addItem').click(function() {
        const itemInput = $('#itemInput').val();
        const dateInput = $('#dateInput').val();
        const itemList = $('#itemList');
        let localData = {
            item: itemInput,
            date: dateInput
        };
        const listItem = $(`<li>${itemInput} At ${dateInput} <button class="remItem">Remove</button></li>`);
        itemList.append(listItem);
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items.push(localData);
        localStorage.setItem('items', JSON.stringify(items));
    });

    const itemList = $('#itemList');
    storedItems.forEach(item => {
        const listItem = $(`<li>${item.item} At ${item.date} <button class="remItem">Remove</button></li>`);
        itemList.append(listItem);
    });

    itemList.on('click', '.remItem', function() {
        const listItem = $(this).parent();
        const itemText = listItem.text().replace(' Remove', '');
        listItem.remove();
        let items = JSON.parse(localStorage.getItem('items')) || [];
        items = items.filter(item => `${item.item} At ${item.date}` !== itemText);
        localStorage.setItem('items', JSON.stringify(items));
    });
});