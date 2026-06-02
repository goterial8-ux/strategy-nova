import { ProjectState, StageId } from '../types';

const SCRIPT_FORMATTING_CONTRACT = `Final script output format:
- Final script language is English only.
- The story must be told in a living first-person recap voice using "I", "my", and "we" naturally.
- The final script is used for image prompt generation.
- Each normal narrator paragraph represents one visual frame.
- Every normal non-avatar paragraph must be between one hundred twenty and two hundred twenty characters including spaces.
- Each paragraph must contain one concrete visual beat: action, image, reaction, decision, danger, resource use, or payoff.
- Explain tactics through action and immediate consequence, not through long textbook exposition.
- Do not copy competitor paragraph formatting. Competitor scripts may be one long paragraph; convert only their voice rhythm into frame-sized narration.
- Do not use stage labels, scene labels, markdown tables, bullet lists, debug notes, or unfinished markers in the final script.`;

const STYLE_REFERENCE_USE_CONTRACT = `Competitor/reference usage contract:
- References are used only for abstract style DNA: narration rhythm, first-person voice, pressure cadence, action explanation, payoff timing, and transition energy.
- Do not copy competitor plots, titles, names, powers, scene concepts, world mechanics, or unique twists.
- Preserve the locked project premise and niche rules even when a reference has a tempting structure.
- If style conflicts with the locked story contract, the locked story contract wins.`;

const NARRATIVE_DYNAMICS_CONTRACT = `Narrative dynamics contract:
- Do not write scenes as straight task completion. Every scene needs resistance, reaction, and a small change in direction.
- Use micro-turns every few paragraphs: a new obstacle, a misunderstood detail, a hidden cost, ally doubt, enemy reaction, resource shortage, timing pressure, public humiliation, partial reveal, or small failure that forces adaptation.
- A micro-turn must change what the protagonist does next. Do not add random twists that do not affect action.
- Keep the rhythm: pressure -> choice -> action -> complication -> adaptation -> visible payoff -> new pressure.
- The protagonist should not simply know and win. Let execution be risky, incomplete, physical, social, or time-limited.
- Enemies should react intelligently. Allies should create friction or solve specific micro-problems.
- Avoid robotic narration patterns such as "I did X. Then I did Y. Then I did Z." Each beat needs cause, consequence, and emotional pressure.`;

const REFERENCE_STYLE_BLUEPRINT = `Reference style blueprint:
- Open with pressure, danger, humiliation, or a concrete impossible image. Do not open with neutral lore.
- Keep a living first-person narrator: tactical, observant, wounded, pragmatic, and biased by survival pressure.
- Build paragraphs as visual frames. Each frame must add a new action, calculation, consequence, reaction, or resource decision.
- Explanations must be short and attached to danger. Explain only enough for the viewer to understand why the action works.
- Let the narrator think on the page: options, risk, cost, timing, what fails, what might work, and why there is no clean choice.
- Use reference scripts for cadence: pressure, practical action, quick analysis, visible payoff, and a new hook.
- Strong scenes feel authored because the protagonist has a specific worldview, not because the prose is decorative.
- Face-slap payoff should land as one sharp image or public reaction, then move forward. Do not over-explain the victory.
- Do not imitate one-paragraph competitor formatting. Convert the voice rhythm into frame-sized paragraphs for this pipeline.`;

const AUTHOR_VOICE_PASS_CONTRACT = `Author voice pass contract:
- Before returning any script part or clean export, silently perform an Author Voice Pass.
- Preserve plot, facts, names, scene order, paragraph format, and continuity. Rewrite style only unless a scene is broken.
- Remove robotic summary rhythm. The text must not read like "I did this, then I did that, then the next thing happened."
- Give the narrator a human tactical bias: what they notice first, what they ignore, what they fear, what they calculate, what they refuse to say aloud.
- Replace generic emotional labels with physical reaction, decision, or observation.
- Replace abstract drama with concrete pressure: a tool slipping, a crowd reacting, a resource running out, an enemy changing tactics.
- Every paragraph needs a reason to exist: new information, new action, new risk, new consequence, new joke, or new payoff.
- If a paragraph could fit any random fantasy recap, rewrite it until it belongs only to this story.
- The final read should feel like a real YouTube manga/manhwa recap writer shaped the voice, not a neutral model summarizing events.`;

