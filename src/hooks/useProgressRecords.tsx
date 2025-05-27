
import { useState, useEffect } from 'react';

interface ProgressRecord {
  id: string;
  date: string;
  title: string;
  description: string;
  type: "measurement" | "photo" | "feeling" | "milestone";
  value?: string;
}

export const useProgressRecords = () => {
  const [records, setRecords] = useState<ProgressRecord[]>(() => {
    const saved = localStorage.getItem('progressRecords');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('progressRecords', JSON.stringify(records));
    console.log('Progress records saved:', records);
  }, [records]);

  const addRecord = (newRecord: Omit<ProgressRecord, 'id'>) => {
    const record = {
      ...newRecord,
      id: Date.now().toString(),
    };
    setRecords(prev => [record, ...prev]);
  };

  const removeRecord = (id: string) => {
    setRecords(prev => prev.filter(record => record.id !== id));
  };

  const getRecentRecords = (limit: number = 3) => {
    return records.slice(0, limit);
  };

  return {
    records,
    addRecord,
    removeRecord,
    getRecentRecords,
  };
};
