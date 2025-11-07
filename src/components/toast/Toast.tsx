import React, { useState, useEffect } from "react";
import { IonToast } from "@ionic/react";
import {
  checkmarkCircleSharp,
  closeCircleSharp,
  informationSharp,
  alertCircleSharp,
} from "ionicons/icons";
import "./Toast.css";

interface ToastProps {
  message?: string;
  state?: "show" | "success" | "error" | "info" | "warning" | "loading";
  duration?: number;
  color?:
    | "primary"
    | "secondary"
    | "tertiary"
    | "success"
    | "warning"
    | "danger"
    | "light"
    | "medium"
    | "dark";
  icon?: string;
  onClose?: () => void;
}

const EVENT_NAME = "app-toast";

const Toast: React.FC<ToastProps> = ({
  message: propMessage,
  state: propState,
  duration: propDuration = 3000,
  color: propColor,
  icon: propIcon,
  onClose,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState<string | undefined>(propMessage);
  const [state, setState] = useState<ToastProps["state"] | undefined>(
    propState
  );
  const [duration, setDuration] = useState<number>(propDuration);
  const [color, setColor] = useState<ToastProps["color"] | undefined>(
    propColor
  );
  const [icon, setIcon] = useState<string | undefined>(propIcon);

  useEffect(() => {
    // If parent passes message prop, open toast
    if (propMessage) {
      setMessage(propMessage);
      setState(propState);
      setDuration(propDuration);
      setColor(propColor);
      setIcon(propIcon);
      setIsOpen(true);
    }
  }, [propMessage, propState, propDuration, propColor, propIcon]);

  useEffect(() => {
    const handler = (e: Event) => {
      const detail = (e as CustomEvent).detail || {};
      setMessage(detail.message);
      setState(detail.state);
      setDuration(detail.duration ?? 3000);
      setColor(detail.color);
      setIcon(detail.icon);
      setIsOpen(true);
    };
    window.addEventListener(EVENT_NAME, handler as EventListener);
    return () =>
      window.removeEventListener(EVENT_NAME, handler as EventListener);
  }, []);

  const colorMap: Record<string, ToastProps["color"] | undefined> = {
    success: "success",
    error: "danger",
    warning: "warning",
    info: "primary",
    loading: "medium",
    show: color ?? "primary",
  };
  const iconMap: Record<string, ToastProps["icon"] | undefined> = {
    success: checkmarkCircleSharp,
    error: closeCircleSharp,
    info: informationSharp,
    warning: alertCircleSharp,
  };

  const finalColor = color ?? (state ? colorMap[state] : undefined);
  const findIcon = icon ?? (state ? iconMap[state] : undefined);

  return (
    <IonToast
      className="custom-toast"
      isOpen={isOpen}
      message={message}
      duration={duration}
      color={finalColor}
      icon={findIcon}
      onDidDismiss={() => {
        setIsOpen(false);
        onClose?.();
      }}
    />
  );
};

export default Toast;
