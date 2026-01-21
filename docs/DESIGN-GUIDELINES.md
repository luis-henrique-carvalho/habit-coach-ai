# DESIGN GUIDELINES - Habit Coach AI

## 1. Visão Geral do Design

### 1.1 Filosofia de Design
Habit Coach AI deve transmitir:
- **Modernidade**: Clean, minimalista, atual
- **Confiabilidade**: Profissional sem ser corporativo
- **Acessibilidade**: Amigável e não intimidador
- **Motivação**: Energético sem ser excessivo

### 1.2 Inspirações Visuais
- **Linear** (linear.app): Interface limpa, hierarquia clara, animações sutis
- **Resend** (resend.com): Minimalismo, tipografia excelente, espaços em branco generosos
- **Vercel** (vercel.com): Uso de gradientes sutis, contraste eficaz, modernidade

### 1.3 Princípios de Design
1. **Clareza > Criatividade**: Função antes de forma
2. **Consistência**: Padrões repetidos em toda a interface
3. **Hierarquia Visual**: Guiar o olhar do usuário naturalmente
4. **Espaço em Branco**: Respiração visual, não sobrecarregar
5. **Feedback**: Toda ação do usuário tem resposta visual

---

## 2. Paleta de Cores

### 2.1 Cores Primárias

#### Primary (Azul)
Usado para CTAs principais, links, elementos interativos.

```
primary-50:  #eff6ff
primary-100: #dbeafe
primary-200: #bfdbfe
primary-300: #93c5fd
primary-400: #60a5fa
primary-500: #3b82f6  ← Base
primary-600: #2563eb
primary-700: #1d4ed8
primary-800: #1e40af
primary-900: #1e3a8a
```

**Uso:**
- primary-500: Botões primários, links ativos
- primary-600: Hover em botões primários
- primary-100: Backgrounds sutis de badges, notifications

---

#### Secondary (Roxo/Violeta)
Usado para acentos, elementos secundários, gradientes.

```
secondary-50:  #faf5ff
secondary-100: #f3e8ff
secondary-200: #e9d5ff
secondary-300: #d8b4fe
secondary-400: #c084fc
secondary-500: #a855f7  ← Base
secondary-600: #9333ea
secondary-700: #7e22ce
secondary-800: #6b21a8
secondary-900: #581c87
```

**Uso:**
- secondary-500: Ícones de destaque, badges premium
- secondary-100: Backgrounds de cards especiais
- Gradientes: primary-500 → secondary-500

---

### 2.2 Cores Neutras

#### Grayscale
Usado para textos, backgrounds, borders.

```
gray-50:  #fafafa
gray-100: #f5f5f5
gray-200: #e5e5e5
gray-300: #d4d4d4
gray-400: #a3a3a3
gray-500: #737373
gray-600: #525252
gray-700: #404040
gray-800: #262626
gray-900: #171717
```

**Uso:**
- gray-900: Texto principal (headings)
- gray-700: Texto secundário (body)
- gray-500: Texto terciário (labels, hints)
- gray-100: Background de cards, inputs
- gray-200: Borders sutis

---

### 2.3 Cores Funcionais

#### Success (Verde)
```
success-50:  #f0fdf4
success-500: #22c55e  ← Base
success-600: #16a34a
```
**Uso:** Hábitos completos, feedback positivo, checkmarks

#### Warning (Amarelo/Laranja)
```
warning-50:  #fffbeb
warning-500: #f59e0b  ← Base
warning-600: #d97706
```
**Uso:** Metas próximas do prazo, avisos não-críticos

#### Error (Vermelho)
```
error-50:  #fef2f2
error-500: #ef4444  ← Base
error-600: #dc2626
```
**Uso:** Erros, validação, ações destrutivas

#### Info (Azul Claro)
```
info-50:  #eff6ff
info-500: #3b82f6  ← Base (mesmo que primary)
info-600: #2563eb
```
**Uso:** Tooltips, mensagens informativas

---

### 2.4 Gradientes

#### Gradient 1: Hero/Backgrounds
```css
background: linear-gradient(135deg, #3b82f6 0%, #a855f7 100%);
```
**Uso:** Backgrounds de hero sections, CTAs especiais

