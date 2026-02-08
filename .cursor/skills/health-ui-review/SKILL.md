---
name: health-ui-review
description: Reviews UI for clarity, hierarchy and consistency. Identifies layout, spacing, typography or interaction issues that reduce usability or perceived quality. Suggests concrete, minimal improvements aligned with a calm, professional healthcare design system. Use when the user asks for a UI review, design audit, feedback on clarity or consistency, or to identify usability issues. Does not redesign or add features.
---

# Health UI Review

## Scope

Review existing UI only. Do **not** redesign layouts or add new features. Focus on identifying issues and suggesting minimal, targeted fixes.

---

## Review Checklist

### Clarity

- [ ] Purpose of the page/section is immediately understandable
- [ ] Critical info visible within first screen on mobile (what it is, who it's for, main CTA)
- [ ] Labels and copy are unambiguous
- [ ] Visual hierarchy guides the eye correctly (H1 → H2 → H3 → body)

### Hierarchy

- [ ] One H1 per page, logical heading structure
- [ ] Primary CTA clearly distinguishable from secondary actions
- [ ] Important content not visually drowned by less important elements

### Consistency

- [ ] Spacing follows a consistent system (4/8px grid)
- [ ] Typography sizes and weights follow a hierarchy (see health-ui-design)
- [ ] Button styles and hover/focus states are consistent
- [ ] Container widths and layout rhythm are coherent

### Typography

- [ ] Minimum 16px for body text on mobile
- [ ] Line height ≥ 1.5 for body text
- [ ] Contrast ≥ 4.5:1 for normal text

### Layout & Spacing

- [ ] Max 2–3 main sections on the page
- [ ] Adequate whitespace between blocks
- [ ] Spacing tokens used consistently (not arbitrary values)

### Interaction

- [ ] Primary CTA min. 44px height for touch
- [ ] Visible focus states for keyboard users
- [ ] No misleading or overlapping click targets

---

## Output Format

Structure feedback as:

```markdown
## Issues Found

### [Category: e.g. Typography]
- **Issue**: [Specific problem]
  - **Location**: [Component/page]
  - **Suggestion**: [Concrete, minimal fix]

### [Category]
...
```

### Severity Levels

- **High**: Confuses users, blocks key actions, or breaks hierarchy
- **Medium**: Reduces usability or perceived quality
- **Low**: Minor polish or consistency

---

## Alignment

Use the design principles from the health-ui-design skill (calm, clinical, premium; spacing tokens; typography hierarchy; limited color palette; 1 primary + 1 secondary CTA per page).

---

## Do Not

- Redesign layouts or propose new structures
- Add features or new UI elements
- Change copy or content strategy
- Suggest decorative or non-functional changes
