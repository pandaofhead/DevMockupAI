import { SignIn } from "@clerk/nextjs";
export default function page() {
  return (
    <div className="bg-white min-h-screen flex justify-center items-center dark:bg-slate-800">
      <SignIn />
    </div>
  );
}