#### Gradient 2: Sutil (Cards Premium)
```css
background: linear-gradient(180deg, #ffffff 0%, #faf5ff 100%);
```
**Uso:** Cards de features premium, destaque sutil

#### Gradient 3: Overlay (Imagens)
```css
background: linear-gradient(0deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0) 100%);
```
**Uso:** Overlay em imagens com texto

---

### 2.5 Acessibilidade (Contraste)

Todas as combinações de cores devem passar WCAG AA:
- Texto normal (16px+): Contraste mínimo 4.5:1
- Texto grande (24px+): Contraste mínimo 3:1

**Combinações Aprovadas:**
- ✅ gray-900 em white (contraste ~16:1)
- ✅ gray-700 em white (contraste ~8:1)
- ✅ gray-500 em white (contraste ~4.6:1)
- ✅ white em primary-600 (contraste ~4.7:1)
- ❌ gray-400 em white (contraste insuficiente para texto normal)

---

## 3. Tipografia

### 3.1 Famílias de Fonte

#### Fonte Principal: Inter
```css
font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
```

**Por quê Inter:**
- Excelente legibilidade em telas
- Ampla variedade de pesos
- Open source (Google Fonts)
- Modern e profissional

**Como Carregar:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

**Pesos Usados:**
- 400 (Regular): Texto body, parágrafos
- 500 (Medium): Labels, navegação
- 600 (Semibold): Subtítulos, buttons
- 700 (Bold): Headlines, títulos principais

---

#### Fonte Alternativa: Geist Sans (Opcional)
Se preferir estilo mais moderno (inspirado em Vercel).

```css
font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, sans-serif;
```

**Nota:** Geist Sans requer self-hosting ou import do Next.js 16.

---

#### Fonte Monospace (Código/Dados)
```css
font-family: 'Fira Code', 'Courier New', monospace;
```

**Uso:** Exibir dados técnicos, IDs, timestamps (se necessário)

---

### 3.2 Escala Tipográfica

Baseada em escala modular (1.25 - Major Third).

| Elemento | Desktop | Mobile | Weight | Usage |
|----------|---------|--------|--------|-------|
| **Display** | 64px / 4rem | 40px / 2.5rem | 700 | Hero headlines |
| **H1** | 48px / 3rem | 32px / 2rem | 700 | Page titles |
| **H2** | 36px / 2.25rem | 28px / 1.75rem | 700 | Section headers |
| **H3** | 28px / 1.75rem | 24px / 1.5rem | 600 | Subsection headers |
| **H4** | 24px / 1.5rem | 20px / 1.25rem | 600 | Card titles |
| **H5** | 20px / 1.25rem | 18px / 1.125rem | 600 | Small headings |
| **Body Large** | 18px / 1.125rem | 16px / 1rem | 400 | Important body text |
| **Body** | 16px / 1rem | 16px / 1rem | 400 | Default body text |
| **Body Small** | 14px / 0.875rem | 14px / 0.875rem | 400 | Captions, labels |
| **Caption** | 12px / 0.75rem | 12px / 0.75rem | 500 | Hints, metadata |

---

### 3.3 Line Height

| Size | Line Height |
|------|-------------|
| Display, H1, H2 | 1.2 (tight) |
| H3, H4, H5 | 1.4 |
| Body | 1.6 (comfortable) |
| Caption | 1.5 |

---

### 3.4 Letter Spacing

| Element | Letter Spacing |
|---------|----------------|
| Display, Headlines | -0.02em (tight) |
| Body | 0 (normal) |
| Captions, Labels (uppercase) | 0.05em (loose) |

---

### 3.5 Exemplos de Uso

```css
/* Headline Principal */
.display {
  font-size: 4rem; /* 64px */
  font-weight: 700;
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: var(--gray-900);
}

/* Body Text */
.body {
  font-size: 1rem; /* 16px */
  font-weight: 400;
  line-height: 1.6;
  color: var(--gray-700);
}

/* Button */
.button {
  font-size: 1rem; /* 16px */
  font-weight: 600;
  letter-spacing: 0.01em;
}
```

---

## 4. Espaçamento

### 4.1 Escala de Espaçamento

Baseada em múltiplos de 4px (sistema de 8pt grid).

