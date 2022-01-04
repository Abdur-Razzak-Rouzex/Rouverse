import Document, {Head, Html, NextScript, Main} from "next/document";
import {ServerStyleSheets} from "@material-ui/core/styles";
import App from "next/app";
import React from 'react';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head></Head>
                <body>
                <Main/>
                <NextScript/>
                </body>
            </Html>
        )
    }
}

MyDocument.getInitialProps = async ctx => {
    const serverSheets = new ServerStyleSheets();
    const originalRenderPage = ctx.renderPage;
    ctx.renderPage = () => {
        return originalRenderPage({
            enhanceApp: (App) => (props) => serverSheets.collect(<App {...props} />),
        });
    };

    const initialProps = await Document.getInitialProps(ctx);
    return {
        ...initialProps,
        styles: [
            ...React.Children.toArray(initialProps.styles),
            serverSheets.getStyleElement(),
        ]
    }
}