import { useEffect } from "react";
import { io } from "socket.io-client";
import { useAuthStore } from "../store/authStore";
import { useNotificationStore } from "../store/notificationStore";
import toast from "react-hot-toast";

let socket = null;

export function useSocket() {
  const { user, accessToken } = useAuthStore();
  const addNotification = useNotificationStore((s) => s.addNotification);

  useEffect(() => {
    if (!user || !accessToken) return;

    socket = io(import.meta.env.VITE_SOCKET_URL, {
      auth: { token: accessToken },
    });

    socket.on("connect", () => {
      socket.emit("join:team", user.teamId);
    });

    socket.on("deal:stage_changed", (data) => {
      toast(`Deal "${data.dealTitle}" moved to ${data.to.replace("_", " ")}`);
    });

    socket.on("lead:assigned", (data) => {
      if (data.assignedTo === user.id) {
        toast(`You were assigned lead: ${data.leadName}`);
        addNotification({
          id: Date.now(),
          message: `You were assigned lead: ${data.leadName}`,
          type: "lead_assigned",
          read: false,
          createdAt: new Date(),
        });
      }
    });

    socket.on("payment:overdue", (data) => {
      toast.error(`Overdue payment: ${data.message}`);
    });

    return () => {
      socket?.disconnect();
      socket = null;
    };
  }, [user, accessToken]);

  return socket;
}