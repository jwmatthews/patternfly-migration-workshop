# PatternFly 5 → 6 Migration Progress

- [x] Update PatternFly dependencies to v6 (`@patternfly/react-core`, `@patternfly/react-icons`).
- [x] Replace deprecated components (Text/TextContent → Content, Chip → Label) and update EmptyState API usage.
- [x] Migrate PatternFly v5 class prefixes to v6 and update custom CSS to v6 design tokens; remove unused CSS overrides.
- [x] Refresh snapshots to reflect PF6 component output changes (Label, Content, and OUIA metadata).
- [x] Fix PF6 EmptyState icon prop usage (component type vs JSX element) to resolve runtime render errors.
- [x] Update snapshots for PF6 Content OUIA metadata and Label clickable markup changes.
- [x] Adjust EmptyState snapshot for PF6 Button text wrapper markup.
