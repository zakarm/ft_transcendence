'use client';

import { useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';

interface GameData {
  month: number;
  day: number;
  minutes: number;
}

const convertToCSV = (data: GameData[]) => {
  if (!data || data.length === 0) {
    return '';
  }

  const headers = ['date', 'minutes'];
  const csvRows = [];

  csvRows.push(headers.join(','));

  for (const row of data) {
    const values = [
      row.day.toString(),
      row.month.toString(),
      row.minutes.toString(),
    ];
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
};

interface ExportCSVProps {
    data: GameData[];
    filename?: string;
}
  
export const ExportMinutes = ( data: GameData[], filename: string = 'data.csv' ) => {
  if (!data || Object.keys(data).length === 0) {
    toast.error('No data to export !');
    return;
  }

  const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};