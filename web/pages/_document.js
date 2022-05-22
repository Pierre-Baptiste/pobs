import Document, { Html, Head, Main, NextScript } from 'next/document'
import { threadId } from 'worker_threads'
import { client } from '../utils/sanityClient'

class MyDocument extends Document {
    static async getInitialProps(ctx) {
        const initialProps = await Document.getInitialProps(ctx)
        return client
            .fetch('*[_type == "siteSettings"] {description, keywords}[0]')
            .then((settings) => {
                return { ...initialProps, ...settings }
            })
    }

    render() {
        return (
            <Html>
                <Head>
                    <meta name="author" content="Pierre-Baptiste Dupire" />
                    <meta name="description" content={this.props.description} />
                    <meta name="keywords" content={this.props.keywords.join(', ')} />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Raleway:wght@400;800&family=Source+Code+Pro:wght@300;400&display=swap"
                        rel="stylesheet"
                    />
                    <link rel="icon" href="/favicon.ico" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument
