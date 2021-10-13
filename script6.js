/*
Задание 4.
Напишите код приложения, интерфейс которого представляет собой 2 input и кнопку submit. 
В input можно ввести любое число. При клике на кнопку происходит следующее:
Если оба числа не попадают в диапазон от 100 до 300 или введено не число — выводить 
ниже текст «одно из чисел вне диапазона от 100 до 300»;
Если числа попадают в диапазон от 100 до 300 — сделать запрос c помощью fetch по 
URL https://picsum.photos/200/300, где первое число — ширина картинки, второе — высота.
Пример: если пользователь ввёл 150 и 200, то запрос будет вида https://picsum.photos/150/200.
*/

// Ищем кнопку, по нажатии на которую будет запрос
const btnNode = document.querySelector('.j-btn-request');
// Ищем ноду для вставки результата запроса
const resultNode = document.querySelector('.j-result');

btnNode.addEventListener('click', () => {
    const firstValue = document.getElementById("inp1").value
    const secondValue = document.getElementById("inp2").value
    if (firstValue >= 100 && firstValue <= 300 && secondValue >= 100 &&
        secondValue <= 300 && !isNaN(firstValue) && !isNaN(secondValue)) {
        fetch(`https://picsum.photos/${firstValue}/${secondValue}`)
            .then((response) => {
                console.log('response', response)
                resultNode.innerHTML = `
      <div class="card">
        <img 
          src=${response.url}
          class="card-image"
        />
      </div>
    `;
            })
            .catch(() => {
                console.log('error')
            });
    } else {
        alert("Одно из чисел вне диапазона от 100 до 300")
        console.log("Одно из чисел вне диапазона от 100 до 300")
    }
})
