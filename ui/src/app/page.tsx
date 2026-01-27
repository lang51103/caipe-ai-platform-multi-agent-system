"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    // Redirect to use-cases by default
    router.replace("/use-cases");
  }, [router]);

  return null;
}
