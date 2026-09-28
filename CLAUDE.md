# ProyectoSoftware — Tienda de ropa (proyecto de muestra)

## Flujo de trabajo obligatorio: issues + GitHub Projects

Todo el trabajo se hace **a partir de un issue** del repo `Aegisystem/ProyectoSoftware`
y se refleja en el GitHub Project **ProyectoSoftware** (#16):
https://github.com/users/Aegisystem/projects/16

No uses ni crees otros proyectos (el proyecto "Tienda de Ropa" #17 fue un error).

### Antes de empezar a trabajar
1. Identifica el issue. Si el usuario pide algo que no tiene issue, créalo
   (`gh issue create`), agrégalo al proyecto y asígnale Priority, Size e Iteration.
2. Prioriza por la Iteration actual y luego por Priority (P0 > P1 > P2).
3. Mueve el item a **In progress** y crea una rama `issue-<n>-<slug>` desde `main`.

### Mientras trabajas / al terminar
- Referencia el issue en los commits (`#<n>`).
- Abre el PR con `Closes #<n>` en la descripción y mueve el item a **In review**.
- Cuando el PR se mergea (o el issue se cierra), mueve el item a **Done**.
- Si el alcance cambia, actualiza el issue (descripción/comentario) y los campos del proyecto.

## Campos del proyecto (plantilla existente — no crear campos nuevos)

| Campo | Valores |
|---|---|
| Status | Backlog → Ready → In progress → In review → Done |
| Priority | P0 (crítico), P1, P2 |
| Size | XS, S, M, L, XL |
| Iteration | Iteraciones de 2 semanas (Iteration 1 empieza 2026-09-28) |
| Estimate | número (opcional) |

IDs (para `gh project item-edit`):

```
PROJECT_ID = PVT_kwHOBc-QKM4Bk-1_
Status     = PVTSSF_lAHOBc-QKM4Bk-1_zhjtZFQ  Backlog=f75ad846 Ready=e18bf179 "In progress"=47fc9ee4 "In review"=aba860b9 Done=98236657
Priority   = PVTSSF_lAHOBc-QKM4Bk-1_zhjtZNU  P0=79628723 P1=0a877460 P2=da944a9c
Size       = PVTSSF_lAHOBc-QKM4Bk-1_zhjtZNY  XS=911790be S=b277fb01 M=86db8eb3 L=853c8207 XL=2d0801e2
Iteration  = PVTIF_lAHOBc-QKM4Bk-1_zhjtZNg   (IDs de iteración: ver comando abajo)
Estimate   = PVTF_lAHOBc-QKM4Bk-1_zhjtZNc
```

## Comandos útiles

```bash
# Ver items con sus campos
gh project item-list 16 --owner Aegisystem --format json --limit 100 \
  | jq -r '.items[]|[.content.number,.content.title,.status,.priority,.size,.iteration.title]|@tsv'

# ID del item de un issue (ej. #3)
gh project item-list 16 --owner Aegisystem --format json --limit 100 \
  | jq -r '.items[]|select(.content.number==3).id'

# Agregar un issue nuevo al proyecto
gh project item-add 16 --owner Aegisystem --url https://github.com/Aegisystem/ProyectoSoftware/issues/<n>

# Cambiar Status (ej. a In progress)
gh project item-edit --project-id PVT_kwHOBc-QKM4Bk-1_ --id <ITEM_ID> \
  --field-id PVTSSF_lAHOBc-QKM4Bk-1_zhjtZFQ --single-select-option-id 47fc9ee4

# IDs de las iteraciones
gh api graphql -f query='{user(login:"Aegisystem"){projectV2(number:16){field(name:"Iteration"){... on ProjectV2IterationField{configuration{iterations{id title startDate}}}}}}}'
```

Nota: la shell es zsh — los arrays empiezan en 1, no en 0. Evita arrays indexados en scripts o usa `case`/heredocs.
