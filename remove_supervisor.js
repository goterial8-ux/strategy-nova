const fs = require('fs');

let appContent = fs.readFileSync('src/App.tsx', 'utf8');

// 1. Remove SupervisorPanel import
appContent = appContent.replace(/import { SupervisorPanel } from "\.\/components\/SupervisorPanel";/g, '');

// 2. Remove SupervisorReport type imports
appContent = appContent.replace(/SupervisorReport\s*,?\s*/g, '');

// 3. Remove SupervisorPanel usage in JSX
appContent = appContent.replace(/<SupervisorPanel[\s\S]*?\/>/g, '');

// 4. Remove handleAnalyze, handleApplyRepair, handleApproveAnyway blocks entirely if possible,
// or just replace them with empty functions.
appContent = appContent.replace(/const handleAnalyze = \(\) => \{[\s\S]*?\n  \};\n\n  const handleApplyRepair = \(\) => \{[\s\S]*?\n  \};\n\n  const handleApproveAnyway = \(\) => \{[\s\S]*?\n  \};/g, '');

// 5. Simplify handleApprove: Remove supervisor lock check
appContent = appContent.replace(/const report = state\.supervisorReports\[currentStageId\];[\s\S]*?\} else \{/, '} else {');
appContent = appContent.replace(/if \(!report \|\| report\.status !== "ok" \|\| report\.canContinue !== true\) \{[\s\S]*?return;\n      \}/g, '');

// Save changes
fs.writeFileSync('src/App.tsx', appContent);
console.log("App.tsx modified");
