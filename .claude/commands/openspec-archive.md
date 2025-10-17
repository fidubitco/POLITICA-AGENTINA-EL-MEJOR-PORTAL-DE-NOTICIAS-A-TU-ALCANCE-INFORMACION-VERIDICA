---
description: Archive a completed OpenSpec change and merge specs into source of truth
---

# OpenSpec: Archive Change

You are archiving a completed OpenSpec change. Follow these steps:

## Step 1: Verify Completion
Before archiving, confirm:
- [ ] All tasks in `tasks.md` are marked `[x]`
- [ ] All spec scenarios are implemented
- [ ] Tests are passing
- [ ] Code is committed to version control

Ask the user: "I'll verify the change is complete before archiving."

## Step 2: Review the Change
Show a summary:
```
Change: add-user-profiles
Status: Ready to archive

Tasks:
  ✓ Phase 1: Database Setup (2/2 tasks)
  ✓ Phase 2: API Implementation (3/3 tasks)
  ✓ Phase 3: Frontend (4/4 tasks)

Spec Updates:
  + ADDED: User Profile Management
  + ADDED: Profile API Endpoints
  ~ MODIFIED: User Authentication (added profile check)

Files:
  - openspec/changes/add-user-profiles/
  → openspec/archive/add-user-profiles/
  + openspec/specs/users/spec.md (updated)
```

## Step 3: Run Archive Command
Execute:
```bash
openspec archive <change-name> --yes
```

This will:
1. Merge spec deltas into `openspec/specs/`
2. Move change folder to `openspec/archive/`
3. Update CHANGELOG (if exists)

## Step 4: Verify Archive
After running the command, check:
- [ ] Change moved to `openspec/archive/`
- [ ] Specs updated in `openspec/specs/`
- [ ] No merge conflicts
- [ ] Archive is complete

## Step 5: Commit Updates
Create a git commit:
```bash
git add openspec/
git commit -m "feat: Archive change <change-name>

- Merged spec updates to source of truth
- Implemented [list key features]
- All tasks complete and verified

Closes: #<issue-number> (if applicable)"
```

## Example Archive Session
```
You: /openspec:archive add-user-profiles

AI: I'll archive the add-user-profiles change.

    Verifying completion...
    ✓ All 9 tasks completed
    ✓ Specs validated
    ✓ Tests passing

    Running: openspec archive add-user-profiles --yes

    Archive Complete:
    ✓ Moved to openspec/archive/add-user-profiles/
    ✓ Updated openspec/specs/users/spec.md
    ✓ Updated openspec/specs/auth/spec.md

    Git commit recommended:
    git add openspec/
    git commit -m "feat: Archive change add-user-profiles"

    The change is now part of your source-of-truth specs!
```

## Handling Incomplete Changes
If tasks aren't complete:
```
⚠️  Cannot archive: Incomplete tasks

Remaining:
  ☐ 2.3 Add profile validation endpoint
  ☐ 3.2 Update profile edit form

Would you like to:
  1. Complete the remaining tasks first
  2. Archive anyway (not recommended)
  3. Cancel
```

## Tips
- Only archive when truly complete
- Verify tests pass before archiving
- Commit changes immediately after archiving
- Keep archive history for reference
- Use `openspec show archived/<change-name>` to review old changes

---

After archiving, say: "Change archived successfully! The specs are now updated. Ready for the next feature."
