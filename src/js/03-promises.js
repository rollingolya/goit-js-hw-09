import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('.form');

// функція створює проміс з параметрами 1. номер проміса - position 2. затримка - delay

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay })
      }
      reject({ position, delay })
    }, delay);
  });
};

formRef.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const dataForm = new FormData(form);
  const finalData = {};
  for (const [key, value] of dataForm.entries()) {
    finalData[key] = Number(value);
  }

  // clear form
  form.reset();
  // in cycle for to call function to create promise

  for (let position = 1; position <= finalData.amount; position += 1) {
    createPromise(position, finalData.delay).then(onSuccess).catch(onError);
    finalData.delay = finalData.delay + finalData.step;
  };
};


function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};

function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};



// createPromise(2, 1500)
//   .then(({ position, delay }) => {
//     console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
//   })
//   .catch(({ position, delay }) => {
//     console.log(`❌ Rejected promise ${position} in ${delay}ms`);
//   });