| Token | Valor | Uso |
|-------|-------|-----|
| `space-1` | 4px | Micro espaçamentos (ícone + texto) |
| `space-2` | 8px | Padding interno pequeno |
| `space-3` | 12px | Padding interno médio |
| `space-4` | 16px | Padding padrão, gaps |
| `space-5` | 20px | Espaçamento entre elementos |
| `space-6` | 24px | Padding de cards |
| `space-8` | 32px | Espaçamento entre seções (pequeno) |
| `space-10` | 40px | Espaçamento entre seções |
| `space-12` | 48px | Espaçamento entre seções (médio) |
| `space-16` | 64px | Espaçamento entre seções (grande) |
| `space-20` | 80px | Espaçamento entre seções (hero) |
| `space-24` | 96px | Espaçamento entre seções (muito grande) |

---

### 4.2 Padding de Componentes

| Componente | Padding |
|------------|---------|
| Button (small) | 8px 16px |
| Button (medium) | 12px 24px |
| Button (large) | 16px 32px |
| Input | 12px 16px |
| Card | 24px |
| Modal | 32px |
| Page container | 24px (mobile), 48px (desktop) |

---

### 4.3 Margins e Gaps

```css
/* Gap entre elementos em um grupo */
.stack-sm { gap: 8px; }
.stack-md { gap: 16px; }
.stack-lg { gap: 24px; }

/* Margin bottom entre seções */
.section-sm { margin-bottom: 48px; }
.section-md { margin-bottom: 64px; }
.section-lg { margin-bottom: 96px; }
```

---

## 5. Border Radius

### 5.1 Escala

| Token | Valor | Uso |
|-------|-------|-----|
| `rounded-none` | 0px | Sem arredondamento |
| `rounded-sm` | 4px | Borders sutis (badges) |
| `rounded` | 8px | Padrão (buttons, inputs, cards) |
| `rounded-lg` | 12px | Cards maiores, modals |
| `rounded-xl` | 16px | Hero sections, imagens |
| `rounded-full` | 9999px | Avatares, pills, badges circulares |

---

### 5.2 Uso por Componente

| Componente | Border Radius |
|------------|---------------|
| Button | `rounded` (8px) |
| Input | `rounded` (8px) |
| Card | `rounded-lg` (12px) |
| Modal | `rounded-xl` (16px) |
| Avatar | `rounded-full` |
| Badge | `rounded` (8px) ou `rounded-full` (pill) |
| Imagens | `rounded-lg` (12px) |

---

## 6. Sombras (Shadows)

### 6.1 Escala de Sombras

Sombras sutis, nunca exageradas.

```css
/* Elevação 1: Sutil (cards, inputs em hover) */
--shadow-sm: 0 1px 2px 0 rgba(0, 0, 0, 0.05);

/* Elevação 2: Padrão (cards, dropdowns) */
--shadow: 0 2px 8px 0 rgba(0, 0, 0, 0.08);

/* Elevação 3: Média (modals, popovers) */
--shadow-md: 0 4px 16px 0 rgba(0, 0, 0, 0.12);

/* Elevação 4: Alta (tooltips, alerts importantes) */
--shadow-lg: 0 8px 24px 0 rgba(0, 0, 0, 0.16);

/* Elevação 5: Muito alta (modals fullscreen) */
--shadow-xl: 0 16px 48px 0 rgba(0, 0, 0, 0.20);
```

---

### 6.2 Uso por Componente

| Componente | Shadow |
|------------|--------|
| Card (estático) | `shadow-sm` |
| Card (hover) | `shadow` |
| Dropdown | `shadow-md` |
| Modal | `shadow-lg` |
| Tooltip | `shadow-md` |
| Button (hover) | `shadow-sm` |

---

### 6.3 Sombras Coloridas (Opcional)

Para CTAs ou elementos especiais:

```css
/* Sombra com tint azul */
--shadow-primary: 0 4px 16px 0 rgba(59, 130, 246, 0.25);
```

**Uso:** Buttons primários em hover, cards de destaque.

---

## 7. Ícones

### 7.1 Biblioteca de Ícones

**Recomendado:** Lucide Icons (moderna, open-source, otimizada)

- Site: https://lucide.dev
- Estilo: Linha (outline), consistente
- Peso: 2px stroke

**Instalação (React):**
```bash
npm install lucide-react
```

