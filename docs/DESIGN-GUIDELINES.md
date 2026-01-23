# DESIGN GUIDELINES - Habit Coach AI

## 1. Visão Geral do Design

### 1.1 Filosofia de Design
Habit Coach AI deve transmitir:
- **Acolhimento**: Amigável, caloroso, "humano"
- **Simplicidade**: Fácil de entender, sem fricção
- **Energia**: Cores vibrantes, ilustrações lúdicas
- **Confiança**: Profissional, mas acessível

### 1.2 Inspirações Visuais
- **Petpeeps** (referência visual): Uso de formas arredondadas, cores vibrantes, ilustrações amigáveis
- **Headspace**: Design calmo, formas orgânicas, cores suaves
- **Duolingo**: Gamificação visual, botões arredondados, personalidade forte

### 1.3 Princípios de Design
1. **Clareza > Criatividade**: Função antes de forma
2. **Consistência**: Padrões repetidos em toda a interface
3. **Hierarquia Visual**: Guiar o olhar do usuário naturalmente
4. **Espaço em Branco**: Respiração visual, não sobrecarregar
5. **Feedback**: Toda ação do usuário tem resposta visual

---

## 2. Paleta de Cores

### 2.1 Cores Primárias

#### Primary (Azul Vibrante)
Usado para elementos de destaque, hero sections e backgrounds de marca.
Baseado no tom "Electric Blue" da referência.

```
primary-50:  #f0f7ff
primary-100: #e0f0ff
primary-200: #b9ddfe
primary-300: #7cc2fd
primary-400: #36a4fa
primary-500: #0080f5  ← Base (Vibrante)
primary-600: #0066d6
primary-700: #0052ad
primary-800: #00458d
primary-900: #063971
```

**Uso:**
- primary-500: Backgrounds de seções principais, ícones ativos
- primary-600: Hover em elementos interativos
- primary-50: Backgrounds de seções alternadas (substituindo branco puro)

---

#### Secondary (Laranja/Amarelo Solar)
Usado para acentos de calor, ilustrações, e CTAs secundários que precisam de atenção.
Substitui o roxo para trazer mais "vida" e "calor".

```
secondary-50:  #fffbeb
secondary-100: #fef3c7
secondary-200: #fde68a
secondary-300: #fcd34d
secondary-400: #fbbf24
secondary-500: #f59e0b  ← Base (Solar)
secondary-600: #d97706
secondary-700: #b45309
secondary-800: #92400e
secondary-900: #78350f
```

**Uso:**
- secondary-400/500: Elementos decorativos (estrelas, corações), highlights
- secondary-100: Backgrounds de cards de destaque

---

### 2.2 Cores Neutras & Escuras

#### Dark (Preto Suave)
Usado para textos principais e botões primários de alto contraste.

```
dark-900: #111827 (Gray-900 / Black)
```

**Uso:**
- Background de botões primários (CTAs tipo "Schedule Now")
- Headings principais

#### Grayscale & Surface
Usado para textos secundários e superfícies.

```
surface-white: #ffffff
surface-soft:  #f8fafc (Slate-50) or #f0f7ff (Primary-50 tint)
```

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
### 3.1 Famílias de Fonte

#### Fonte Principal: Plus Jakarta Sans ou Nunito (Headings)
Para trazer a personalidade amigável e moderna vista na referência.
Se não disponível, usar **Inter** com peso Bold e tracking levemente negativo.

```css
font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
```

#### Fonte de Corpo: Inter
Mantém a legibilidade agnóstica e limpa.

```css
font-family: 'Inter', sans-serif;
```

**Estilos de Texto:**
- **Headings:** Bold (700) ou ExtraBold (800), cor escura (Gray-900).
- **Body:** Regular (400) ou Medium (500), cor suave (Gray-600).
- **Botoes:** Semibold (600), case title ou uppercase suave.
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
