"use client";

import { useToast } from "@/hooks/use-toast";
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast";
import { useEffect, useState } from "react";

export function Toaster() {
  const [swipeDirection, setSwipeDirection] = useState("right");

  useEffect(() => {
    const updateSwipeDirection = () => {
      if (window.innerWidth < 640) {
        setSwipeDirection("down");
      } else {
        setSwipeDirection("right");
      }
    };

    window.addEventListener("resize", updateSwipeDirection);
    updateSwipeDirection(); // Initial call

    return () => window.removeEventListener("resize", updateSwipeDirection);
  }, []);

  const { toasts } = useToast();

  return (
    <ToastProvider swipeDirection={swipeDirection}>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          <Toast
            key={id}
            {...props}
          >
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        );
      })}
      <ToastViewport />
    </ToastProvider>
  );
}
