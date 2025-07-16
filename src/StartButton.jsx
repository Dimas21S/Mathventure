export default function StartButton({ onClick }) {
    return (
        <>
            <button
                onClick={onClick}
                className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200"
            >
                Mulai Petualangan
            </button>
        </>
    );
}