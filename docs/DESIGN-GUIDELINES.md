# DESIGN GUIDELINES - Habit Coach AI

## Stack Técnico

**Obrigatório usar:**
- ⚛️ **React** + **Next.js**
- 🎨 **Tailwind CSS v4** (classes utilitárias)
- 🧩 **shadcn/ui** (componentes base)
- 🎨 **Variáveis CSS** do `globals.css` (cores, espaçamento, radius)

**Regra de Ouro:** Sempre use componentes do shadcn/ui como base. Se não estiver instalado, instale via CLI:
```bash
npx shadcn@latest add [component-name]
```

---

## 1. Filosofia de Design

### Princípios
1. **Clareza > Criatividade**: Função antes de forma
2. **Consistência**: Use as variáveis CSS do projeto
3. **Acolhedor e Vibrante**: Cores OKLCH vibrantes, formas arredondadas
4. **Feedback Visual**: Toda ação do usuário tem resposta visual

### Inspirações
- **Linear**: Minimalismo, boa hierarquia visual
- **Vercel**: Tipografia limpa, espaçamento generoso
- **Duolingo**: Gamificação, personalidade forte

---

## 2. Paleta de Cores (OKLCH)

**⚠️ SEMPRE usar as variáveis CSS do `globals.css`**

### Cores de Marca

```css
/* Use via Tailwind */
className="bg-brand-orange"   /* Laranja vibrante - CTAs principais */
className="bg-brand-beige"    /* Bege suave - Backgrounds alternados */
className="bg-brand-green"    /* Verde menta - Sucesso/Feedback positivo */
```

### Cores Semânticas (shadcn/ui)

**Sempre use estas variáveis ao invés de valores hardcoded:**

```jsx
// ✅ CORRETO - Usa variáveis CSS
<div className="bg-background text-foreground" />
<Button variant="default" /> {/* Usa --primary internamente */}
<Card /> {/* Usa --card e --card-foreground */}

// ❌ ERRADO - Valores hardcoded
<div className="bg-white text-black" />
<button style={{ background: '#FF6B35' }} />
```

### Mapeamento de Cores

| Variável CSS | Uso | Classe Tailwind |
|--------------|-----|-----------------|
| `--background` | Fundo principal | `bg-background` |
| `--foreground` | Texto principal | `text-foreground` |
| `--primary` | Ações principais (laranja) | `bg-primary`, `text-primary` |
| `--secondary` | Ações secundárias (beige) | `bg-secondary` |
| `--accent` | Destaques (verde) | `bg-accent` |
| `--muted` | Texto secundário/disabled | `text-muted-foreground` |
| `--border` | Bordas | `border-border` |
| `--ring` | Focus ring | `ring-ring` |
| `--destructive` | Ações destrutivas | `bg-destructive` |

### Acessibilidade (Contraste WCAG AA)
Todas as combinações de cores já foram testadas e aprovadas:
- `foreground` + `background`: ~15.8:1 ✅ AAA
- `primary-foreground` + `primary`: ~8.5:1 ✅ AAA

---

## 3. Tipografia

**Fontes do Projeto:** Geist Sans (UI) + Geist Mono (código)

### Como Usar

```jsx
// ✅ Usa automaticamente Geist Sans (via font-sans)
<p className="font-sans">Texto normal</p>

// Para código/dados técnicos
<code className="font-mono">const x = 42;</code>

// Não é necessário importar - já está no layout root
```

### Escala Tipográfica

| Elemento | Tailwind Class | Uso |
|----------|----------------|-----|
| Display | `text-6xl font-bold` | Hero headings |
| H1 | `text-4xl font-bold` | Page titles |
| H2 | `text-3xl font-semibold` | Section titles |
| H3 | `text-2xl font-semibold` | Subsections |
| Body | `text-base` | Texto padrão (16px) |
| Small | `text-sm` | Captions, labels |
| Tiny | `text-xs` | Hints, metadata |

### Letter Spacing & Line Height

```jsx
// Headings: tracking negativo, line-height apertado
<h1 className="text-4xl font-bold tracking-tight leading-tight">

// Body: line-height confortável
<p className="text-base leading-relaxed">

// Botões: tracking levemente positivo
<Button className="tracking-wide">
```

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

#### Valores em Tailwind

