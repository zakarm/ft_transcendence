'use client';

import { useCallback } from 'react';

interface GameData {
  player: string;
  score: number;
  date: string;
  result: 'WIN' | 'LOSS';
}

const convertToCSV = (data: GameData[]) => {
  if (!data || data.length === 0) {
    return '';
  }

  const headers = ['Player', 'Score', 'Date', 'Result'];
  const csvRows = [];

  // Add headers
  csvRows.push(headers.join(','));

  // Add data rows
  for (const row of data) {
    const values = [
      row.player,
      row.score.toString(),
      row.date,
      row.result,
    ];
    csvRows.push(values.join(','));
  }

  return csvRows.join('\n');
};

interface ExportCSVProps {
    data: GameData[];
    filename?: string;
}
  
export const ExportCSV = ( data: GameData[], filename: string = 'data.csv' ) => {
  // const handleExport = useCallback(() => {
  if (!data || Object.keys(data).length === 0) {
    console.error('No data to export');
    return;
  }
  // }

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
  // }, [data, filename]);


};