const MANGA_SCREENWRITER_TECHNIQUE_CONTRACT = `Manga screenwriter technique contract:
- Think like a manga/manhwa screenwriter, not a novelist. The unit of storytelling is a visible panel, reaction, turn, and hook.
- Panel logic: each script paragraph should imply one clear panel or camera beat with a subject, action, emotion, object, scale, and visual focus.
- Page-turn hooks: every few paragraphs must create a reason to continue: danger, humiliation, hidden cost, strange object, enemy reaction, ally doubt, resource limit, or a new tactical question.
- Reaction shot discipline: after every important action, show one specific reaction from an enemy, ally, crowd, creature, machine, system, or environment. Do not explain the reaction in abstract terms.
- Setup/payoff ledger: if a resource, flaw, rule, tool, wound, debt, promise, hidden path, or weakness appears, mark how it can return later. Payoffs must feel planted, not random.
- False victory: do not let scenes end as simple success. A win should reveal a larger problem, create a debt, expose the hero, attract enemies, damage a resource, or force a harder choice.
- Status reversal: whenever the protagonist is mocked, make the later payoff reverse that exact insult in public or through a visible consequence.
- Signature scene rule: every major part needs one scene a viewer can remember in one sentence, such as "he turned trash into shelter while nobles froze."
- Character function beats: allies must create friction, solve a specific micro-problem, or change the execution. They are not background witnesses.
- Antagonist pressure beats: enemies should adapt after being fooled once. They can be arrogant, but not brainless.
- Visual escalation ladder: each part should upgrade what the viewer can see: shelter, tool, map, weapon, wall, farm, clan, machine, route, army, city, public status, or final reversal.
- Quiet panel rule: after a loud payoff, use one short visual beat of silence, damage, stunned reaction, or exhausted work. Then hook into the next threat.
- Do not overuse the same trick. Vary hooks, reactions, face-slaps, ally functions, and false victories across the story.`;

const RETENTION_MAP_CONTRACT = `Retention map contract:
- Treat the script as a YouTube retention engine, not only a story summary.
- Part One must begin with immediate pressure, humiliation, danger, impossible survival math, or a visually strange problem. No slow lore opening.
- Every scene cluster needs a viewer question: What is the trick? Will the resource work? Who noticed? What did the enemy miss? What breaks next?
- Every thirty to forty-five seconds of voiceover should contain at least one retention beat: threat, reveal, choice, reversal, cost, visual payoff, status shift, comedy beat, or cliffhanger.
- Do not let two calm explanation paragraphs stand back-to-back. Insert physical action, dialogue, reaction, deadline, resource loss, or enemy movement.
- Use open loops deliberately. Plant a detail, let the viewer remember it, then pay it off later in a visible way.
- End each part with forward pull: a new enemy response, a resource shortage, a larger map reveal, a public rumor, a broken tool, or a worse version of the same problem.
- The final payoff must close the strongest open loops from earlier, not appear as a random final upgrade.`;

