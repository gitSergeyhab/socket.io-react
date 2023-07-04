
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';



const AppRoute = {
  Main: '/',
  Second: 'second'


};

function MainPage() {
  return <div>Main<div><Link to={AppRoute.Second}>Second</Link></div></div>
}
function SecondPage() {
  return <div>SecondPage<div><Link to={AppRoute.Main}>Main</Link></div></div>
}

export function App() {

  return (
    <BrowserRouter>

              <Routes>

                <Route path={AppRoute.Main} element={<MainPage />} />
                <Route path={AppRoute.Second} element={<SecondPage />} />

              </Routes>

    </BrowserRouter>
  );
}
