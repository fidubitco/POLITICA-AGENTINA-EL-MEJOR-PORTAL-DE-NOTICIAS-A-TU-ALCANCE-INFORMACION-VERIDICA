# OpenSpec - Spec-Driven Development

This directory contains specifications and change proposals for the POLÍTICA ARGENTINA news portal.

## Directory Structure

```
openspec/
├── specs/          # Source of truth - current system specifications
├── changes/        # Active change proposals with deltas and tasks
├── archive/        # Completed changes
└── README.md       # This file
```

## Quick Start

### Creating a New Feature
```bash
# Use the Claude Code slash command
/openspec:proposal Add real-time notifications

# Or ask naturally
"Create an OpenSpec proposal for adding real-time notifications"
```

### Implementing a Change
```bash
# Apply a change
/openspec:apply add-real-time-notifications

# Or ask naturally
"Implement the add-real-time-notifications change"
```

### Archiving Completed Work
```bash
# Archive when all tasks are done
/openspec:archive add-real-time-notifications

# Or ask naturally
"Archive the add-real-time-notifications change"
```

## CLI Commands

View active changes:
```bash
openspec list
```

Interactive dashboard:
```bash
openspec view
```

Show change details:
```bash
openspec show <change-name>
```

Validate a change:
```bash
openspec validate <change-name>
```

Archive a change:
```bash
openspec archive <change-name> --yes
```

## Workflow Example

1. **Propose a Change**
   ```
   User: Add user comment moderation system
   AI: Creates openspec/changes/add-comment-moderation/
   ```

2. **Review & Refine**
   ```bash
   openspec show add-comment-moderation
   # Review proposal.md, tasks.md, and spec deltas
   # Iterate until specs are clear
   ```

3. **Implement Tasks**
   ```
   User: /openspec:apply add-comment-moderation
   AI: Works through tasks.md step-by-step
   ```

4. **Archive Completed Change**
   ```bash
   openspec archive add-comment-moderation --yes
   # Merges specs into source of truth
   # Moves to archive/
   ```

## Best Practices

- **One feature per change** - Keep changes focused and manageable
- **Clear requirements** - Use SHALL/MUST in spec language
- **Testable scenarios** - Every requirement needs scenarios
- **Atomic tasks** - Break work into verifiable steps
- **Review before implementation** - Align on specs first

## Current System Specs

As the portal evolves, specs will be added to `specs/` covering:

- `/specs/content/` - Articles, categories, media management
- `/specs/users/` - Authentication, profiles, permissions
- `/specs/analytics/` - Metrics, tracking, reporting
- `/specs/api/` - REST endpoints, webhooks, integrations
- `/specs/admin/` - Dashboard, moderation, settings

## Learn More

- [OpenSpec GitHub](https://github.com/Fission-AI/OpenSpec)
- [Documentation](https://github.com/Fission-AI/OpenSpec#readme)
- [AGENTS.md](../AGENTS.md) - AI agent instructions

---

**Status**: OpenSpec configured for Claude Code
**Version**: @fission-ai/openspec@latest