const REPETITION_KILLER_CONTRACT = `Repetition killer contract:
- Do not repeat the same part engine. Each part needs a different dominant pressure type, resource problem, ally function, antagonist move, and payoff image.
- Track variety across the story: survival pressure, social pressure, resource pressure, engineering pressure, moral cost, public humiliation, hidden betrayal, weather/terrain pressure, logistics pressure, and enemy adaptation.
- Face-slaps must vary. Do not always use the same pattern of "enemy mocks, hero builds, enemy is shocked." Change the insult, preparation, public witness, visual result, and consequence.
- Progression must vary visually. Avoid repeated upgrades that feel like the same wall, shelter, weapon, or machine with a new label.
- Ally beats must rotate: one ally doubts, one solves a micro-task, one causes friction, one notices a clue, one protects time, one manages people, one pays a cost.
- Enemy reactions must escalate. After being humiliated once, enemies should adapt, sabotage, copy badly, bait the hero, attack supply lines, manipulate public opinion, or force a deadline.
- If a scene feels like a previous scene with renamed objects, rebuild it around a new pressure source and a different payoff shape.
- Before approving any plan or script, check whether the middle has unique functions instead of repeated problem-solution loops.`;

const STYLE_FAILURE_CHECKLIST = `Style failure checklist:
- Fail if the script is technically correct but sounds generic, sterile, or interchangeable with another story.
- Fail if several paragraphs start with the same flat transition such as "Then I", "After that", "I started", "I began", or "I realized".
- Fail if the narrator reports events without real-time analysis, tradeoffs, pressure, or a specific survival worldview.
- Fail if action has no resistance: no cost, no pushback, no mistake, no enemy reaction, no ally doubt, no resource limit.
- Fail if payoffs are explained instead of shown through one concrete image or public reaction.
- Fail if style references are copied as plot, names, powers, scenes, or unique twists.
- Repair style problems with a targeted Author Voice Pass, not a full plot rewrite.`;

function clipText(value: string, maxChars: number): string {
  if (!value || value.length <= maxChars) return value || '';
  const head = Math.floor(maxChars * 0.62);
  const tail = Math.floor(maxChars * 0.33);
  return `${value.slice(0, head)}\n\n[...TRUNCATED FOR PROMPT SIZE...]\n\n${value.slice(-tail)}`;
}

function referenceExamples(state: ProjectState, maxChars = 45_000): string {
  return clipText(state.competitors || 'None', maxChars);
}

function authorialStyleBlock(): string {
  return [
    `=== REFERENCE STYLE BLUEPRINT ===\n${REFERENCE_STYLE_BLUEPRINT}`,
    `=== AUTHOR VOICE PASS CONTRACT ===\n${AUTHOR_VOICE_PASS_CONTRACT}`,
    `=== MANGA SCREENWRITER TECHNIQUE CONTRACT ===\n${MANGA_SCREENWRITER_TECHNIQUE_CONTRACT}`,
    `=== RETENTION MAP CONTRACT ===\n${RETENTION_MAP_CONTRACT}`,
    `=== REPETITION KILLER CONTRACT ===\n${REPETITION_KILLER_CONTRACT}`,
    `=== STYLE FAILURE CHECKLIST ===\n${STYLE_FAILURE_CHECKLIST}`,
  ].join('\n\n');
}

