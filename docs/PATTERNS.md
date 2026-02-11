# Gestok - Project Patterns

## Stack

Next.js 16 App Router, TypeScript, Drizzle ORM (PostgreSQL), Better Auth, React Hook Form + Zod, next-safe-action, shadcn/ui. Import alias: `@/*` → `./src/*`. All user-facing text in **pt-BR**.

---

## 1. Route Groups

```
src/app/
├── (private)/       # Auth required → redirects to /login
├── (public)/        # No auth → redirects logged users to /dashboard
└── api/auth/        # Better Auth API routes
```

## 2. Feature Module Structure

```
src/app/(private)/<feature>/
├── page.tsx                        # Async Server Component entry point
├── actions/
│   ├── index.ts                    # Re-exports all actions
│   ├── get-<entities>.ts           # Paginated query
│   ├── upsert-<entity>.ts          # Create/update
│   └── delete-<entity>.ts          # Delete
├── components/
│   ├── <feature>-content.tsx       # Server Component (fetch + layout)
│   ├── add-<entity>-button.tsx     # Client Component (dialog trigger)
│   ├── upsert-<entity>-form.tsx    # Client Component (form)
│   └── table/
│       ├── table-columns.tsx       # Column definitions
│       └── table-actions.tsx       # Row actions (edit/delete dialogs)
├── hooks/
│   └── use-<feature>.ts            # Custom hooks (e.g., useEntities)
└── schemas/
    └── upsert-<entity>-schema.ts   # Zod schema + inferred type export
```

All files use **kebab-case**.

## 3. Page Pattern (`page.tsx`)

```tsx
const Page = async ({ searchParams }: { searchParams: Promise<{ query?: string; page?: string }> }) => {
  await requireFullAuth();
  const { query, page } = await searchParams;
  return (
    <Suspense fallback={<PagesLoading title="..." description="..." showActions showSearch columns={6} rows={10} />}>
      <FeatureContent query={query} page={page || "1"} />
    </Suspense>
  );
};
```

Flow: `requireFullAuth()` → `await searchParams` → `<Suspense>` with `<PagesLoading>` → delegate to Content.

## 4. Content Component (Server)

```tsx
const Content = async ({ query, page }: Props) => {
  const { data } = await getEntities({ limit: "10", page: String(query ? 1 : page), query });
  if (!data?.entities) { /* render error UI */ }
  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Title</PageTitle>
          <PageDescription>Description</PageDescription>
        </PageHeaderContent>
        <PageActions><AddEntityButton /></PageActions>
      </PageHeader>
      <PageContent>
        <SearchInput placeholder="..." />
        <DataTable columns={columns} data={entities} />
        <DynamicPagination currentPage={page} totalPages={totalPages} />
      </PageContent>
    </PageContainer>
  );
};
```

## 5. Server Actions

All use `"use server"`, `actionClient` from `next-safe-action`, and `auth.api.getSession()` for authentication.

**Return shape:** `{ success: boolean; data?: T; error?: { code: string; message: string } }`

### Mutation action

```tsx
"use server";
export const createHabitAction = actionClient
  .inputSchema(createHabitSchema)
  .action(async ({ parsedInput }): Promise<ActionResult<typeof habit.$inferSelect>> => {
    try {
      const session = await auth.api.getSession({ headers: await headers() });
      if (!session?.user?.id) {
        return { success: false, error: { code: "UNAUTHORIZED", message: "You must be authenticated" } };
      }

      // Business logic (e.g., tier limits, validations)
      const activeHabits = await db.select({ id: habit.id }).from(habit)
        .where(and(eq(habit.userId, session.user.id), isNull(habit.isActive)));
      if (activeHabits.length >= 3) {
        return { success: false, error: { code: "TIER_LIMIT_EXCEEDED", message: "Limit exceeded" } };
      }

      // Create entity
      const newHabit = { id: crypto.randomUUID(), userId: session.user.id, ...parsedInput };
      await db.insert(habit).values(newHabit);

      await revalidatePath("/habits");
      return { success: true, data: newHabit };
    } catch (error: unknown) {
      const drizzleError = error as DrizzleErrorWithCause;
      const constraintName = drizzleError?.cause?.constraint_name;
      const constraintMapping: Record<string, { field: string; message: string }> = {
        habit_userId_name_active_unique: { field: "name", message: "Name already in use" },
      };
      const mapped = constraintMapping[constraintName];
      if (mapped) return { success: false, error: { code: "ALREADY_EXISTS", message: mapped.message } };
      return { success: false, error: { code: "DATABASE_ERROR", message: "Unexpected error" } };
    }
  });
```

