const addButton = document.querySelector('.addButton');
var input = document.querySelector('.input');
const container = document.querySelector('.container');

class Item {
    constructor(itemName) {
        this.createDiv(itemName);
    }

    createDiv(itemName) {
        let input = document.createElement('input');
        input.value = itemName;
        input.disabled = true;
        input.classList.add('item_input');
        input.type = "text";

        let itemBox = document.createElement('div');
        itemBox.classList.add('item');

        let editButton = document.createElement('button');
        editButton.innerHTML = "EDIT";
        editButton.classList.add('editButton');

        let completeButton = document.createElement('button');
        completeButton.innerHTML = "MARK AS COMPLETE";
        completeButton.classList.add('completeButton');

        let unmarkButton = document.createElement('button');
        unmarkButton.innerHTML = "UNMARK";
        unmarkButton.classList.add('unmarkButton');
        unmarkButton.style.display = "none"; // Initially hidden

        let removeButton = document.createElement('button');
        removeButton.innerHTML = "REMOVE";
        removeButton.classList.add('removeButton');

        container.appendChild(itemBox);
        itemBox.appendChild(input);
        itemBox.appendChild(editButton);
        itemBox.appendChild(completeButton);
        itemBox.appendChild(unmarkButton);
        itemBox.appendChild(removeButton);

        editButton.addEventListener('click', () => this.edit(input, editButton));
        completeButton.addEventListener('click', () => this.markAsComplete(input, completeButton, unmarkButton));
        unmarkButton.addEventListener('click', () => this.unmark(input, completeButton, unmarkButton));
        removeButton.addEventListener('click', () => this.remove(itemBox));
    }

    edit(input, editButton) {
        if (input.disabled) {
            input.disabled = false;
            editButton.innerHTML = "UPDATE";
            input.focus();
        } else {
            input.disabled = true;
            editButton.innerHTML = "EDIT";
        }
    }

    markAsComplete(input, completeButton, unmarkButton) {
        input.classList.add('completed');
        completeButton.style.display = "none";
        unmarkButton.style.display = "block";
    }

    unmark(input, completeButton, unmarkButton) {
        input.classList.remove('completed');
        completeButton.style.display = "block";
        unmarkButton.style.display = "none";
    }

    remove(item) {
        container.removeChild(item);
    }
}

function check() {
    if (input.value != "") {
        new Item(input.value);
        input.value = "";
    }
}

addButton.addEventListener('click', check);
window.addEventListener('keydown', (e) => {
    if (e.which == 13) {
        check();
    }
});

// CSS styles for completed items
const style = document.createElement('style');
style.innerHTML = `
    .completed {
        text-decoration: line-through;
        color: gray;
    }
`;
document.head.appendChild(style);