export function buildPrompt(stageId: StageId, state: ProjectState): string {
  let prompt = '';
  
  if (stageId !== 'idea_market' && stageId !== 'raw_idea' && stageId !== 'story_dna' && stageId !== 'story_plan') {
    prompt += `=== GLOBAL RULES ===\n${state.promptRegistry.globalRulesPrompt}\n\n`;
    
    if (state.styleDna) {
      prompt += `=== APPROVED STYLE DNA (LOCKED INSTRUCTION) ===\n${state.styleDna}\n\n`;
    }
    
    if (state.stageStatuses['story_dna'] === 'locked') {
      prompt += `=== LOCKED STORY CONTRACT ===\n${state.storyContract}\n${state.characterBible}\n\n`;
    }
  
    prompt += `=== PREVIOUS STAGE CONTEXT ===\n`;
  }
  
  switch (stageId) {
    case 'scene_cards':
       prompt += `Story Plan (Stage 3): ${state.storyPlan}\n`;
       break;
    case 'script_writer':
       prompt += `Story Plan (Stage 3): ${state.storyPlan}\nScene Cards (Stage 4): ${state.sceneCards}\n`;
       break;
    case 'clean_export':
       prompt += `Final Script: ${state.fullScript}\nClean Export Mode: ${JSON.stringify(state.cleanExportSettings)}\n`;
       break;
  }
  prompt += `\n=== STAGE TASK ===\n`;
  
  switch (stageId) {
    case 'idea_market':
      let stage0Prompt = state.promptRegistry.stageZeroIdeaMarketPrompt || '';
      stage0Prompt = stage0Prompt.replaceAll('{{GLOBAL_RULES}}', state.promptRegistry.globalRulesPrompt);
      prompt += stage0Prompt + `\n\n` + (state.promptRegistry.stageZeroIdeaMarketExampleResponse || '');
      break;

    case 'raw_idea': 
      let stage1Prompt = state.promptRegistry.stageOneRawIdeaPrompt;
      stage1Prompt = stage1Prompt.replaceAll('{{PROJECT_TITLE}}', state.projectTitle || 'None');
      stage1Prompt = stage1Prompt.replaceAll('{{RAW_IDEA}}', state.rawIdea || 'None');
      stage1Prompt = stage1Prompt.replaceAll('{{GENRE}}', state.genre || 'None');
      stage1Prompt = stage1Prompt.replaceAll('{{OUTPUT_LANGUAGE}}', 'Russian');
      stage1Prompt = stage1Prompt.replaceAll('{{TARGET_LENGTH}}', state.targetLength || 'None');
      stage1Prompt = stage1Prompt.replaceAll('{{STYLE_NOTES}}', state.styleNotes || 'None');
      stage1Prompt = stage1Prompt.replaceAll('{{FORBIDDEN_ELEMENTS}}', state.forbiddenElements || 'None');
      stage1Prompt = stage1Prompt.replaceAll('{{COMPETITOR_STYLE_NOTES}}', referenceExamples(state));
      stage1Prompt = stage1Prompt.replaceAll('{{GLOBAL_RULES}}', state.promptRegistry.globalRulesPrompt);
      prompt += stage1Prompt + `\n\n` + state.promptRegistry.stageOneExampleResponse; 
      break;
      
    case 'style_analyzer': 
      let stylePrompt = (state.promptRegistry as any).stageStyleAnalyzerPrompt || '';
      stylePrompt = stylePrompt.replaceAll('{{COMPETITORS}}', referenceExamples(state));
      stylePrompt = stylePrompt.replaceAll('{{RAW_IDEA}}', state.rawIdea || state.developedIdea || 'None');
      stylePrompt = stylePrompt.replaceAll('{{GLOBAL_RULES}}', state.promptRegistry.globalRulesPrompt);
      prompt += stylePrompt + `\n\n` + ((state.promptRegistry as any).stageStyleAnalyzerExampleResponse || '') + `\n\nIMPORTANT: Output the extracted Style DNA and analysis in Russian language.`; 
      break;
      
    case 'story_dna': 
      let stage2Prompt = state.promptRegistry.stageTwoStoryDNAPrompt;
      stage2Prompt = stage2Prompt.replaceAll('{{PROJECT_TITLE}}', state.projectTitle || 'None');
      stage2Prompt = stage2Prompt.replaceAll('{{DEVELOPED_IDEA}}', state.developedIdea || 'None');
      stage2Prompt = stage2Prompt.replaceAll('{{STAGE_ONE_HANDOFF}}', 'Refer to the Handoff Summary in the Developed Idea above.');
      stage2Prompt = stage2Prompt.replaceAll('{{GENRE}}', state.genre || 'None');
      stage2Prompt = stage2Prompt.replaceAll('{{OUTPUT_LANGUAGE}}', 'Russian');
      stage2Prompt = stage2Prompt.replaceAll('{{TARGET_LENGTH}}', state.targetLength || 'None');
      stage2Prompt = stage2Prompt.replaceAll('{{STYLE_NOTES}}', state.styleNotes || 'None');
      stage2Prompt = stage2Prompt.replaceAll('{{FORBIDDEN_ELEMENTS}}', state.forbiddenElements || 'None');
      stage2Prompt = stage2Prompt.replaceAll('{{GLOBAL_RULES}}', state.promptRegistry.globalRulesPrompt);
      const stage2SupervisorNotes = state.promptHistory.filter(h => h.stageId === 'story_dna' && h.supervisorStatus).map(h => h.outputPreview).join('\\n') || 'None';
      stage2Prompt = stage2Prompt.replaceAll('{{SUPERVISOR_NOTES}}', stage2SupervisorNotes);
      prompt += stage2Prompt + `\n\n` + state.promptRegistry.stageTwoExampleResponse; 
      break;
      
    case 'story_plan': 
      let stage3Prompt = state.promptRegistry.stageThreeStoryPlanPrompt;
      stage3Prompt = stage3Prompt.replaceAll('{{PROJECT_TITLE}}', state.projectTitle || 'None');
      stage3Prompt = stage3Prompt.replaceAll('{{DEVELOPED_IDEA}}', state.developedIdea || 'None');
      stage3Prompt = stage3Prompt.replaceAll('{{STORY_CONTRACT}}', state.storyContract || 'None');
      stage3Prompt = stage3Prompt.replaceAll('{{CHARACTER_BIBLE}}', state.characterBible || 'None');
      stage3Prompt = stage3Prompt.replaceAll('{{GENRE}}', state.genre || 'None');
      stage3Prompt = stage3Prompt.replaceAll('{{OUTPUT_LANGUAGE}}', 'Russian');
      stage3Prompt = stage3Prompt.replaceAll('{{TARGET_LENGTH}}', state.targetLength || 'None');
      stage3Prompt = stage3Prompt.replaceAll('{{STYLE_NOTES}}', state.styleNotes || 'None');
      stage3Prompt = stage3Prompt.replaceAll('{{FORBIDDEN_ELEMENTS}}', state.forbiddenElements || 'None');
      stage3Prompt = stage3Prompt.replaceAll('{{COMPETITOR_REFERENCE_EXAMPLES}}', referenceExamples(state));
      stage3Prompt = stage3Prompt.replaceAll('{{COMPETITOR_STYLE_BLUEPRINT}}', authorialStyleBlock());
      stage3Prompt = stage3Prompt.replaceAll('{{AVATAR_COMMENTARY_SETTING}}', state.useAvatars ? 'Enabled' : 'Disabled');
      stage3Prompt = stage3Prompt.replaceAll('{{GLOBAL_RULES}}', state.promptRegistry.globalRulesPrompt);
      const stage3SupervisorNotes = state.promptHistory.filter(h => h.stageId === 'story_plan' && h.supervisorStatus).map(h => h.outputPreview).join('\\n') || 'None';
      stage3Prompt = stage3Prompt.replaceAll('{{SUPERVISOR_NOTES}}', stage3SupervisorNotes);
      prompt += stage3Prompt + `\n\n` + state.promptRegistry.stageThreeExampleResponse; 
      break;
      
    case 'scene_cards': 
      let stage4Prompt = state.promptRegistry.stageFourSceneCardsPrompt;
      stage4Prompt = stage4Prompt.replaceAll('{{PROJECT_TITLE}}', state.projectTitle || 'None');
      stage4Prompt = stage4Prompt.replaceAll('{{OUTPUT_LANGUAGE}}', 'Russian');
      stage4Prompt = stage4Prompt.replaceAll('{{GENRE}}', state.genre || 'None');
      stage4Prompt = stage4Prompt.replaceAll('{{TARGET_LENGTH}}', state.targetLength || 'None');
      stage4Prompt = stage4Prompt.replaceAll('{{DEVELOPED_IDEA}}', state.developedIdea || 'None');
      stage4Prompt = stage4Prompt.replaceAll('{{STORY_CONTRACT}}', state.storyContract || 'None');
      stage4Prompt = stage4Prompt.replaceAll('{{CHARACTER_BIBLE}}', state.characterBible || 'None');
      stage4Prompt = stage4Prompt.replaceAll('{{STORY_PLAN}}', state.storyPlan || 'None');
      stage4Prompt = stage4Prompt.replaceAll('{{CURRENT_PART_NUMBER}}', 'None');
      stage4Prompt = stage4Prompt.replaceAll('{{CURRENT_PART_PLAN}}', 'None');
      stage4Prompt = stage4Prompt.replaceAll('{{SCRIPT_FORMATTING_CONTRACT}}', SCRIPT_FORMATTING_CONTRACT);
      stage4Prompt = stage4Prompt.replaceAll('{{AVATAR_COMMENTARY_MAP}}', state.useAvatars ? 'Enabled' : 'Disabled');
      stage4Prompt = stage4Prompt.replaceAll('{{COMPETITOR_REFERENCE_EXAMPLES}}', referenceExamples(state));
      stage4Prompt = stage4Prompt.replaceAll('{{COMPETITOR_STYLE_BLUEPRINT}}', authorialStyleBlock());
      stage4Prompt = stage4Prompt.replaceAll('{{FORBIDDEN_ELEMENTS}}', state.forbiddenElements || 'None');
      stage4Prompt = stage4Prompt.replaceAll('{{GLOBAL_RULES}}', state.promptRegistry.globalRulesPrompt);
      const stage4SupervisorNotes = state.promptHistory.filter(h => h.stageId === 'scene_cards' && h.supervisorStatus).map(h => h.outputPreview).join('\\n') || 'None';
      stage4Prompt = stage4Prompt.replaceAll('{{SUPERVISOR_NOTES}}', stage4SupervisorNotes);
      prompt += stage4Prompt + `\n\n` + state.promptRegistry.stageFourExampleResponse;
      break;
      
    case 'script_writer': 
      let stage5Prompt = state.promptRegistry.stageFiveScriptWriterPrompt;
      stage5Prompt = stage5Prompt.replaceAll('{{PROJECT_TITLE}}', state.projectTitle || 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{OUTPUT_LANGUAGE}}', 'English');
      stage5Prompt = stage5Prompt.replaceAll('{{GENRE}}', state.genre || 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{TARGET_LENGTH}}', state.targetLength || 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{DEVELOPED_IDEA}}', state.developedIdea || 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{STORY_CONTRACT}}', state.storyContract || 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{CHARACTER_BIBLE}}', state.characterBible || 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{STORY_PLAN}}', state.storyPlan || 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{SCENE_CARDS}}', state.sceneCards || 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{CURRENT_PART_NUMBER}}', 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{CURRENT_PART_TITLE}}', 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{CURRENT_PART_SCENE_CARDS}}', 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{PREVIOUS_APPROVED_SCRIPT_PARTS_SUMMARY}}', 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{REMAINING_PARTS_SUMMARY}}', 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{AVATAR_COMMENTARY_SETTING}}', state.useAvatars ? 'Enabled' : 'Disabled');
      stage5Prompt = stage5Prompt.replaceAll('{{AVATAR_SLOT_FOR_CURRENT_PART}}', 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{COMPETITOR_REFERENCE_EXAMPLES}}', referenceExamples(state));
      stage5Prompt = stage5Prompt.replaceAll('{{COMPETITOR_STYLE_BLUEPRINT}}', authorialStyleBlock());
      stage5Prompt = stage5Prompt.replaceAll('{{SCRIPT_FORMATTING_CONTRACT}}', SCRIPT_FORMATTING_CONTRACT);
      stage5Prompt = stage5Prompt.replaceAll('{{FORBIDDEN_ELEMENTS}}', state.forbiddenElements || 'None');
      stage5Prompt = stage5Prompt.replaceAll('{{GLOBAL_RULES}}', state.promptRegistry.globalRulesPrompt);
      const stage5SupervisorNotes = state.promptHistory.filter(h => h.stageId === 'script_writer' && h.supervisorStatus).map(h => h.outputPreview).join('\\n') || 'None';
      stage5Prompt = stage5Prompt.replaceAll('{{SUPERVISOR_NOTES}}', stage5SupervisorNotes);
      prompt += stage5Prompt; 
      break;
      
    case 'clean_export': 
      let stage6Prompt = state.promptRegistry.stageSixCleanExportPrompt;
      stage6Prompt = stage6Prompt.replaceAll('{{OUTPUT_LANGUAGE}}', 'English');
      prompt += stage6Prompt;
      prompt += `\n\n=== AUTHORIAL STYLE BLOCK ===\n${authorialStyleBlock()}`;
      prompt += `\n\n=== SCRIPT FORMATTING CONTRACT ===\n${SCRIPT_FORMATTING_CONTRACT}`;
      break;
  }

  return prompt;
}

