import Router from "next/router"

export default function ErrorPage() {
    return(
        <div>
            <h1>Error 404</h1>
            <h2>Страница не существует</h2>
            <button onClick={() => Router.push('./')}>На главную</button>
        </div>
    )
}