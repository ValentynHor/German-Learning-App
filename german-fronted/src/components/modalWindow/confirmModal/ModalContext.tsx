import React, { createContext, useContext, useState } from 'react';

interface ModalInfo {
  isOpen: boolean;
  title: string;
  text: string;
  confirmButtonText: string;
  onConfirm: (() => void) | null;
}

interface ModalContextType {
  openModal: (
    title: string,
    text: string,
    confirmButtonText?: string,
    onConfirm?: () => void
  ) => void;
  closeModal: () => void;
  modalInfo: ModalInfo;
}

const ModalContext = createContext<ModalContextType>({
  openModal: () => {},
  closeModal: () => {},
  modalInfo: {
    isOpen: false,
    title: '',
    text: '',
    confirmButtonText: '',
    onConfirm: null,
  },
});

export function ModalProvider({ children }: { children: React.ReactNode }) {
  const [modalInfo, setModalInfo] = useState<ModalInfo>({
    isOpen: false,
    title: '',
    text: '',
    confirmButtonText: '',
    onConfirm: null,
  });

  const openModal = (
    title: string,
    text: string,
    confirmButtonText = '',
    onConfirm: (() => void) | null = null
  ) => {
    setModalInfo({
      isOpen: true,
      title,
      text,
      confirmButtonText,
      onConfirm,
    });
  };

  const closeModal = () => {
    setModalInfo((prevModalInfo) => ({
      ...prevModalInfo,
      isOpen: false,
    }));
  };

  return (
    <ModalContext.Provider value={{ openModal, closeModal, modalInfo }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  return useContext(ModalContext);
}
