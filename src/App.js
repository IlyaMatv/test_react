import "./App.css";
import styled from "styled-components";
import Header from "./ui/Header/Header";
import { useEffect, useState } from "react";
import AllProcess from "./ui/AllProcess/AllProcess";

const AppWrap = styled.div`
  background-color: #ccc;
  max-width: 100vw;
  min-height: 100vh;
  padding: 0 40px;
  display: flex;
  flex-direction: column;
`;

function App() {
  useEffect(() => {
    async function subscribe() {
      const prcUpdate = JSON.parse(localStorage.getItem("prc"));
      console.log(prcUpdate);
      await setTimeout(() => {
        subscribe();
      }, 60000);
    }
    subscribe();
  }, []);

  const [sectionShow, setSectionShow] = useState(false);

  return (
    <AppWrap>
      <Header onClickFn={() => setSectionShow((state) => !state)} />

      {sectionShow && <AllProcess />}
    </AppWrap>
  );
}

export default App;

// Process
// id: String
// name: String
// startTime: Number
// jobsCount: Number

// Job
// id: String
// processId: String
// name: String
// status: Enum [running, successed, failed]

// Необходимо реализовать следующий функционал:
// - просмотр списка процессов
// - просмотр списка джоб каждого из процессов
// - создание нового процесса
// - сортировка процессов по всем полям
// - поиск джобы по имени
// - удаление процесса, включая все его джобы

// Создание процесса:
// - новый процесс создаётся с абсолютно рандомными значениями полей
// - вместе с ним создаётся случайное количество джоб (от 1 до 10)
// - статус джоб так же рандомный
// - процесс должен отображать общий статус джоб: все успешные - процесс успешен; все завершены с ошибкой - процесс с ошибкой; хоть одна джоба запущена - весь процесс in progress.
// Клиент должен постоянно запрашивать обновления (например, раз в 10 минут). Особых требований нет, хоть вебсокеты, хоть обычный поллинг.

// Требования к бэкенду:
// Можно использовать всё, что угодно. Хоть АПИ на ноде с БД, хоть простой адаптер на клиенте с сохранением в локалсторадж.

// Требования к фронтенду:
// - необходимо использовать сязку React+Redux (мы дополнительно используем redux-toolkit, но это по желанию)
// - для сайд-эффектов тулкитовые thunk
// - стилизация компонентов через styled-components
// - можно использовать ant design
