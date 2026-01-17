# Tier Mapping for PatternFly Rules

This document explains how workshop tiers are assigned to PatternFly v5→v6 migration rules.

---

## Overview

**Tier 1 & 2** = Based on rule's `migration_complexity` field
**Tier 3** = Teaching concept (contextual judgment), NOT a rule category

---

## Tier 1: Simple Changes (Auto-apply Safe)

**Source:** Rules with `migration_complexity: low` (178 rules)

**Characteristics:**
- 1:1 component/prop renames
- No logic changes
- CSS updates
- AI success rate: ~95%

**Examples:**
- Component renames: `Text` → `Content`, `Chip` → `Label`
- Prop renames: `isDisabled` → `disabled`, `isOpen` → `open`
- CSS classes: `pf-v5-c-*` → `pf-v6-c-*`, `pf-v5-u-*` → `pf-v6-u-*`
- CSS variables: `--pf-v5-global-*` → `--pf-t--global-*`

**Prefix:**
- `[Tier 1]` - Simple changes
- `[Tier 1 - Bulk CSS]` - CSS patterns (if description matches CSS patterns)

**Action:** ✅ **Accept AI fixes** with quick review

## Tier 2: Moderate Complexity (Review Carefully)

**Source:** Rules with `migration_complexity: medium` (52 rules)

**Characteristics:**
- Structural component changes
- Icon prop restructuring
- Multiple related changes
- Multi-prop updates
- AI success rate: ~85%

**Examples:**
- MenuToggle icon restructuring (icon as child → icon prop)
- EmptyState structural consolidation
- Button icon props
- Masthead structure changes
- Component removals (PageNavigation)
- Multi-prop changes (AccordionToggle, CardHeader)

**Prefix:** `[Tier 2 ⚠️  Review]`

**Action:** ⚠️ **Review AI fixes carefully** before accepting
- Verify structural changes are correct
- Check that logic isn't affected
- Test interactions after applying

---

## Tier 3: Contextual Judgment (Teaching Concept - NOT a Rule Category)

**Source:** ⚠️ **NOT based on `migration_complexity`** - Tier 3 is about CONTEXT, not rule complexity

**Key Insight:**
The violations in `tier3-edge-cases/` files will show as `[Tier 1]` or `[Tier 2]` - the **rules are correct!** But the **context requires human judgment** to reject or manually fix.

**NO Tier 3 Rule Prefix** - You won't see `[Tier 3 ❌ Manual]` in analysis results.

---

### What Tier 3 Teaches:

**Lesson:** "Even simple patterns require judgment in certain contexts"

Participants see `[Tier 1]` violations in tier3-edge-cases files and learn:
- Don't blindly accept AI, even for simple rules
- Understand the code's purpose before applying fixes
- Business context > Rule matching

---

### Tier 3 Scenarios in Workshop:

#### 1. CompatibilityLayer.tsx
**Violation:** `[Tier 1] Imports of Text should reference Content`

**Context:** Intentional dual v5/v6 support during gradual migration

**AI Suggests:** Remove `Text` import, use only `Content`

**Correct Action:** ❌ **REJECT** - business requirement for dual support

**Teaching Point:** AI doesn't understand business logic

---

#### 2. DynamicComponent.tsx
**Violations:**
- `[Tier 1] Imports of Text should reference Content`
- `[Tier 1 - Bulk CSS] pf-v5-c-*` violations in template literals

**Context:** Runtime-computed values, dynamic CSS construction

**AI Suggests:** Replace template literal CSS classes

**Correct Action:** ❌ **MANUAL REVIEW** - AI can't trace runtime values

**Teaching Point:** AI limitations with dynamic/computed patterns

---

#### 3. CustomWrapper.tsx
**Violation:** `[Tier 1] Imports of Text should reference Content`

**Context:** Public API wrapper with custom name

**AI Suggests:** Change `Text` → `Content` everywhere (including wrapper name)

**Correct Action:** ⚠️ **PARTIAL ACCEPT**
- ✅ Update internal: `Text` → `Content`
- ❌ Keep public API: `CustomText` name unchanged

**Teaching Point:** Distinguish internal vs external changes, API stability

---

### How Participants Identify Tier 3:

1. **File location:** `src/components/tier3-edge-cases/`
2. **PARTICIPANT_GUIDE.md:** Explicit Exercise 3 instructions
3. **Code comments:** `/** IMPORTANT FOR WORKSHOP: REJECT THIS FIX */`
4. **StoragePage.tsx:** Warning alert about edge cases

**NOT by rule prefix** - that's the learning opportunity!

---

### Tier 3 Success Criteria:

Participants understand:
- ✅ When to reject AI (compatibility, public APIs, dynamic code)
- ✅ Why context matters more than rule complexity
- ✅ How to evaluate AI suggestions critically
- ✅ **Golden Rule:** "If you don't understand the fix, don't apply it"

---

## Special Cases

### React.FC Removals
**Decision:** Exclude from workshop (too many, not PatternFly-specific)

If included, should be Tier 1:
- "React.FC"
- "FunctionComponent"

### CSS Imports
Path changes for CSS imports.

**Tier:** 1 (simple find-replace)

**Rule patterns:**
- "CSS import"
- "@patternfly/react-core/dist/styles"

---

## Pattern Matching Logic

The script matches rules using this priority:

1. **Tier 3 first** (most specific edge cases)
2. **Tier 2 second** (moderate complexity)
3. **Tier 1 last** (catch-all for simple changes)

This ensures edge cases aren't incorrectly classified as simple changes.

---

## Examples of Final Rule Messages

### Before (Original):
```yaml
- message: "Text component renamed to Content in v6"
- message: "MenuToggle icon should use icon prop instead of child"
- message: "CSS class pf-v5-u-mt-md should be pf-v6-u-mt-md"
```

### After (With Tier Prefixes):
```yaml
- message: "[Tier 1] Text component renamed to Content in v6"
- message: "[Tier 2 ⚠️  Review] MenuToggle icon should use icon prop instead of child"
- message: "[Tier 1 - Bulk CSS] CSS class pf-v5-u-mt-md should be pf-v6-u-mt-md"
```

---

## Validation

After running the script, verify:

1. **Tier 1 rules (~50-60 violations expected)**
   - All component renames tagged
   - All prop renames tagged
   - All CSS updates tagged with "Bulk CSS"

2. **Tier 2 rules (~10-15 violations expected)**
   - MenuToggle tagged
   - EmptyState tagged
   - Button icon props tagged
   - All show ⚠️  emoji

3. **Tier 3 rules (~5 violations expected)**
   - Compatibility layer tagged
   - Dynamic component tagged
   - Custom wrapper tagged
   - All show ❌ emoji

4. **Run analysis and check counts**
   ```bash
   kantra analyze \
     --input ../patternfly-migration-workshop \
     --rules ./preview/nodejs/patternfly \
     --output ./test-results

   # Check distribution
   grep -r "\[Tier 1\]" test-results/output.yaml | wc -l
   grep -r "\[Tier 2" test-results/output.yaml | wc -l
   grep -r "\[Tier 3" test-results/output.yaml | wc -l
   ```

---

## Updating Workshop Documentation

After applying tier prefixes, update:

### 1. SETUP.md and setup scripts
```bash
# Change from:
git clone https://github.com/konveyor/rulesets.git

# To:
git clone -b patternfly-workshop-tiers https://github.com/tsanders-rh/rulesets.git
```

### 2. README.md
Add note about custom ruleset branch:

```markdown
**Note**: This workshop uses a fork of the official ruleset with tier
indicators ([Tier 1], [Tier 2], [Tier 3]) added to violation messages
to guide participants through exercises. The underlying rules are
identical to the official PatternFly ruleset.
```

### 3. PARTICIPANT_GUIDE.md
Update screenshots to show tier prefixes in VS Code.

Add note:
```markdown
Look for violations prefixed with:
- **[Tier 1]** - Simple changes, safe to auto-apply
- **[Tier 2 ⚠️  Review]** - Moderate complexity, review carefully
- **[Tier 3 ❌ Manual]** - Edge cases, manual review required
```

---

## Maintenance

If PatternFly rules are updated:

1. Pull latest from upstream konveyor/rulesets
2. Merge into your fork
3. Re-run add-tier-prefixes.sh script
4. Re-validate tier distribution
5. Update workshop if tier counts change significantly
