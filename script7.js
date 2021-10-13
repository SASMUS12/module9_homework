/*
Задание 5.

Написать код приложения, интерфейс которого состоит из двух input и кнопки. В input можно ввести любое число.

Заголовок первого input — «номер страницы».
Заголовок второго input — «лимит».
Заголовок кнопки — «запрос».
При клике на кнопку происходит следующее:

Если число в первом input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Номер страницы вне диапазона от 1 до 10»;
Если число во втором input не попадает в диапазон от 1 до 10 или не является числом — выводить ниже текст «Лимит вне диапазона от 1 до 10»;
Если и первый, и второй input не в диапазонах или не являются числами — выводить ниже текст «Номер страницы и лимит вне диапазона от 1 до 10»;
Если числа попадают в диапазон от 1 до 10 — сделать запрос по URL https://picsum.photos/v2/list?page=1&limit=10, где GET-параметр page — это число 
из первого input, а GET-параметр limit — это введённое число второго input. 
Пример: если пользователь ввёл 5 и 7, то запрос будет вида https://picsum.photos/v2/list?page=5&limit=7.
После получения данных вывести список картинок на экран.
Если пользователь перезагрузил страницу, то ему должны показываться картинки из последнего успешно выполненного запроса (использовать localStorage).
*/

const btnNode = document.querySelector('.j-btn-request');
const resultNode = document.querySelector('.j-result');

btnNode.addEventListener('click', () => {
    const firstValue = document.getElementById("inp1").value
    const secondValue = document.getElementById("inp2").value
    if ((firstValue > 10 || firstValue < 1 || isNaN(firstValue)) &&
        (secondValue < 1 || secondValue > 10 || isNaN(secondValue))) {
        resultNode.innerHTML = `
      <div>Номер страницы и лимит вне диапазона от 1 до 10</div>
    `;
    } else if (firstValue > 10 || firstValue < 1 || isNaN(firstValue)) {
        resultNode.innerHTML = `
      <div>Номер страницы вне диапазона от 1 до 10</div>
    `;
    } else if (secondValue > 10 || secondValue < 1 || isNaN(secondValue)) {
        resultNode.innerHTML = `
      <div>Лимит вне диапазона от 1 до 10</div>
    `;
    } else {
        fetch(` https://picsum.photos/v2/list?page=${firstValue}&limit=${secondValue}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                localStorage.setItem('items', JSON.stringify(data))
                let cards = '';
                data.forEach(item => {
                    const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
      </div>
    `;
                    cards = cards + cardBlock;
                });
                resultNode.innerHTML = cards;
            })
            .catch(() => {
                console.log('error')
            });
    }
})
//Показываться картинки из последнего успешно выполненного запроса(реалезация)
const state = localStorage.getItem('items')
const myState = JSON.parse(state)

window.onload = function () {
if(state) {
    let cards = '';
    myState.forEach(item => {
        const cardBlock = `
      <div class="card">
        <img
          src="${item.download_url}"
          class="card-image"
        />
      </div>
    `;
        cards = cards + cardBlock;
    });
    resultNode.innerHTML = cards;
}
}