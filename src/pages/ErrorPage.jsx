import { useRouteError, Link } from "react-router-dom";

export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 text-center">
            <h1 className="text-4xl font-bold mb-4">⚠️ Oops!</h1>
            <p className="mb-2">Sorry, an unexpected error has occurred.</p>
            <p className="text-gray-600 mb-6">
                <i>{error.statusText || error.message}</i>
            </p>
            <Link
                to="/"
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
                Go Home
            </Link>
        </div>
    );
}
