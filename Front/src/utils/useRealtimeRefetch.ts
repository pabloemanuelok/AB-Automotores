"use client";

import { useContext, useEffect, useRef } from "react";
import { UserContext } from "@/Context/contextUser";

const BACKUP_POLL_MS = 75_000;

/**
 * Refetchea cuando el socket avisa que algo cambió (ver docs/backend-specs/03-realtime.md)
 * y, como red de seguridad acordada, también cada ~75s por si la conexión se corta
 * silenciosamente (riesgo conocido de WebSockets long-lived en Cloud Run).
 */
export function useRealtimeRefetch(events: string[], onChange: () => void) {
  const { socket } = useContext(UserContext);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const eventsRef = useRef(events);
  eventsRef.current = events;
  const eventsKey = events.join(",");

  useEffect(() => {
    const interval = setInterval(() => onChangeRef.current(), BACKUP_POLL_MS);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!socket) return;
    const handler = () => onChangeRef.current();
    eventsRef.current.forEach((event) => socket.on(event, handler));
    return () => {
      eventsRef.current.forEach((event) => socket.off(event, handler));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [socket, eventsKey]);
}