export function buildPartPrompt(partNumber: number, state: ProjectState): string {
  const part = state.scriptParts.find(p => p.partNumber === partNumber);
  
  let stage5Prompt = state.promptRegistry.stageFiveScriptWriterPrompt;
  stage5Prompt = stage5Prompt.replaceAll('{{PROJECT_TITLE}}', state.projectTitle || 'None');
  stage5Prompt = stage5Prompt.replaceAll('{{OUTPUT_LANGUAGE}}', 'English');
  stage5Prompt = stage5Prompt.replaceAll('{{GENRE}}', state.genre || 'None');
  stage5Prompt = stage5Prompt.replaceAll('{{TARGET_LENGTH}}', state.targetLength || 'None');
  stage5Prompt = stage5Prompt.replaceAll('{{DEVELOPED_IDEA}}', state.developedIdea || 'None');
  stage5Prompt = stage5Prompt.replaceAll('{{STORY_CONTRACT}}', state.storyContract || 'None');
  stage5Prompt = stage5Prompt.replaceAll('{{CHARACTER_BIBLE}}', state.characterBible || 'None');
  stage5Prompt = stage5Prompt.replaceAll('{{STORY_PLAN}}', state.storyPlan || 'None');
  stage5Prompt = stage5Prompt.replaceAll('{{SCENE_CARDS}}', state.sceneCards || 'None');
  
  stage5Prompt = stage5Prompt.replaceAll('{{CURRENT_PART_NUMBER}}', partNumber.toString());
  stage5Prompt = stage5Prompt.replaceAll('{{CURRENT_PART_TITLE}}', part?.partTitle || `Part ${partNumber}`);
  stage5Prompt = stage5Prompt.replaceAll('{{CURRENT_PART_SCENE_CARDS}}', part?.sourceSceneCards || 'None');
  
  const previousParts = state.scriptParts.filter(p => p.partNumber < partNumber && p.draftText && p.draftText.length > 0);
  const previousSummary = previousParts.length > 0 
    ? previousParts.map(p => `Part ${p.partNumber}: ${p.partTitle}\nContent:\n${p.draftText}`).join('\n\n------\n\n') 
    : 'None. This is the first part.';
  stage5Prompt = stage5Prompt.replaceAll('{{PREVIOUS_APPROVED_SCRIPT_PARTS_SUMMARY}}', previousSummary);
  
  const remainingParts = state.scriptParts.filter(p => p.partNumber > partNumber);
  const remainingSummary = remainingParts.length > 0
    ? remainingParts.map(p => `Part ${p.partNumber}: ${p.partTitle}`).join('\n')
    : 'None. This is the last part.';
  stage5Prompt = stage5Prompt.replaceAll('{{REMAINING_PARTS_SUMMARY}}', remainingSummary);
  
  stage5Prompt = stage5Prompt.replaceAll('{{AVATAR_COMMENTARY_SETTING}}', state.useAvatars ? 'Enabled' : 'Disabled');
  stage5Prompt = stage5Prompt.replaceAll('{{AVATAR_SLOT_FOR_CURRENT_PART}}', 'Unknown/Not specified'); 
  
  stage5Prompt = stage5Prompt.replaceAll('{{COMPETITOR_REFERENCE_EXAMPLES}}', referenceExamples(state));
  stage5Prompt = stage5Prompt.replaceAll('{{COMPETITOR_STYLE_BLUEPRINT}}', authorialStyleBlock());
  stage5Prompt = stage5Prompt.replaceAll('{{SCRIPT_FORMATTING_CONTRACT}}', SCRIPT_FORMATTING_CONTRACT); 
  stage5Prompt = stage5Prompt.replaceAll('{{FORBIDDEN_ELEMENTS}}', state.forbiddenElements || 'None');
  stage5Prompt = stage5Prompt.replaceAll('{{GLOBAL_RULES}}', state.promptRegistry.globalRulesPrompt);
  
  const stage5SupervisorNotes = state.promptHistory.filter(h => h.stageId === 'script_writer' && h.supervisorStatus).map(h => h.outputPreview).join('\\n') || 'None';
  stage5Prompt = stage5Prompt.replaceAll('{{SUPERVISOR_NOTES}}', stage5SupervisorNotes);
  
  return stage5Prompt;
}