**Alternativas:**
- Heroicons (by Tailwind)
- Feather Icons
- Phosphor Icons

---

### 7.2 Tamanhos de Ícones

| Contexto | Tamanho |
|----------|---------|
| Small (badges, inline) | 16px |
| Medium (buttons, inputs) | 20px |
| Large (cards, headers) | 24px |
| XLarge (hero, empty states) | 32-48px |

---

### 7.3 Uso de Ícones

```jsx
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

// Secundário (ação secundária)
<Button variant="outline">Cancelar</Button>

// Destrutivo (deletar, arquivar)
<Button variant="destructive">Deletar</Button>

// Ghost (ações sutis)
<Button variant="ghost">Ver Mais</Button>

// Link
<Button variant="link">Saiba Mais</Button>
```

#### Card
```jsx
<Card>
  <CardHeader>
    <CardTitle>Meditar</CardTitle>
    <CardDescription>Hábito diário</CardDescription>
  </CardHeader>
  <CardContent>
    {/* Conteúdo */}
  </CardContent>
  <CardFooter>
    {/* Footer */}
  </CardFooter>
</Card>
```

#### Dialog (Modal)
```jsx
<Dialog>
  <DialogTrigger asChild>
    <Button>Abrir Modal</Button>
  </DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogTitle>Título</DialogTitle>
      <DialogDescription>Descrição</DialogDescription>
    </DialogHeader>
    {/* Conteúdo */}
  </DialogContent>
</Dialog>
```

#### Toast (Notificação)
```jsx
import { toast } from '@/components/ui/use-toast';

toast({
  title: "Sucesso!",
  description: "Hábito criado com sucesso.",
});

// Error
toast({
  title: "Erro",
  description: "Algo deu errado.",
  variant: "destructive",
});
```

---

## 9. Animações e Transições

### 9.1 Princípios

- **Sutis**: Animações devem ser notadas, mas não distrair
- **Rápidas**: Duração curta (150-300ms)
- **Naturais**: Easing suave (ease-out, ease-in-out)
- **Com Propósito**: Toda animação deve ter razão (feedback, atenção, deleite)

---

### 9.2 Durações Padrão

```css
--duration-fast: 150ms;
--duration-normal: 250ms;
--duration-slow: 350ms;
```

**Uso:**
- Fast: Hover em botões, checkbox
- Normal: Modals, dropdowns, tooltips
- Slow: Page transitions, slides

---

### 9.3 Easing Functions

```css
--ease-out: cubic-bezier(0.33, 1, 0.68, 1); /* Elementos aparecendo */
--ease-in: cubic-bezier(0.32, 0, 0.67, 0); /* Elementos desaparecendo */
--ease-in-out: cubic-bezier(0.65, 0, 0.35, 1); /* Movimentos */
```

---

### 9.4 Animações Comuns

#### Hover em Button
```css
.button {
  transition: all 150ms var(--ease-out);
}

.button:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
}
```

#### Fade In (Modal, Toast)
```css
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.modal {
  animation: fade-in 250ms var(--ease-out);
}
```

#### Slide Up (Toast, Dropdown)
```css
@keyframes slide-up {
  from {
    transform: translateY(10px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.toast {
  animation: slide-up 250ms var(--ease-out);
}
```

#### Checkbox Check
```css
.checkbox:checked {
  animation: scale-in 150ms var(--ease-out);
}

@keyframes scale-in {
  0% {
    transform: scale(0.8);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}
```

---

### 9.5 Uso com Framer Motion (Opcional)

Para animações mais complexas (page transitions, lists):

```jsx
import { motion } from 'framer-motion';

<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3, ease: 'easeOut' }}
>
  {/* Conteúdo */}
</motion.div>
```

---

## 10. Responsividade

### 10.1 Breakpoints

```css
/* Tailwind padrão */
--breakpoint-sm: 640px;   /* Mobile landscape, small tablets */
--breakpoint-md: 768px;   /* Tablets */
--breakpoint-lg: 1024px;  /* Small desktops */
--breakpoint-xl: 1280px;  /* Desktops */
--breakpoint-2xl: 1536px; /* Large desktops */
```

---

### 10.2 Abordagem Mobile-First

Design e desenvolva para mobile primeiro, depois adicione complexidade para telas maiores.

