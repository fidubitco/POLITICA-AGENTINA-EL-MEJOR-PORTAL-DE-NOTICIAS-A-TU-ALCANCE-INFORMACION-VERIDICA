---
description: Implement an OpenSpec change by working through its tasks
---

# OpenSpec: Apply Change

You are implementing an OpenSpec change. Follow these steps:

## Step 1: Load the Change
Read these files from `openspec/changes/<change-name>/`:
- `proposal.md` - Understand the goal
- `tasks.md` - Implementation checklist
- `specs/<domain>/spec.md` - Requirements to satisfy
- `design.md` (if exists) - Technical guidance

## Step 2: Verify Prerequisites
Check that:
- [ ] The change exists (`openspec show <change-name>`)
- [ ] Specs are valid (`openspec validate <change-name>`)
- [ ] You understand the requirements

## Step 3: Work Through Tasks
For each task in `tasks.md`:

1. **Read the task** - Understand what needs to be done
2. **Check the spec** - Review related requirements and scenarios
3. **Implement** - Write the code
4. **Verify** - Test against the spec scenarios
5. **Mark complete** - Update tasks.md with `[x]`

### Example Flow
```markdown
## 1. Database Setup
- [x] 1.1 Add profile table schema
- [ ] 1.2 Create migration script
```

After completing 1.1:
```markdown
## 1. Database Setup
- [x] 1.1 Add profile table schema ✓
- [x] 1.2 Create migration script
```

## Step 4: Reference Specs
When implementing, ensure:
- **SHALL/MUST** requirements are fully implemented
- All **scenarios** are covered
- Edge cases are handled

## Step 5: Progress Updates
After each phase (numbered section in tasks.md):
```
Phase 1 Complete: Database Setup
  ✓ 1.1 Profile table schema added
  ✓ 1.2 Migration script created

Moving to Phase 2: API Implementation
```

## Step 6: Testing
For each scenario in the spec:
1. Write a test that verifies the scenario
2. Ensure the test passes
3. Document any deviations

## Step 7: Final Verification
Before marking the change complete:
- [ ] All tasks marked with `[x]`
- [ ] All spec scenarios satisfied
- [ ] Tests passing
- [ ] No regressions introduced

## Example Implementation Session
```
You: /openspec:apply add-user-profiles

AI: I'll implement the add-user-profiles change.

    Reading proposal... ✓
    Loading tasks... ✓
    Loading specs... ✓

    Starting Phase 1: Database Setup

    Task 1.1: Add profile table schema
    - Created: prisma/schema.prisma
    - Added Profile model with fields: id, userId, bio, avatar
    ✓ Complete

    Task 1.2: Create migration script
    - Generated: prisma/migrations/add_profile_table
    - Verified: migration applies cleanly
    ✓ Complete

    Phase 1 Complete (2/2 tasks)

    Starting Phase 2: API Implementation...
```

## Tips
- Work sequentially through numbered tasks
- Don't skip tasks unless discussed with the user
- Mark tasks complete immediately after verification
- Ask for clarification if a task is ambiguous
- Keep the user informed of progress

---

When all tasks are complete, ask: "All tasks are complete. Would you like me to archive this change?"
