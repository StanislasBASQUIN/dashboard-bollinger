/*
 * AccessContext — Bollinger CI Dashboard
 * Gestion de l'accès freemium / full-access par mot de passe
 * Stockage sessionStorage (expire à la fermeture de l'onglet)
 */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

const CORRECT_PASSWORD = "full-access";
const SESSION_KEY = "bollinger_access_level";

interface AccessContextType {
  isFullAccess: boolean;
  unlock: (password: string) => boolean;
  lock: () => void;
  showPasswordModal: boolean;
  openPasswordModal: () => void;
  closePasswordModal: () => void;
}

const AccessContext = createContext<AccessContextType>({
  isFullAccess: false,
  unlock: () => false,
  lock: () => {},
  showPasswordModal: false,
  openPasswordModal: () => {},
  closePasswordModal: () => {},
});

export function AccessProvider({ children }: { children: ReactNode }) {
  const [isFullAccess, setIsFullAccess] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem(SESSION_KEY);
    if (stored === "full") setIsFullAccess(true);
  }, []);

  const unlock = (password: string): boolean => {
    if (password === CORRECT_PASSWORD) {
      setIsFullAccess(true);
      sessionStorage.setItem(SESSION_KEY, "full");
      setShowPasswordModal(false);
      return true;
    }
    return false;
  };

  const lock = () => {
    setIsFullAccess(false);
    sessionStorage.removeItem(SESSION_KEY);
  };

  const openPasswordModal = () => setShowPasswordModal(true);
  const closePasswordModal = () => setShowPasswordModal(false);

  return (
    <AccessContext.Provider value={{ isFullAccess, unlock, lock, showPasswordModal, openPasswordModal, closePasswordModal }}>
      {children}
    </AccessContext.Provider>
  );
}

export const useAccess = () => useContext(AccessContext);
