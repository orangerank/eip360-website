import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="text-[2.4rem]">That page is not here.</h1>
      <p className="mt-4 text-ink/75">If you followed an older EIP link, it should redirect. Otherwise start from the homepage.</p>
      <p className="mt-6">
        <Link href="/" className="font-semibold underline underline-offset-4">Back to EIP</Link>
      </p>
    </div>
  );
}
