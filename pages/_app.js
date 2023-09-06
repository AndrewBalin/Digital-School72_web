import './globalStyle.css'
import Head from "next/head";

export default function App({ Component,  pageProps }) {
    return(
        <>
            <Head>
                <title>Цифровая Школа</title>
                <meta charSet="utf-8"/>
                <link rel="apple-touch-icon" sizes="180x180" href="images/apple-touch-icon.png"/>
                <link rel="icon" type="image/spng" sizes="32x32" href="images/favicon-32x32.png"/>
                <link rel="icon" type="image/png" sizes="16x16" href="images/favicon-16x16.png"/>
                <link rel="manifest" href="images/site.webmanifest"/>
                <link rel="mask-icon" href="images/safari-pinned-tab.svg" color="#5bbad5"/>
                <meta name="msapplication-TileColor" content="#603cba"/>
                <meta name="msapplication-TileImage" content="/mstile-144x144.png"/>
                <meta name="theme-color" content="#ffffff"/>
                <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no, shrink-to-fit=no, viewport-fit=cover"/>
                <meta name="theme-color" content="#000000"/>
                <meta
                    name="description"
                    content="Новая образовательная платформа прямо в твоём браузере или телефоне! Наш электронный дневник, призванн облегчить жизнь всем участникам учебного процесса, вскоре он будет доступен для бета тестирования!"
                />

            </Head>
            <Component {...pageProps}/>
        </>
    )
}