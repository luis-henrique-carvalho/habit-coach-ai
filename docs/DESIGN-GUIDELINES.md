# DESIGN GUIDELINES - Habit Coach AI

## Stack Técnico

**Obrigatório usar:**
- ⚛️ **React** + **Next.js**
- 🎨 **Tailwind CSS v4** (classes utilitárias)
- 🧩 **shadcn/ui** (componentes base)
- 🎨 **Variáveis CSS** do `globals.css` (Cores em **OKLCH**)

---

## 1. Filosofia de Design: "Impacto & Personalidade"

### Princípios
1. **Impacto Visual > Segurança**: Busque o "Wow" através de tipografia massiva e layouts assimétricos.
2. **Topological Betrayal**: Quebre deliberadamente os layouts padrão (como o Split Hero). Se parece um template, refaça.
3. **Humor & Persuasão**: O design deve refletir a personalidade dos técnicos (Yoda, General, Amigo).
4. **Precisão Técnica**: Use bordas nítidas (`rounded-md` / `0.5rem`) e alto contraste.

### Inspirações
- **Linear**: Pela precisão técnica e uso de cores.
- **Duolingo**: Pela gamificação e personalidade forte.
- **Design Brutalista/Moderno**: Pela tipografia ousada e uso de espaços negativos.

---

## 2. Paleta de Cores: "Signal Orange" (OKLCH)

**⚠️ SEMPRE usar as variáveis CSS do `globals.css`**

### Cores de Marca

```css
/* Signal Orange - Foco em Energia e Alerta */
--primary: oklch(0.65 0.25 45);
--primary-foreground: oklch(0.99 0.01 45);

/* Backgrounds - Earthy Neutrals */
--background: oklch(0.99 0.01 45); /* Light */
--background: oklch(0.12 0.03 45); /* Dark */
```

### Mapeamento Semântico

| Variável | Classe Tailwind | Efeito Emocional |
|----------|-----------------|------------------|
| `--primary` | `bg-primary` | Urgência, Energia, Ação |
| `--secondary` | `bg-secondary` | Suporte, Equilíbrio, Neutro |
| `--accent` | `bg-accent` | Destaque, Recompensa |
| `--muted` | `text-muted` | Informação Secundária |
| `--destructive` | `bg-destructive` | Erro, Perigo, Destruição |

---

## 3. Tipografia: "Typographic Bold"

### Escala Dominante

| Tamanho | Tailwind Class | Uso |
|---------|----------------|-----|
| **Display Max** | `text-9xl font-black` | Hero Headlines (Impacto Total) |
| **Hero Title** | `text-7xl font-bold` | Sub-headlines de destaque |
| **Section Title** | `text-5xl font-bold` | Cabeçalhos de seção |
| **Body Large** | `text-xl font-medium` | Destaques de leitura |
| **Body** | `text-base` | Texto padrão |

### Estilos Typographic Bold
- **Negative Tracking**: Use `tracking-tighter` em headlines massivos (Display Max / Hero Title).
- **Extreme Leading**: Aperte o leading (`leading-[0.9]`) para blocos de texto brutos.
- **Stroke & Shadow**: Para títulos massivos, considere o uso de `text-transparent bg-clip-text` com gradientes Signal Orange ou sombras sólidas.

---

## 4. Espaçamento & Layout

**⚠️ Use as classes Tailwind ao invés de valores customizados**

### Grid de 4px
Baseado em múltiplos de 4px (sistema 8pt grid do Tailwind).

```jsx
// ✅ CORRETO
<div className="p-4 gap-6 mb-8">  {/* 16px, 24px, 32px */}

// ❌ EVITE valores arbitrários
<div className="p-[13px] gap-[27px]">
```

### Espaçamento Comum

| Uso | Classe Tailwind | Valor |
|-----|-----------------|-------|
| Micro (ícone + texto) | `gap-1` | 4px |
| Pequeno | `p-2`, `gap-2` | 8px |
| Médio | `p-4`, `gap-4` | 16px |
| Padrão (cards) | `p-6` | 24px |
| Seções | `py-8`, `py-12` | 32px, 48px |
| Hero sections | `py-16`, `py-20` | 64px, 80px |

### Container Responsivo

```jsx
// Container centralizado com max-width
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  {/* Conteúdo */}
</div>
```
## 5. Border Radius

### 5.1 Sistema de Arredondamento

O projeto usa um sistema de border radius generoso e escalonado baseado em `--radius` (0.75rem = 12px).

#### Escala de Radius

```css
--radius-sm: calc(var(--radius) - 4px)    /* 8px  - Elementos pequenos */
--radius-md: calc(var(--radius) - 2px)    /* 10px - Inputs, badges */
--radius-lg: var(--radius)                /* 12px - Padrão (cards, buttons) */
--radius-xl: calc(var(--radius) + 6px)    /* 18px - Cards maiores */
--radius-2xl: calc(var(--radius) + 12px)  /* 24px - Modals, sections */
--radius-3xl: calc(var(--radius) + 20px)  /* 32px - Containers grandes */
```

## 4. Layout & Geometria: "Grid Betrayal"

### Bordas "Sharp & Technical"
Substituímos o arredondado suave por algo mais agressivo e técnico:
- **Default Radius**: `--radius: 0.5rem;` (8px). Use para inputs, cards internos e botões padrão.
- **Extreme Choices**: Use `rounded-none` para botões/blocos de alto impacto ou `rounded-full` para badges/pills. Evite valores intermediários.

### Quebra de Grid
- **Staggered Elements**: Alinhe elementos de forma desalinhada (ex: H1 à esquerda, P centralizado, CTA à direita).
- **Z-Axis Stacking**: Use fragmentos (como painéis de dashboard ou cards) sobrepostos ou em parallax atrás do conteúdo.
- **Negative Space**: Deixe espaços vazios intencionais para criar tensão visual.

---

## 5. Personagens & Fragmentos (Coaching Fragments)

O design deve integrar as vozes do app visualmente como elementos vivos:

### O Fragmento "Mentor" (Yoda)
- **Estilo**: `bg-card/80 backdrop-blur-md`, bordas arredondadas suaves (`rounded-3xl`), sombra difusa.
- **Vibe**: Sábio, orgânico, calmo.

### O Fragmento "Sargento" (General Strike)
- **Estilo**: `bg-primary`, `rounded-none`, bordas pretas grossas (`border-2 border-foreground`).
- **Vibe**: Agressivo, direto, urgente (Bold/Caps).

---

## 6. Motion & Feedback Premium

### "Spring Physics"
Animações não devem ser lineares. Use o padrão Framer Motion:
`ease: [0.22, 1, 0.36, 1]`

### Staggered Reveals
Toda página deve "montar" na tela com delays incrementais:
1. Status/Badge (0.1s)
2. Headlines (0.2s)
3. Subtextos/CTAs (0.4s)
4. Coach Fragments (1.0s+)

---

## 7. Componentes & Acessibilidade

- **Lucide Icons**: Use com `stroke-width={2.5}` para casar com a tipografia bold.
- **Acessibilidade**: Mantenha o focus ring (`--ring`) aparente. Contraste de `Signal Orange` no `Deep Dark` é validado para WCAG AA.
- **Imagens**: Sempre use `next/image` com `rounded-2xl` e efeitos de `grayscale hover:grayscale-0`.

---

**Versão**: 4.0 (Signal Orange Edition)
**Foco**: Tipografia Bold, Assimetria e Personalidade Gamificada.
