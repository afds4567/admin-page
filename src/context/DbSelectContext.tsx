import { createContext, useContext, useState, ReactNode } from 'react';

interface DBContextProps {
  selectedDB: string;
  handleDBChange: (e: any) => void;
}

const DBContext = createContext<DBContextProps>({} as DBContextProps);

export function useDBContext(): DBContextProps {
  const context = useContext(DBContext);
  if (context === undefined) {
    throw new Error('useDBContext must be used within a DBProvider');
  }
  return context;
}

interface DBProviderProps {
  children: ReactNode;
}

export function DBProvider({ children }: DBProviderProps): JSX.Element {
  const [selectedDB, setSelectedDB] = useState('dev');

  const handleDBChange = (e: any) => {
    setSelectedDB(e.target.value);
  };

  const contextValue: DBContextProps = {
    selectedDB,
    handleDBChange
  };

  return <DBContext.Provider value={contextValue}>{children}</DBContext.Provider>;
}
