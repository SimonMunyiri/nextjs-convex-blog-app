import Link from "next/link";
import { Button } from "../ui/button";
import { ThemeToggle } from "./theme-toggle";
import { useConvexAuth } from "convex/react";

export default function Navbar() {
  const { isAuthenticated, isLoading } = useConvexAuth(); // Get authentication status and loading state

  return (
    <nav className="w-full py-5 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Link href="/">
          <h1 className="text-3xl font-bold">
            Next<span className="text-blue-500">Pro</span>
          </h1>
        </Link>

        <div className="flex items-center gap-2">
          <Link href="/">Home</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/create">Create</Link>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/*
         * Determines which button to display based on user authentication
         * status and loading state.
         *
         * - If the request is not loading and the user is authenticated,
         *   display the logout button.
         * - If the user is not authenticated, display the login/signup button.
         */}
        {isLoading ? null : isAuthenticated ? (
          // Show logout button if authenticated
          <Button size="xs" variant="outline" onClick={() => {}}>
            Logout
          </Button>
        ) : (
          // Show login/signup buttons if not authenticated
          <>
            <Link href="/auth/sign-up">
              <Button size="xs" variant="outline">
                Sign Up
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button size="xs" variant="outline">
                Login
              </Button>
            </Link>
          </>
        )}

        <ThemeToggle />
      </div>
    </nav>
  );
}
