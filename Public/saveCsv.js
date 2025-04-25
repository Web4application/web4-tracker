import Papa from 'papaparse';

fetch('/predev_work.csv')
  .then(response => response.text())
  .then(csvText => {
    Papa.parse(csvText, {
      header: true,
      complete: (results) => {
        console.log(results.data);

        // Convert the data back to CSV format
        const csv = Papa.unparse(results.data);

        // Create a Blob with the CSV data
        const blob = new Blob([csv], { type: 'text/csv' });

        // Create a link to trigger the download
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'refactored_data.csv';
        link.click();
      }
    });
  });
