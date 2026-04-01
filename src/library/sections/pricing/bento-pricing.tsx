/**
 * @baustein Bento Pricing
 * @zweck Bento-Grid Pricing-Karten mit Featured Plan, Badges und Feature-Listen
 * @geeignet-fuer SaaS Pricing Pages, Agentur-Pakete, Subscription-Modelle
 * @stil Dark Theme, Grid-Layout (5+3 / 4+4), Purple Akzente
 */

import React from 'react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { CheckIcon, SparklesIcon } from 'lucide-react'

type PricingCardProps = {
  titleBadge: string
  priceLabel: string
  priceSuffix?: string
  features: string[]
  cta?: string
  className?: string
}

function FilledCheck() {
  return (
    <div className="bg-primary text-primary-foreground rounded-full p-0.5">
      <CheckIcon className="size-3" strokeWidth={3} />
    </div>
  )
}

function PricingCard({ titleBadge, priceLabel, priceSuffix = '/Monat', features, cta = 'Auswählen', className }: PricingCardProps) {
  return (
    <div className={cn(
      'bg-black/50 border-white/10 relative overflow-hidden rounded-md border backdrop-blur',
      className,
    )}>
      <div className="flex items-center gap-3 p-4">
        <Badge variant="secondary" className="bg-white/10 text-white/80 border-0">{titleBadge}</Badge>
        <div className="ml-auto">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">{cta}</Button>
        </div>
      </div>
      <div className="flex items-end gap-2 px-4 py-2">
        <span className="font-mono text-5xl font-semibold tracking-tight text-white">{priceLabel}</span>
        {priceLabel.toLowerCase() !== 'kostenlos' && (
          <span className="text-white/40 text-sm">{priceSuffix}</span>
        )}
      </div>
      <ul className="text-white/60 grid gap-4 p-4 text-sm">
        {features.map((f, i) => (
          <li key={i} className="flex items-center gap-3">
            <FilledCheck />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export function BentoPricing() {
  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2 lg:grid-cols-8">
      {/* Featured Plan */}
      <div className={cn(
        'bg-black/50 border-white/10 relative w-full overflow-hidden rounded-md border backdrop-blur',
        'lg:col-span-5',
      )}>
        <div className="pointer-events-none absolute top-0 left-1/2 -mt-2 -ml-20 h-full w-full [mask-image:linear-gradient(white,transparent)]">
          <div className="from-purple-500/5 to-purple-500/2 absolute inset-0 bg-gradient-to-r [mask-image:radial-gradient(farthest-side_at_top,white,transparent)]" />
        </div>
        <div className="flex items-center gap-3 p-4">
          <Badge variant="secondary" className="bg-white/10 text-white/80 border-0">AGENCY PRO</Badge>
          <Badge variant="outline" className="hidden lg:flex border-white/20 text-white/60">
            <SparklesIcon className="me-1 size-3" /> Empfohlen
          </Badge>
          <div className="ml-auto">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Demo buchen</Button>
          </div>
        </div>
        <div className="flex flex-col p-4 lg:flex-row">
          <div className="pb-4 lg:w-[30%]">
            <span className="font-mono text-5xl font-semibold tracking-tight text-white">3.500</span>
            <span className="text-white/40 text-sm">/Monat</span>
          </div>
          <ul className="text-white/60 grid gap-4 text-sm lg:w-[70%]">
            {[
              'Unbegrenzte Kunden gleichzeitig',
              'Komplette KI-Pipeline (47 Nodes)',
              'Kunden-Hub mit Freigabe-System',
              'Priority Support und Account Manager',
            ].map((f, i) => (
              <li key={i} className="flex items-center gap-3">
                <FilledCheck />
                <span className="leading-relaxed">{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <PricingCard
        titleBadge="STARTER"
        priceLabel="Kostenlos"
        features={['1 Kunde zum Testen', 'Basis-Automation', 'Community Support']}
        className="lg:col-span-3"
        cta="Testen"
      />
      <PricingCard
        titleBadge="AGENTUR"
        priceLabel="2.000"
        features={['Bis zu 10 Kunden', 'KI-Pipeline komplett', 'Email Support', 'Basis Analytics']}
        className="lg:col-span-4"
      />
      <PricingCard
        titleBadge="ENTERPRISE"
        priceLabel="Individuell"
        features={['Unbegrenzte Kunden', 'Dedicated Account Manager', 'Custom Integrationen', 'SLA Garantie']}
        className="lg:col-span-4"
        cta="Kontakt"
      />
    </div>
  )
}
