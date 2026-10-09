Go outside of this project and read petoria/docs/ai first!

# Petoria Frontend Modificaiton Instructions

This client project is being migrated form nestart-next to petoria-next

## Rules

-Preserve current project architecture
-Keep GraphQL/Apollo integration
-Do not rewrite the whole app
-Improve UI incrementally

## Backend Context

Before making any changes, read:

-docs/ai/BACKEND_MIGRATION.md
-docs/ai/DECISIONS.md
-docs/ai/FRONTEND_MIGRATION.md
and etc inside of peteria/docs/ai

## Workflow
1. Anaylze before editing.
2. Backend is running on port http://localhost:3007/graphql
3. Make small incremental changes.
4. Run typecheck after each phase.
5. Do not remove working logic unless replaced safely.
6. Update petoria/docs/ai/COMPLETED_TASKS.md after major changes.