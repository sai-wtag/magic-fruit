/**
 * Style maps for `BaseButton`, kept out of the SFC because `defineProps()` is
 * hoisted and cannot reference variables declared inside `<script setup>`.
 */

/** Tap targets are >= 44px at every size so the game stays thumb-friendly. */
export const BUTTON_SIZES = {
  sm: 'min-h-[2.75rem] px-4 text-sm',
  md: 'min-h-[3rem] px-5 text-base',
  lg: 'min-h-[3.5rem] px-6 text-lg',
}

export const BUTTON_VARIANTS = {
  primary:
    'bg-brand text-on-brand shadow-lift hover:bg-brand-strong hover:shadow-card',
  positive: 'bg-brand text-on-brand shadow-lift hover:bg-brand-strong',
  negative: 'bg-danger text-on-brand shadow-lift hover:brightness-110',
  neutral:
    'border border-line bg-card text-ink shadow-card hover:border-brand/50 hover:text-brand',
  ghost: 'text-muted hover:bg-card hover:text-ink',
}