Always `revalidatePath()` after mutations.

## 6. Auth

Use Better Auth

## 7. Zod Schemas

File: `schemas/upsert-<entity>-schema.ts`. Always export both schema and type. Validation messages in **pt-BR**.

```tsx
export const upsertEntitySchema = z.object({ id: z.number().optional(), name: z.string().min(1, "Nome é obrigatório") });
export type UpsertEntityFormData = z.infer<typeof upsertEntitySchema>;
```

Naming: `upsert<Entity>Schema` + `Upsert<Entity>FormData`. Used in both Server Action (`.inputSchema()`) and form (`zodResolver()`).

## 8. Form Pattern

```tsx
"use client";
const Form = ({ entity, onSuccess, isOpen }: Props) => {
  const form = useForm<FormData>({ shouldUnregister: true, resolver: zodResolver(schema), defaultValues: { ... } });
  useEffect(() => { if (isOpen) form.reset({ ... }); }, [isOpen]);

  const action = useAction(serverAction, {
    onSuccess: ({ data }) => {
      if (!data.success) {
        if (data.fieldErrors) {
          Object.entries(data.fieldErrors).forEach(([f, m]) =>
            form.setError(f as keyof FormData, { type: "manual", message: m as string }));
          return;
        }
        if (data.serverError) { toast.error(data.serverError); return; }
        return;
      }
      toast.success("pt-BR success msg");
      onSuccess?.();
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => action.execute(v))}>
        <FormField control={form.control} name="field" render={({ field }) => (
          <FormItem><FormLabel>Label</FormLabel><FormControl><Input {...field} /></FormControl><FormMessage /></FormItem>
        )} />
        <Button type="submit" disabled={action.status === "executing"}>Submit</Button>
      </form>
    </Form>
  );
};
```

## 9. Table Columns

```tsx
"use client";
type Entity = typeof entityTable.$inferSelect & { relation?: { id: number; name: string } | null };

export const columns: ColumnDef<Entity>[] = [
  { id: "name", header: "Nome", accessorKey: "name" },
  { id: "price", header: "Preço", accessorKey: "price",
    cell: (p) => Number(p.row.original.price).toLocaleString("pt-BR", { style: "currency", currency: "BRL" }) },
  { id: "actions", header: "Ações", cell: (p) => <TableActions entity={p.row.original} /> },
];
```

`TableActions` uses `useState` for edit/delete `Dialog` state.

## 10. Database (Drizzle ORM)

Schema file: `src/drizzle/schema.ts`. Commands: `npm run db:generate`, `npm run db:migrate`, `npm run db:studio`.

### Table rules

- Table name: English plural (`products`). Variable: `<singular>Table` (`productTable`)
- PK: `id: serial("id").primaryKey()`
- User-owned entities: `userId` FK with `onDelete: "cascade"`
- Timestamps: `createdAt` + `updatedAt` with `.$defaultFn(() => new Date()).notNull()`
- Composite unique indexes per user: `uniqueIndex("table_field_user_id_index").on(table.field, table.userId)`
- FK `onDelete`: `cascade` (user-owned) | `set null` (optional) | `restrict` (prevent)
- Enums: `pgEnum("name", ["val1", "val2"])`
- Relations: `relations()` for query joins
- Type inference: `typeof entityTable.$inferSelect`
