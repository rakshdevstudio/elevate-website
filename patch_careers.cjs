const fs = require('fs');

const file = 'src/pages/Careers.tsx';
let content = fs.readFileSync(file, 'utf8');

content = content.replace(
  /import \{ useState \} from "react";\n/,
  `import { useState } from "react";\nimport { InteractiveCareers } from "@/components/InteractiveCareers";\n`
);

const startStr = `<section className="py-10 md:py-16 relative">`;
const endStr = `</section>\n\n      <section className="py-10 md:py-16 section-glow relative">`;

const start = content.indexOf(startStr);
const end = content.indexOf(endStr);

if (start !== -1 && end !== -1) {
  content = content.substring(0, start) + '<InteractiveCareers />\n\n' + content.substring(end + 13); // +13 for </section>\n\n
  fs.writeFileSync(file, content);
  console.log("Patched successfully");
} else {
  console.log("Could not find sections:", start, end);
}
