# OpenSpec AI Agent Instructions

This project uses [OpenSpec](https://github.com/Fission-AI/OpenSpec) for spec-driven development.

## Overview

OpenSpec helps AI and humans agree on what to build before writing code:

- **Specs** (`openspec/specs/`) - Current system specifications (source of truth)
- **Changes** (`openspec/changes/`) - Proposed modifications with deltas, tasks, and designs
- **Archive** (`openspec/archive/`) - Completed changes

## Workflow

### 1. Creating a Change Proposal
When the user asks to add/modify a feature:

1. Create a new change folder: `openspec/changes/<change-name>/`
2. Generate these files:
   - `proposal.md` - Describe the problem, solution, and affected specs
   - `tasks.md` - Implementation checklist with numbered tasks
   - `specs/<domain>/spec.md` - Delta showing ADDED/MODIFIED/REMOVED requirements
   - `design.md` (optional) - Technical decisions and architecture

### 2. Delta Format
Use this format in spec deltas:

```markdown
## ADDED Requirements
### Requirement: Feature Name
The system SHALL/MUST do something.

#### Scenario: Happy path
- WHEN condition
- THEN expected outcome

## MODIFIED Requirements
### Requirement: Existing Feature
(Include complete updated text)

## REMOVED Requirements
- Deprecated feature
```

### 3. Implementing Changes
When applying a change:

1. Read `openspec/changes/<change-name>/tasks.md`
2. Implement each task in order
3. Mark completed tasks with `[x]`
4. Reference the spec deltas for requirements

### 4. Archiving Changes
After all tasks are complete:

1. Run: `openspec archive <change-name> --yes`
2. This merges spec deltas into `openspec/specs/`
3. Moves the change to `openspec/archive/`

## Commands Reference

- `openspec list` - View active changes
- `openspec view` - Interactive dashboard
- `openspec show <change>` - Display change details
- `openspec validate <change>` - Check formatting
- `openspec archive <change>` - Archive completed change

## Best Practices

1. **One feature per change** - Keep changes focused
2. **Clear scenarios** - Every requirement needs testable scenarios
3. **Complete deltas** - For MODIFIED requirements, include full updated text
4. **Atomic tasks** - Break implementation into small, verifiable steps
5. **Validate early** - Run `openspec validate` before implementing

## Example Flow

```bash
# User: "Add user profile filtering by role and team"

# 1. Create proposal
# AI generates: openspec/changes/add-profile-filters/

# 2. Review
$ openspec show add-profile-filters

# 3. Implement
# AI works through tasks.md

# 4. Archive
$ openspec archive add-profile-filters --yes
```

## Integration

This project is configured for **Claude Code**. Use these slash commands:

- `/openspec:proposal <description>` - Create a new change proposal
- `/openspec:apply <change-name>` - Implement a change's tasks
- `/openspec:archive <change-name>` - Archive a completed change

---

For more details, see: https://github.com/Fission-AI/OpenSpec
