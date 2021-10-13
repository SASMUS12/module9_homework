/* Этап 1. Подготовка данных */

// JSON, который мы будем парсить
const jsonString = `
{
 "list": [
  {
   "name": "Petr",
   "age": "20",
   "prof": "mechanic"
  },
  {
   "name": "Vova",
   "age": "60",
   "prof": "pilot"
  }
 ]
}
`;

/* Этап 2. Получение данных */
const data = JSON.parse(jsonString);
const list = [];
data.list.forEach(person => {
	const name = person.name;
	const age = person.age;
	const prof = person.prof;

	list.push({
		name: name,
		age: age,
		prof: prof,
	});
});

/* Этап 3. Запись данных в результирующий объект */
const result = { list: list };

console.log(result);