```jsx
// Mobile: stack vertical
// Desktop: grid horizontal
<div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
  <Card />
  <Card />
  <Card />
</div>
```

---

### 10.3 Container

```jsx
// Container responsivo com max-width e padding
<div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
  {/* Conteúdo */}
</div>
```

**Tamanhos:**
- Mobile: 100% width, 16px padding
- Tablet: 100% width, 24px padding
- Desktop: max 1280px (7xl), 32px padding

---

## 11. Acessibilidade

### 11.1 Contraste

Já coberto em seção de cores. Sempre validar com ferramenta:
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

---

### 11.2 Focus States

Todos os elementos interativos devem ter focus visível.

```css
/* Focus ring padrão (shadcn/ui cuida) */
*:focus-visible {
  outline: 2px solid var(--ring);
  outline-offset: 2px;
}
```

---

### 11.3 ARIA Labels

```jsx
// Botão apenas com ícone
<button aria-label="Fechar modal">
  <XIcon size={20} />
</button>

// Input com label oculto visualmente
<label htmlFor="email" className="sr-only">
  Email
</label>
<input id="email" type="email" placeholder="seu@email.com" />
```

---

### 11.4 Navegação por Teclado

- Tab order lógico
- Esc fecha modals
- Enter/Space ativa buttons
- Setas navegam em dropdowns

shadcn/ui implementa isso por padrão.

---

## 12. Performance

### 12.1 Otimização de Fontes

```jsx
// app/layout.tsx (Next.js 16)
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Evita FOUT
  variable: '--font-inter',
});

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR" className={inter.variable}>
      <body>{children}</body>
    </html>
  );
}
```

---

### 12.2 Otimização de Imagens

```jsx
import Image from 'next/image';

<Image
  src="/hero-screenshot.png"
  alt="Dashboard do Habit Coach AI"
  width={1200}
  height={800}
  priority // Para hero images
  quality={90}
/>
```

---

### 12.3 Lazy Loading

Componentes pesados (gráficos, calendários) devem ser lazy loaded:

```jsx
import dynamic from 'next/dynamic';

const Calendar = dynamic(() => import('@/components/Calendar'), {
  loading: () => <Skeleton />,
});
```

---

## 13. Checklist de Implementação

### ✅ Setup Inicial
- [ ] Instalar shadcn/ui
- [ ] Configurar Tailwind CSS
- [ ] Adicionar fonte Inter (Google Fonts ou Next.js 16)
- [ ] Criar CSS variables para cores
- [ ] Instalar Lucide Icons

### ✅ Componentes Base
- [ ] Button (todos os variants)
- [ ] Input, Textarea
- [ ] Card
- [ ] Dialog
- [ ] Toast
- [ ] Badge
- [ ] Avatar

### ✅ Tokens de Design
- [ ] Paleta de cores aplicada
- [ ] Escala de espaçamento definida
- [ ] Border radius padrão configurado
- [ ] Sombras configuradas

### ✅ Acessibilidade
- [ ] Focus states visíveis
- [ ] ARIA labels em ícones/botões
- [ ] Contraste validado
- [ ] Navegação por teclado testada

### ✅ Responsividade
- [ ] Mobile-first approach
- [ ] Breakpoints testados
- [ ] Componentes adaptam layout

### ✅ Performance
- [ ] Fontes otimizadas (font-display: swap)
- [ ] Imagens otimizadas (Next.js 16 Image)
- [ ] Componentes pesados lazy loaded

---

## 14. Referências e Recursos

### Design
- Linear: https://linear.app
- Resend: https://resend.com
- Vercel: https://vercel.com

### Ferramentas
- shadcn/ui: https://ui.shadcn.com
- Tailwind CSS: https://tailwindcss.com
- Lucide Icons: https://lucide.dev
- Coolors (paletas): https://coolors.co
- WebAIM Contrast Checker: https://webaim.org/resources/contrastchecker/

### Tipografia
- Google Fonts: https://fonts.google.com
- Type Scale Calculator: https://typescale.com

### Animações
- Framer Motion: https://www.framer.com/motion/
- Cubic Bezier Generator: https://cubic-bezier.com

---

**Versão**: 1.0  
**Data**: Janeiro 2026  
**Status**: Pronto para Implementação
