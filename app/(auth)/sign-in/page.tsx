import { SignIn } from "@clerk/nextjs/app-beta";

export default function Page() {
  return (
    <section className="py-24">
      <SignIn />
    </section>
  );
}