| Classe Tailwind | Valor Calculado | Uso |
|-----------------|-----------------|-----|
| `rounded-sm` | 8px | Badges pequenos, bordas internas |
| `rounded-md` | 10px | Inputs, selects |
| `rounded-lg` | 12px | **Padrão** - Buttons, Cards |
| `rounded-xl` | 18px | Cards de destaque |
| `rounded-2xl` | 24px | Modals, Sections |
| `rounded-3xl` | 32px | Containers hero, grandes blocos |
| `rounded-full` | 9999px | Avatares, Pills, Badges circulares |

---
## 6. Sombras e Bordas

### 6.1 Filosofia de Elevação

O design privilegia **separação por cor e contorno** sobre sombras pesadas. Cards e componentes se destacam através de:
- Backgrounds contrastantes (ex: card branco sobre fundo beige)
- Bordas sutis
- Sombras muito leves e difusas

### 6.2 Sistema de Bordas

Todas as bordas usam a variável `--color-border` que se adapta ao tema:

```css
/* Light Mode */
--color-border: oklch(0.92 0.01 40)  /* Cinza muito claro */

/* Dark Mode */
--color-border: oklch(0.25 0.02 255 / 0.5)  /* Azul escuro com transparência */
```

**Uso em componentes:**
```css
.card {
  border: 1px solid var(--color-border);
}
```

### 6.3 Sombras (Minimalistas)

O projeto usa sombras muito sutis para não competir com as cores vibrantes:

```css
/* Sombra padrão (cards, dropdowns) */
.shadow-subtle {
  box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1),
              0 1px 2px -1px rgb(0 0 0 / 0.1);
}

/* Sombra média (modals, popovers) */
.shadow-medium {
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1),
              0 2px 4px -2px rgb(0 0 0 / 0.1);
}

/* Sombra para hover */
.shadow-hover {
  box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.05),
              0 4px 6px -4px rgb(0 0 0 / 0.05);
}
```

**Equivalentes em Tailwind:**
- `shadow-subtle` = `shadow-sm`
- `shadow-medium` = `shadow-md`
- `shadow-hover` = `shadow-lg`

### 6.4 Focus Ring

O focus ring usa a cor primária (laranja) para consistência:

```css
*:focus-visible {
  outline: 2px solid var(--color-ring);  /* Brand Orange */
  outline-offset: 2px;
}
```

**Em Tailwind:**
```jsx
<Button className="focus-visible:outline-ring">...</Button>
```
## 5. Border Radius

### 5.1 Escala (Super Rounded)

A identidade visual da referência é fortemente baseada em formas arredondadas e amigáveis.

| Token | Valor | Uso |
|-------|-------|-----|
| `rounded-md` | 8px | Inputs, elementos internos pequenos |
| `rounded-lg` | 12px | Cards pequenos |
| `rounded-xl` | 16px | Cards padrão |
| `rounded-2xl` | 24px | Cards de destaque, Seções, Modals |
| `rounded-3xl` | 32px | Containers grandes |
| `rounded-full` | 9999px | **Botões**, Badges, Pills |

---

### 5.2 Uso por Componente

| Componente | Border Radius |
|------------|---------------|
| Button | **`rounded-full`** (Pill shape) |
| Input | `rounded-full` ou `rounded-xl` |
| Card | `rounded-2xl` (24px) ou `rounded-3xl` |
| Modal | `rounded-3xl` |
| Badge | `rounded-full` |
| Imagens | `rounded-2xl` |

---

## 6. Sombras e Bordas

### 6.1 Estilo
Menos sombras "drop shadow" clássicas, mais definição por **cor de fundo** e contornos suaves.
Cartões brancos sobre fundo colorido (azul ou cinza claro).

```css
/* Card Clean */
.card {
  background: white;
  border: 1px solid rgba(0,0,0,0.05); /* Borda sutil */
  box-shadow: 0 4px 20px rgba(0,0,0,0.03); /* Sombra difusa muito leve */
}
```
---

### 6.3 Sombras Coloridas (Opcional)

Para CTAs ou elementos especiais:

