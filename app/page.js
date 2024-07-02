import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>DevMockupAI</h1>
      <p>An AI-powered mockup and resume builder for developers</p>
      <Button as="a" variant="dark" size="lg" className="mt-4">
        Get Started
      </Button>
    </div>
  );
}
