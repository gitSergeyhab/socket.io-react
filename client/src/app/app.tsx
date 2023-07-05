
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Chat } from '../pages/chat/chat';



const AppRoute = {
  Main: '/',
  Chat: 'chat'


};

function MainPage() {
  return <div>Main<div><Link to={AppRoute.Chat}>Chat</Link></div></div>
}


export function App() {

  return (
    <BrowserRouter>

              <Routes>

                <Route path={AppRoute.Main} element={<MainPage />} />
                <Route path={AppRoute.Chat} element={<Chat />} />

              </Routes>

    </BrowserRouter>
  );
}
