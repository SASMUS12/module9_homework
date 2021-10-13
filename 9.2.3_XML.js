445function useRequest(url, callback) {
	let xhr = new XMLHttpRequest();
	xhr.open('GET', url, true);

	xhr.onload = function () {
		if (xhr.status != 200) {
			console.log('Статус ответа: ', xhr.status);
		} else {
			const result = JSON.parse(xhr.response);
			if (callback) {
				callback(result);
			}
		}
	};

	xhr.onerror = function () {
		console.log('Ошибка! Статус ответа: ', xhr.status);
	};

	xhr.send();
}

const resultNode = document.querySelector('.j-result');
const btnNode = document.querySelector('.j-btn-request');

function displayResult(apiData, number) {
	number = document.querySelector('input').value;
	const cardBlock = `
      <div class="card">
        <img
          src="${apiData[number - 1].download_url}"
          class="card-image"
        />
        <p>${apiData[number - 1].author}</p>
      </div>
    `;
	resultNode.innerHTML = cardBlock;
}

// Вешаем обработчик на кнопку для запроса
btnNode.addEventListener('click', () => {
	const value = document.querySelector('input').value;
	if (value > 10 || value < 0) {
		alert('Число вне диапазона от 1 до 10');
		console.log('Число вне диапазона от 1 до 10');
	} else {
		useRequest(`https://picsum.photos/v2/list/?limit=${value}`, displayResult);
	}
});
