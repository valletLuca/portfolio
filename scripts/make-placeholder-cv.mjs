// Génère un PDF placeholder valide (offsets xref calculés) dans /public.
// À remplacer par le vrai CV : public/cv-luca-vallet.pdf
import { writeFileSync, mkdirSync } from "node:fs";

const stream = `BT /F1 22 Tf 72 760 Td (CV Luca Vallet — placeholder) Tj ET
BT /F1 12 Tf 72 730 Td (Remplacez ce fichier par le vrai CV : public/cv-luca-vallet.pdf) Tj ET`;

const objects = [
  "<< /Type /Catalog /Pages 2 0 R >>",
  "<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
  "<< /Type /Page /Parent 2 0 R /MediaBox [0 0 595 842] /Contents 4 0 R /Resources << /Font << /F1 5 0 R >> >> >>",
  `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  "<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>",
];

let pdf = "%PDF-1.4\n";
const offsets = [];
objects.forEach((body, i) => {
  offsets.push(pdf.length);
  pdf += `${i + 1} 0 obj\n${body}\nendobj\n`;
});
const xrefStart = pdf.length;
pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
for (const offset of offsets) {
  pdf += `${String(offset).padStart(10, "0")} 00000 n \n`;
}
pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF\n`;

mkdirSync("public", { recursive: true });
writeFileSync("public/cv-luca-vallet.pdf", pdf, "latin1");
console.log("public/cv-luca-vallet.pdf généré.");