export function buildSupervisorPrompt(stageId: StageId, output: string, state: ProjectState): string {
  const additionalInstructions = `Supervisor MUST NOT trust words like "approved", "complete", "ready", or "final". Judge ONLY the actual text.\nFor script_writer and clean_export, FAIL if output drifts from manga/manhwa recap, protagonist is passive or overpowered, parts repeat functions, no visual payoff, no face-slap, flat allies, stupid enemies, generic AI text, lacks first-person authored voice, violates 120-220 character lengths, or has technical residue.\n\n\n=== NARRATIVE DYNAMICS CONTRACT ===\n${NARRATIVE_DYNAMICS_CONTRACT}\n\n=== AUTHORIAL STYLE BLOCK ===\n${authorialStyleBlock()}\n\n=== SCRIPT FORMATTING CONTRACT ===\n${SCRIPT_FORMATTING_CONTRACT}\n\n=== LOCKED STORY CONTRACT ===\n${state.storyContract}`;
  
  return `=== AI SUPERVISOR ===\n${state.promptRegistry.aiSupervisorPrompt}\n\n${additionalInstructions}\n\nSTAGE: ${stageId}\n\n=== OUTPUT TO CHECK ===\n${output}\n\nIMPORTANT: Provide your analysis and report in Russian.`;
}

