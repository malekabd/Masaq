import React from "react";
import { jsPDF } from "jspdf";
import signture from "./Signature.png"; // Import Signature file
import mylogo from "./logo.png"; // Import logo file

const Certificate = () => {
  const generatePDF = () => {
    const pdfDoc = new jsPDF({
      orientation: "landscape",
    });

    // Add a decorative border
    pdfDoc.setDrawColor(255, 0, 0); // Red color for the border
    pdfDoc.rect(
      10,
      10,
      pdfDoc.internal.pageSize.getWidth() - 20,
      pdfDoc.internal.pageSize.getHeight() - 20
    );

    // Draw a circle
    pdfDoc.setFillColor(229, 249, 252); //  color
    pdfDoc.circle(
      pdfDoc.internal.pageSize.getWidth() / 2,
      pdfDoc.internal.pageSize.getHeight() / 2,
      60,
      "F"
    );

    // Add logo
    const logoWidth = 30; // Set the width of the logo
    const logoHeight = 30; // Set the height of the logo
    const logoX = (pdfDoc.internal.pageSize.getWidth() - logoWidth) / 11;
    const logoY = (pdfDoc.internal.pageSize.getHeight() - logoHeight) / 8.5;
    pdfDoc.addImage(mylogo, "PNG", logoX, logoY, logoWidth, logoHeight);

    // Add title
    pdfDoc.setFontSize(34);
    pdfDoc.setTextColor(0, 51, 102);
    pdfDoc.text(
      "Certificate of Attendance",
      pdfDoc.internal.pageSize.getWidth() / 2,
      35,
      { align: "center" }
    );

    // Add first phrase
    pdfDoc.setFontSize(16);
    pdfDoc.setTextColor(0, 51, 102);
    pdfDoc.text(
      "This is to certify that",
      pdfDoc.internal.pageSize.getWidth() / 2,
      70,
      { align: "center" }
    );

    // Add Employee name
    pdfDoc.setFontSize(16);
    pdfDoc.setTextColor(51, 102, 0);
    pdfDoc.text("Nasha Ali", pdfDoc.internal.pageSize.getWidth() / 2, 80, {
      align: "center",
    });

    // Add second phrase
    pdfDoc.setFontSize(16);
    pdfDoc.setTextColor(0, 51, 102);
    pdfDoc.text(
      "has been attend the program within company training center",
      pdfDoc.internal.pageSize.getWidth() / 2,
      90,
      { align: "center" }
    );

    // Add Progrma name
    pdfDoc.setFontSize(16);
    pdfDoc.setTextColor(51, 102, 0);
    pdfDoc.text(
      "Statistical Reports",
      pdfDoc.internal.pageSize.getWidth() / 2,
      100,
      { align: "center" }
    );

    // Add an signture
    const imgWidth = 80; // Set the width of the signture
    const imgHeight = 80; // Set the height of the signture
    const imgX = (pdfDoc.internal.pageSize.getWidth() - imgWidth) / 1;
    const imgY = (pdfDoc.internal.pageSize.getHeight() - imgHeight) / 1;
    pdfDoc.addImage(signture, "PNG", imgX, imgY, imgWidth, imgHeight);

    // ...

    pdfDoc.save("certificate.pdf");
  };

  return (
    <div>
      <h1>Certificate of Appreciation</h1>

      <button onClick={generatePDF}>Generate PDF</button>
    </div>
  );
};

export default Certificate;
