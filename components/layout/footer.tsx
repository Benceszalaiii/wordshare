
export default function Footer() {
  return (
    <div className="absolute w-full text-center flex items-center justify-center">

      <p className="text-gray-500 rounded-t-xl bg-orange-200 dark:bg-black pb-10 overflow-hidden max-h-6 p-4">
        A project by{" "}
        <a
          className="font-semibold text-gray-600 underline-offset-4 transition-colors hover:underline"
          href="https://github.com/benceszalaiii"
          target="_blank"
          rel="noopener noreferrer"
        >
          Benceszalaiii
        </a>
      </p>

    </div>
  );
}
