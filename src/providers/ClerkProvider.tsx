
import { ClerkProvider as ClerkAuthProvider } from "@clerk/clerk-react";
import React from "react";

const publishableKey = "pk_test_c2F2ZWQtdmlwZXItODYuY2xlcmsuYWNjb3VudHMuZGV2JA";

if (!publishableKey) {
  throw new Error("Missing Clerk Publishable Key");
}

export const ClerkProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <ClerkAuthProvider publishableKey={publishableKey}>
      {children}
    </ClerkAuthProvider>
  );
};