export function buildRepairPrompt(stageId: StageId, brokenOutput: string, report: any, state: ProjectState): string {
  const lang = stageId === 'script_writer' || stageId === 'clean_export' ? 'English' : 'Russian';
  const lengthConstraint = stageId === 'script_writer' ? "IMPORTANT: The repaired output MUST be between 10,000 and 14,000 characters including spaces. If the previous version was too short, you MUST expand the scenes, internal monologues, and atmosphere to reach this target length." : "";
  const strictInstructions = `=== AUTHORIAL STYLE BLOCK ===\n${authorialStyleBlock()}\n\n=== SCRIPT FORMATTING CONTRACT ===\n${SCRIPT_FORMATTING_CONTRACT}\n\n=== NARRATIVE DYNAMICS CONTRACT ===\n${NARRATIVE_DYNAMICS_CONTRACT}\n\nSTRICT INSTRUCTION: Preserve plot, facts, names, and scene order exactly. Repair style and length only.`;

  return `=== REPAIR ===\n${state.promptRegistry.repairPrompt}\n\n${strictInstructions}\n\nBROKEN OUTPUT:\n${brokenOutput}\n\nSUPERVISOR REPORT:\n${JSON.stringify(report, null, 2)}\n\n${lengthConstraint}\n\nIMPORTANT: Output the repaired version in ${lang}. Ensure all structural rules are preserved.`;
}
