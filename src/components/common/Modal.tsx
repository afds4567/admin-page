/* eslint-disable react/display-name */
import React, { createContext, useContext, useState } from 'react';
import styled from 'styled-components';

interface ModalContextProps {
  isOpened: boolean;
  setIsOpened: (open: boolean) => void;
}

const ModalContext = createContext<ModalContextProps>({ isOpened: false, setIsOpened: () => {} });

const StyledDialog = styled.dialog``;

export const Modal = ({ children }: { children: React.ReactNode }) => {
  const [isOpened, setIsOpened] = useState(false);

  return (
    <ModalContext.Provider value={{ isOpened, setIsOpened }}>
      <StyledDialog open={isOpened}>{children}</StyledDialog>
    </ModalContext.Provider>
  );
};

Modal.Header = ({ children }: { children: React.ReactNode }) => {
  const { setIsOpened } = useContext(ModalContext);

  return (
    <div>
      {children}
      <button onClick={() => setIsOpened(false)}>X</button>
    </div>
  );
};

Modal.Body = ({ children }: { children: React.ReactNode }) => {
  return <div>{children}</div>;
};

Modal.Footer = ({ children }: { children: React.ReactNode }) => {
  const { setIsOpened } = useContext(ModalContext);

  return (
    <div>
      {children}
      <button onClick={() => setIsOpened(false)}>Close</button>
    </div>
  );
};
