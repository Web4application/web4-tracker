import Papa from 'papaparse';

fetch('/predev_work.csv')
  .then(response => response.text())
  .then(csvText => {
    Papa.parse(csvText, {
      header: true,
      complete: (results) => {
        console.log(results.data);
      }
    });
  });
