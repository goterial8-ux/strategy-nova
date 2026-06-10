const fs = require('fs');

let appContent = fs.readFileSync('src/App.tsx', 'utf8');

appContent = appContent.replace(/import { SupervisorPanel } from "\.\/components\/SupervisorPanel";/g, '');
appContent = appContent.replace(/SupervisorReport\s*,?\s*/g, '');

appContent = appContent.replace(/<SupervisorPanel[\s\S]*?\/>/g, '');

// Removing handleApprove checks
appContent = appContent.replace(/const report = state\.supervisorReports\[currentStageId\];\s+if \(!report \|\| report\.status !== "ok" \|\| report\.canContinue !== true\) \{[\s\S]*?return;\s+\}/g, '');

// Quick way to remove remaining occurrences
fs.writeFileSync('src/App.tsx', appContent);
console.log("App.tsx modified");
