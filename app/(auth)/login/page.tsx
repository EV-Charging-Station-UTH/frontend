import { Metadata } from "next";
import LoginPage from "@/views/login";

export const metadata: Metadata = {
  title: "Sign In Page | Free Next.js Template for Startup and SaaS",
  description: "This is Sign In Page for Startup Nextjs Template",
};

const Page = () => {
  return (
    <>
      <LoginPage />
    </>
  );
};

export default Page;
