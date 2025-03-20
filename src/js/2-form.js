// Завдання 2 - Форма зворотного зв'язку

// Виконуй це завдання у файлах 2-form.html і 2-form.js.

// Додай у HTML розмітку форми. У JS напиши скрипт, який буде зберігати значення полів у локальне сховище, коли користувач щось друкує.

// <form class="feedback-form" autocomplete="off">
//   <label>
//     Email
//     <input type="email" name="email" autofocus />
//   </label>
//   <label>
//     Message
//     <textarea name="message" rows="8"></textarea>
//   </label>
//   <button type="submit">Submit</button>
// </form>

// Виконуй це завдання у файлах 2-form.html і 2-form.js. Розбий його на декілька підзавдань:

// Оголоси поза будь-якими функціями об’єкт formData з полями email та message, які спочатку мають порожні рядки як значення: { email: "", message: "" }.

const formData = {
  email: '',
  message: '',
};

// Використовуй метод делегування для відстеження змін у формі через подію input. Зберігай актуальні дані з полів email та message у formData та записуй цей об’єкт у локальне сховище. Використовуй ключ "feedback-form-state" для зберігання даних у сховищі.

const LS_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');

console.dir(form);

if (localStorage.getItem(LS_KEY)) {
  const parsedKey = JSON.parse(localStorage.getItem(LS_KEY));

  if (parsedKey.email) {
    formData.email = parsedKey.email || '';
    form.elements.email.value = formData.email;
  }

  if (parsedKey.message) {
    formData.message = parsedKey.message || '';
    form.elements.message.value = formData.message;
  }
}

form.addEventListener('input', handleInput);
form.addEventListener('submit', handleSubmit);

function handleInput(event) {
  if (event.target.name === 'email') {
    formData.email = event.target.form.elements.email.value.trim();
  } else if (event.target.name === 'message') {
    formData.message = event.target.form.elements.message.value.trim();
  }

  localStorage.setItem(LS_KEY, JSON.stringify(formData));
}

function handleSubmit(event) {
  event.preventDefault();

  const userEmail = event.target.elements.email.value.trim();
  const userMessage = event.target.elements.message.value.trim();

  formData.email = userEmail;
  formData.message = userMessage;

  if (userEmail === '' || userMessage === '') {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(LS_KEY);

  formData.email = '';
  formData.message = '';

  form.reset();
}

// На що буде звертати увагу ментор при перевірці:

// На живій сторінці відображається форма з двома елементами форми і кнопкою типу submit
// Форма стилізована згідно з макетом
// На формі прослуховуються події input і submit
// При введенні даних у будь-який елемент форми вони записуються у локальне сховище під ключем "feedback-form-state", збережені дані не містять пробіли по краях
// Введення даних в одне поле форми не видаляє дані в сховищі для іншого
// При оновленні сторінки дані з локального сховища підставляються в елементи форми, у полях форми відсутні undefined
// При сабміті форми є перевірка, щоб обидва елементи форми були заповнені
// Під час сабміту форми, якщо обидва елементи форми заповнені, виводиться у консоль об'єкт з полями email, message та їхніми поточними значеннями, а також очищаються сховище і поля форми
// Якщо після сабміту форми ввести в будь-який елемент форми дані, то в локальному сховищі не з’являються дані від попереднього сабміта
