---
description: Create a new OpenSpec change proposal with specs, tasks, and design
---

# OpenSpec: Create Change Proposal

You are helping create an OpenSpec change proposal. Follow these steps:

## Step 1: Understand the Request
Ask clarifying questions if the user's request is vague:
- What problem does this solve?
- What parts of the system are affected?
- Any specific requirements or constraints?

## Step 2: Create Change Folder
Create: `openspec/changes/<kebab-case-name>/`

Example: `openspec/changes/add-user-profiles/`

## Step 3: Generate proposal.md
```markdown
# Proposal: [Feature Name]

## Problem
[Describe the problem this change solves]

## Solution
[High-level approach]

## Affected Specs
- `specs/[domain]/spec.md` - [What changes]

## Impact
- **Users**: [How this affects users]
- **System**: [Technical impact]
- **Risk**: [Potential issues]
```

## Step 4: Generate tasks.md
Break the work into numbered, verifiable tasks:

```markdown
## 1. [Phase Name]
- [ ] 1.1 [Specific task]
- [ ] 1.2 [Another task]

## 2. [Next Phase]
- [ ] 2.1 [Task]
```

## Step 5: Generate Spec Deltas
Create: `openspec/changes/<change-name>/specs/<domain>/spec.md`

Use delta format:
```markdown
## ADDED Requirements
### Requirement: [Name]
The system SHALL [do something].

#### Scenario: [Name]
- WHEN [condition]
- THEN [outcome]

## MODIFIED Requirements
### Requirement: [Existing Name]
[Complete updated text]

## REMOVED Requirements
- [Deprecated feature]
```

## Step 6: Generate design.md (if complex)
```markdown
# Design: [Feature Name]

## Architecture
[High-level design]

## Data Model
[Schema changes]

## API Changes
[Endpoints, interfaces]

## Testing Strategy
[How to verify]
```

## Step 7: Validate
After creating files, run:
```bash
openspec validate <change-name>
```

## Example Output
```
Created change proposal: add-user-profiles

Files:
  ✓ openspec/changes/add-user-profiles/proposal.md
  ✓ openspec/changes/add-user-profiles/tasks.md
  ✓ openspec/changes/add-user-profiles/specs/users/spec.md
  ✓ openspec/changes/add-user-profiles/design.md

Next steps:
  1. Review: openspec show add-user-profiles
  2. Implement: /openspec:apply add-user-profiles
```

## Tips
- Keep changes focused on one feature
- Write clear, testable scenarios
- Number tasks for easy tracking
- Reference existing specs when modifying

---

After creating the proposal, ask: "Would you like me to review this proposal with you, or should I proceed to implementation?"