```css
/* Sombra com tint azul */
### 8.2 Customizações de shadcn/ui

shadcn/ui permite customização via CSS variables. O projeto usa **OKLCH** ao invés de HSL.

**Arquivo: `src/app/globals.css`**

As variáveis CSS estão configuradas através do theme inline do Tailwind:

```css
@theme inline {
  /* Cores do Sistema (mapeamento para shadcn/ui) */
  --color-background: var(--background);
  --color-foreground: var(--foreground);
  --color-primary: var(--primary);
  --color-primary-foreground: var(--primary-foreground);
  --color-secondary: var(--secondary);
  --color-secondary-foreground: var(--secondary-foreground);
  --color-accent: var(--accent);
  --color-accent-foreground: var(--accent-foreground);
  --color-muted: var(--muted);
  --color-muted-foreground: var(--muted-foreground);
  --color-card: var(--card);
  --color-card-foreground: var(--card-foreground);
  --color-border: var(--border);
  --color-input: var(--input);
  --color-ring: var(--ring);
  
  /* Cores de Marca */
  --color-brand-orange: oklch(0.75 0.18 50);
  --color-brand-beige: oklch(0.96 0.03 85);
  --color-brand-green: oklch(0.92 0.06 140);
  
  /* Fontes */
  --font-sans: var(--font-geist-sans);
  --font-mono: var(--font-geist-mono);
  
  /* Border Radius */
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
### 8.3 Diretrizes de Uso

#### Button

Os botões usam `rounded-lg` (12px) por padrão. Variantes disponíveis:

```jsx
// Primário (Brand Orange - Padrão)
<Button variant="default">Criar Hábito</Button>

// Secundário (Outline)
<Button variant="outline">Cancelar</Button>

// Ghost (sem fundo)
<Button variant="ghost">Mais opções</Button>

// Destrutivo
<Button variant="destructive">Excluir</Button>

// Com ícone
<Button>
  <PlusIcon className="mr-2 h-4 w-4" />
  Novo Hábito
</Button>

// Tamanhos
<Button size="sm">Pequeno</Button>
<Button size="default">Padrão</Button>
<Button size="lg">Grande</Button>
```

**Customizações:**
```jsx
// Pill shape (arredondamento total)
<Button className="rounded-full">Get Started</Button>

// Usando cor de marca diretamente
<Button className="bg-brand-orange hover:bg-brand-orange/90">
  Ação Especial
</Button>
```

#### Card

Cards usam `rounded-lg` (12px) com sombra sutil:

```jsx
// Card padrão
<Card>
  <CardHeader>
    <CardTitle>Título do Card</CardTitle>
    <CardDescription>Descrição opcional</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Conteúdo */}
  </CardContent>
  <CardFooter>
    {/* Ações */}
  </CardFooter>
</Card>

// Card de destaque (mais arredondado)
<Card className="rounded-2xl bg-brand-beige border-none">
  <CardContent className="p-8">
    {/* Conteúdo especial */}
  </CardContent>
</Card>
```

#### Dialog (Modal)

```jsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir Modal</Button>
  </DialogTrigger>
import { CheckCircle, AlertTriangle, Info } from 'lucide-react';

// Ícone com texto
<div className="flex items-center gap-2">
  <CheckCircle size={20} className="text-success-500" />
  <span>Hábito completado</span>
</div>

// Ícone em botão
<button>
  <PlusIcon size={20} />
  Criar Hábito
</button>
```

---

### 7.4 Cores de Ícones

- **Padrão:** Mesmo que texto (`gray-700`)
- **Ativo:** `primary-500`
- **Success:** `success-500`
- **Warning:** `warning-500`
- **Error:** `error-500`

---

## 8. Componentes shadcn/ui

### 8.1 Componentes Usados

Habit Coach AI usa shadcn/ui como base do design system.

**Componentes Principais:**
- Button
- Input, Textarea
- Card
- Dialog (Modal)
- Dropdown Menu
- Checkbox, Radio Group
- Select
- Toast (Notificações)
- Badge
- Avatar
- Calendar
- Progress
- Tabs
- Accordion
- Tooltip
- Alert

**Instalação:**
```bash
npx shadcn-ui@latest init
npx shadcn-ui@latest add button card input ...
```

---

### 8.2 Customizações de shadcn/ui

shadcn/ui permite customização via CSS variables.

**Arquivo: `app/globals.css`**

```css
@layer base {
  :root {
    --background: 0 0% 100%; /* white */
    --foreground: 240 10% 3.9%; /* gray-900 */

    --primary: 217 91% 60%; /* primary-500 */
    --primary-foreground: 0 0% 100%; /* white */

    --secondary: 270 80% 63%; /* secondary-500 */
    --secondary-foreground: 0 0% 100%; /* white */

    --muted: 240 4.8% 95.9%; /* gray-100 */
    --muted-foreground: 240 3.8% 46.1%; /* gray-600 */

    --accent: 240 4.8% 95.9%; /* gray-100 */
    --accent-foreground: 240 5.9% 10%; /* gray-900 */

    --destructive: 0 84.2% 60.2%; /* error-500 */
    --destructive-foreground: 0 0% 100%; /* white */

    --border: 240 5.9% 90%; /* gray-200 */
    --input: 240 5.9% 90%; /* gray-200 */
    --ring: 217 91% 60%; /* primary-500 (focus ring) */

    --radius: 0.5rem; /* 8px */
  }
}
```

---

### 8.3 Diretrizes de Uso

#### Button
```jsx
// Primário (ação principal)
<Button variant="default">Criar Hábito</Button>

### 8.3 Diretrizes de Uso

#### Button
Todos os botões devem ser **Pill Shaped** (`rounded-full`).

```jsx
// Primário (Dark/Black - Alto contraste)
// Usado em fundos claros ou brancos
<Button className="rounded-full bg-gray-900 text-white hover:bg-gray-800">
  Schedule now
</Button>

// Primário (Brand Blue)
// Usado quando se quer destacar a marca
<Button className="rounded-full bg-primary-500 text-white hover:bg-primary-600">
  Get Started
</Button>

// Outline
// Ações secundárias
<Button variant="outline" className="rounded-full border-gray-200">
  Saiba Mais
</Button>
```

#### Card
Cards devem ter bastante padding (espaço interno) e bordas bem arredondadas.

```jsx
<Card className="rounded-3xl border-none shadow-sm p-6 sm:p-8">
  {/* Conteúdo centralizado ou com ilustrações */}
</Card>
```/DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
      <DialogDescription>Descrição</DialogDescription>
    </DialogHeader>
    {/* Conteúdo */}
  </DialogContent>
</Dialog>
```

---

## 8. Ícones

**Use Lucide React** (já instalado com shadcn/ui)

```bash
pnpm add lucide-react
```

```jsx
import { Plus, Check, X, AlertCircle } from 'lucide-react';

<Button>
  <Plus className="mr-2 h-4 w-4" />
  Novo Hábito
</Button>
```

**Tamanhos:** `h-4 w-4` (16px) ou `h-5 w-5` (20px)

---

## 9. Responsividade

**Mobile-First:** Sempre desenhe para mobile primeiro, depois adicione complexidade.

```jsx
// ✅ Mobile-first
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

// Container responsivo
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
```

**Breakpoints Tailwind:**
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px

---

## 10. Acessibilidade

- ✅ Focus ring automático (shadcn/ui usa `--ring`)
- ✅ Contraste WCAG AA validado
- ✅ ARIA labels em ícones sem texto
- ✅ Navegação por teclado (Tab, Esc, Enter)

```jsx
// Botão apenas com ícone
<Button aria-label="Fechar">
  <X className="h-4 w-4" />
</Button>
```

---

## 11. Performance

### Imagens
```jsx
import Image from 'next/image';

<Image
  src="/hero.png"
  alt="Dashboard"
  width={1200}
  height={800}
  priority  // Apenas para hero
  className="rounded-2xl"
/>
```

### Lazy Loading
```jsx
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('@/components/Calendar'));
```

---

## 12. Referências Rápidas

**Ferramentas:**
- shadcn/ui: https://ui.shadcn.com
- Tailwind CSS v4: https://tailwindcss.com
- Lucide Icons: https://lucide.dev
- OKLCH Color Picker: https://oklch.com
- Contrast Checker: https://webaim.org/resources/contrastchecker/

**Inspirações:**
- Linear: https://linear.app
- Vercel: https://vercel.com

---

**Versão**: 3.0 (Refinada)  
**Data**: Janeiro 2026  
**Foco**: Uso de variáveis CSS do globals.css + shadcn/ui + Tailwind
