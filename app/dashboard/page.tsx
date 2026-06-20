"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import {
  ArrowLeft,
  Calendar,
  Loader2,
  LogOut,
  Mail,
  User
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Handle redirect if not logged in
  useEffect(() => {
    if (!isPending && !session?.user) {
      router.push("/");
    }
  }, [session, isPending, router]);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            router.push("/");
          },
        },
      });
    } catch (error) {
      console.error("Error logging out:", error);
      setIsLoggingOut(false);
    }
  };

  if (isPending) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-background/80 z-0" />
        <div className="absolute inset-0 grid-pattern opacity-20 z-0" />
        <div className="relative z-10 flex flex-col items-center space-y-4">
          <Loader2 className="h-10 w-10 text-primary animate-spin" />
          <p className="text-sm font-medium text-muted-foreground animate-pulse">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  if (!session?.user) {
    return null; // Will redirect in useEffect
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-background text-foreground relative">

      {/* Header */}
      <header className="relative z-10 border-b border-border/50 bg-background/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between">
          <button 
            onClick={() => router.push("/")}
            className="flex items-center gap-2 group text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </button>

          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 rounded-full overflow-hidden border border-border/80">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User avatar"}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-4 w-4" />}
                </div>
              )}
            </div>
            <span className="text-sm font-semibold hidden sm:inline">{user.name}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-2xl mx-auto px-4 py-12 sm:py-16">
        <div className="space-y-8">
          
          {/* Welcome Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 p-8 rounded-3xl border border-border/80 bg-card/40 backdrop-blur-sm">
            <div className="space-y-2">
              <h1 className="text-3xl font-heading font-medium tracking-tight">
                Welcome, <span className="text-primary">{user.name}</span>!
              </h1>
              <p className="text-sm text-muted-foreground max-w-md">
                Access your profile details, logged enquiries, and account settings.
              </p>
            </div>
          </div>

          {/* Profile Details & Account Card Centered */}
          <div className="p-8 rounded-3xl border border-border/80 bg-card/60 backdrop-blur-sm flex flex-col items-center text-center space-y-6">
            <div className="relative h-28 w-28 rounded-full overflow-hidden border-2 border-primary/50 shadow-lg">
              {user.image ? (
                <img
                  src={user.image}
                  alt={user.name || "User avatar"}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="h-full w-full bg-primary/10 flex items-center justify-center text-primary font-bold text-3xl">
                  {user.name ? user.name.charAt(0).toUpperCase() : <User className="h-10 w-10" />}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <h3 className="font-heading text-2xl font-medium">{user.name}</h3>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>

            <div className="w-full max-w-md pt-6 border-t border-border/50 space-y-3.5 text-left text-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Email Address
                </span>
                <span className="text-foreground font-medium truncate max-w-[220px]">{user.email}</span>
              </div>
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Member Since
                </span>
                <span className="text-foreground font-medium">Joined recently</span>
              </div>
            </div>

            <Button
              onClick={handleLogout}
              disabled={isLoggingOut}
              variant="outline"
              className="w-full max-w-sm rounded-xl mt-6 border-red-500/20 bg-red-500/5 text-red-400 hover:bg-red-500 hover:text-white transition-all text-xs py-2.5 h-auto"
            >
              {isLoggingOut ? (
                <>
                  <Loader2 className="h-3.5 w-3.5 mr-2 animate-spin" />
                  Logging out...
                </>
              ) : (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  Logout Account
                </>
              )}
            </Button>
          </div>

        </div>
      </main>
    </div>
  );
}
